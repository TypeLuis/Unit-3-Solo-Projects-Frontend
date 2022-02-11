import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './AnimeDetails.scss'
import Pagination from './Pagination'


const AnimeDetails = () => {
    const { id, request, page } = useParams()

    const { pageState } = useContext(UserContext)
    const [pageId, setPageId] = pageState

    setPageId(id)

    const [response, setResponse] = useState([])
    const [pageLimit, setPageLimit] = useState(1)


    const loadAnimeDetails = async () => {

        // sets response to empty array
        setResponse([])


        let fetchResponse
        let response

        switch (request) {
            case 'pictures':

                fetchResponse = await fetch(`https://api.jikan.moe/v3/anime/${id}/${request}`)

                response = await fetchResponse.json()

                // gets the data from the response
                const pictures = response.pictures
                console.log('pictures', pictures)

                // "[...new Set()]" allows makes a nested array of the data mapped
                const pictureImgs = [...new Set(pictures.map((item) => {

                    // creates an array of the data we need to extract
                    // order of data is their index
                    const allItems = [item.large]

                    // returns array to nested arrays
                    return allItems

                }))]

                console.log('pictureImgs', pictureImgs)

                // sets responseState to the [...new Set()] array
                setResponse(pictureImgs)
                break


            case 'episodes':

                fetchResponse = await fetch(`https://api.jikan.moe/v3/anime/${id}/${request}/${page}`)

                response = await fetchResponse.json()

                setPageLimit(response.episodes_last_page)
                // console.log(pageLimit)

                const episodes = response.episodes
                console.log('episodes', response.episodes)

                const epi = [...new Set(episodes.map((item) => {
                    const allItems = [item.title, item.video_url, item.episode_id, item.filler, item.recap]
                    return allItems
                }))]

                setResponse(epi)
                break



            case 'characters_staff':


                fetchResponse = await fetch(`https://api.jikan.moe/v3/anime/${id}/${request}`)

                response = await fetchResponse.json()

                const characters = response.characters
                console.log('Characters', response.characters)

                const allCharacters = [...new Set(characters.map((item) => {
                    const allItems = [item.name, item.image_url, item.role]
                    return allItems
                }))]

                setResponse(allCharacters)
                break



            case 'videos':

                fetchResponse = await fetch(`https://api.jikan.moe/v3/anime/${id}/${request}`)

                response = await fetchResponse.json()

                const promos = response.promo
                console.log('promo', response.promo)

                const videoPromotions = [...new Set(promos.map((item) => {
                    const allItems = [item.title, item.video_url]

                    return allItems
                }))]

                setResponse(videoPromotions)
                break



            case 'recommendations':

                fetchResponse = await fetch(`https://api.jikan.moe/v3/anime/${id}/${request}`)

                response = await fetchResponse.json()

                const recommends = response.recommendations
                console.log('recommendations', response.recommendations)

                const recommendations = [...new Set(recommends.map((item) => {
                    const allItems = [item.image_url, item.title, item.mal_id]
                    return allItems
                }))]

                setResponse(recommendations)
                break
        }


    }


    // https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs
    // page will reload whenever data is updated.
    useEffect(() => { loadAnimeDetails() }, [page, request])

    const url = `/anime/${id}/${request}`


    return (
        <div>
            <h1>{request}</h1>

            <div className={`${request} content-page`}>


                {request === 'episodes' &&

                    <>
                        {/* {parseInt(page) > 1 &&

                            <Link to={`/anime/${id}/${request}/${page > 0 && parseInt(page) - 1}`} ><button>back</button></Link>
                        }

                        {parseInt(page) < pageLimit &&

                            <Link to={`/anime/${id}/${request}/${parseInt(page) + 1}`} ><button >next</button></Link>
                        } */}

                        <Pagination page={page} url={url} pageLimit={pageLimit} />

                    </>

                }

                {request === 'pictures' &&

                    <>
                        <div className='slide-track'>
                            {response.map((item, i) => {
                                return (

                                    <div key={i} className='slide'>


                                        <img src={item[0]} />

                                    </div>
                                )

                            })}
                            {response.map((item, i) => {
                                return (

                                    <div key={i} className='slide'>


                                        <img src={item[0]} />

                                    </div>
                                )

                            })}
                        </div>
                    </>

                }

                {response.map((item, i) => {

                    const SwitchComponents = () => {

                        switch (request) {

                            case 'episodes':

                                const episodeTitle = item[0]
                                const episodeVideo = item[1]
                                const episodeId = item[2]
                                const episodeFiller = item[3]
                                const episodeRecap = item[4]

                                return (
                                    <div>
                                        <h2>episode {episodeId}</h2>
                                        <span>filler: {episodeFiller ? <span>yes</span> : <span>no</span>} <br /></span>
                                        <span>recap: {episodeRecap ? <span>yes</span> : <span>no</span>} <br /></span>
                                        <a href={episodeVideo}><h1>{episodeTitle}</h1></a>
                                    </div>
                                )

                            case 'pictures':
                                return (
                                    <></>
                                )

                            case 'characters_staff':

                                const characterName = item[0]
                                const characterUrl = item[1]
                                const characterRole = item[2]

                                return (
                                    <div>
                                        <h1>{characterName}</h1>
                                        <h2>Role : {characterRole}</h2>
                                        <img src={characterUrl} />
                                    </div>
                                )

                            case 'videos':

                                const videoTitle = item[0]
                                const video = item[1]

                                return (
                                    <div>
                                        <h1>{videoTitle}</h1>
                                        <div>
                                            <iframe src={video}></iframe>
                                        </div>
                                    </div>
                                )

                            case 'recommendations':

                                const recommendImage = item[0]
                                const recommendTitle = item[1]
                                const recommendMalId = item[2]

                                return (
                                    <div className='recomend-page'>
                                        <Link to={`/anime/${recommendMalId}`}> <h1> {recommendTitle} </h1> </Link>
                                        <img src={recommendImage} />
                                    </div>
                                )

                        }
                    }


                    return (

                        <>

                            <SwitchComponents />
                        </>


                    )
                })}
            </div>
        </div>
    )
}

export default AnimeDetails
