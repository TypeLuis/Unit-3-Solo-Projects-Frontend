import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import env from 'react-dotenv'
import watchFunction from '../Functions/WatchFunctions'
import faveFunctions from '../Functions/FaveFunctions'
import Carousel from 'react-bootstrap/Carousel'
import './AnimePage.scss'


const AnimePage = () => {

    const { pageState, watchState, faveState, userState } = useContext(UserContext)
    const [user, setUser] = userState
    const [pageId, setPageId] = pageState
    const [watched, setWatched] = watchState
    const [fave, setFave] = faveState

    const [watchIds, setWatchIds] = useState([])
    const [faveIds, setFaveIds] = useState([])

    const { id } = useParams()

    setPageId(id)

    const [response, setResponse] = useState({})

    const loadAnime = async () => {
        try {
            setResponse({})

            const request = await fetch(`https://api.jikan.moe/v3/anime/${id}`)

            const response = await request.json()

            console.log(response)

            setResponse(response)

        }
        catch (error) {
            console.log(error)
        }


    }


    useEffect(() => { loadAnime() }, [id])


    useEffect(() => {
        watchFunction.fetchWatchedAnime(setWatchIds, setWatched)
    }, [])

    useEffect(() => { faveFunctions.fetchFaveAnime(setFaveIds, setFave) }, [])


    const animeId = response.mal_id
    const title = response.title
    const image = response.image_url


    return (
        <div>

<Carousel>
  <Carousel.Item style={{background: `url(${response.image_url})`}}>
    <img
      className=""
      src="https://cdn.myanimelist.net/images/anime/12/28553.jpg"
      alt="First slide"
    />
    <h1>KLK MANI</h1>
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <div className='page-synopsis'>
      <p > <span>Synopsis: <br /></span> {response.synopsis}</p>
    </div>


    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
  <div className='page-details'>
    <span className='page-score'> Score: {response.score}</span>
    <span>premiered: {response.premiered} <br /> </span>
    <span>status: {response.status} <br /> </span>
    <span>rating: {response.rating} <br /> </span>
    <span>broadcast: {response.broadcast} <br /> </span>
  </div>

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

            {user.id &&
                <div className='toggle-div'>

                    {watchFunction.checkWatched(watchIds, animeId) ?


                        <>
                            <span className="watchOutline" onClick={() => { watchFunction.deleteWatched(animeId, setWatchIds, setWatched); faveFunctions.deleteFave(animeId, setFaveIds, setFave) }}><span className='outline-text'>Watched</span> ✅</span>

                            {faveFunctions.checkFave(faveIds, animeId) ?

                                <span className="faveOutline" onClick={() => faveFunctions.deleteFave(animeId, setFaveIds, setFave)}><span className='outline-text'>Favored</span>❤️</span>

                                :

                                <span className="faveOutline" onClick={() => faveFunctions.faveAnime(animeId, image, title, setFaveIds, setFave)}><span className='outline-text'>Add to Favorite</span>♡</span>
                            }

                        </>
                        :
                        <span className="watchOutline" onClick={() => watchFunction.watchedAnime(animeId, image, title, setWatchIds, setWatched)}><span className='outline-text'>Watch</span>☑</span>

                    }

                </div>
            }

            <div className='anime-page'>

                <div className='page-image-title'>

                    <a href={response.url}> <h1 className='page-title'>{response.title}</h1> </a>


                    <div className='page-image'>
                        <a href={`${response.image_url}`}> <img src={response.image_url} /> </a>
                    </div>

                </div>


                <div className='page-content'>

                    <div className='page-synopsis'>
                        <p > <span>Synopsis: <br /></span> {response.synopsis}</p>

                    </div>

                    <div className='page-details'>
                        <span className='page-score'> Score: {response.score}</span>
                        <span>premiered: {response.premiered} <br /> </span>
                        <span>status: {response.status} <br /> </span>
                        <span>rating: {response.rating} <br /> </span>
                        <span>broadcast: {response.broadcast} <br /> </span>
                    </div>

                </div>





                <div className='page-trailer'>
                    <h1>{response.title} Trailer:</h1>
                    <iframe src={response.trailer_url}></iframe>
                </div>

            </div>


        </div>
    )
}

export default AnimePage

