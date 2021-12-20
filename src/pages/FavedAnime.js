import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import {Link, useParams } from 'react-router-dom'
import faveFunctions from '../Functions/FaveFunctions'
import downloadFunctions from '../Functions/DownloadFunction'

const FavedAnime = () => {
    const {faveState} = useContext(UserContext)
    const [fave, setFave] = faveState

    const category = 'favorite'
    
    const [faveIds, setFaveIds] = useState([])

    useEffect(() => {
        faveFunctions.fetchFaveAnime(setFaveIds, setFave)
    }, [])

    return (
        <div>
            <h1>Favorites</h1>
            <span className='download'> <button onClick={()=>{downloadFunctions.downloadImage('favorite')}}> Download Images </button> </span>
            <div className='item-container'>

                {fave.map((item, i) => {
                    return(

                        <div key={i} className='item-div' style={{backgroundImage : `url(${item.imageUrl})`}} >
                            
                            <Link to={`/anime/${item.animeId}`}>

                                <div className='item-text'>
                                    <span className='item-title'>{item.title} <br /></span>
                                    {faveFunctions.checkFave(faveIds, item.animeId) &&

                                        <span className="mark" onClick={(e) => { e.preventDefault(); faveFunctions.deleteFave(item.animeId,setFaveIds, setFave)}}>Favored ❤️</span>

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

export default FavedAnime
