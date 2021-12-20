import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import env from 'react-dotenv'
import watchFunction from '../Functions/WatchFunctions'
import faveFunctions from '../Functions/FaveFunctions'
import './WatchedAnime.css'
import downloadFunctions from '../Functions/DownloadFunction'

const WatchedAnime = () => {

    const {watchState, faveState} = useContext(UserContext)
    const [watched, setWatched] = watchState
    const [fave, setFave] = faveState

    
    const [faveIds, setFaveIds] = useState([])
    const [watchIds, setWatchIds] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        watchFunction.fetchWatchedAnime(setWatchIds, setWatched)
    }, [])

    console.log(watched)
    return (
        <div>
            <h1>Watched</h1>
            <span className='download'> <button onClick={()=>{downloadFunctions.downloadImage('watched')}}> Download Images </button> </span>
            <div className='item-container'>

                {watched.map((item, i) => {
                    return(

                        <div key={i} className='item-div' style={{backgroundImage : `url(${item.imageUrl})`}} >
                            
                            <Link to={`/anime/${item.animeId}`}>

                                <div className='item-text'>
                                    <span className='item-title'>{item.title} <br /></span>
                                    {watchFunction.checkWatched(watchIds, item.animeId) &&

                                        <span className="mark" onClick={(e) => { e.preventDefault(); watchFunction.deleteWatched(item.animeId,setWatchIds, setWatched); faveFunctions.deleteFave(item.animeId,setFaveIds, setFave)}}>Watched ✅</span>

                                    }
                                </div>

                            </Link>

                        </div>

                    )
                })}

            </div>
            
        </div>
    )
}

export default WatchedAnime
