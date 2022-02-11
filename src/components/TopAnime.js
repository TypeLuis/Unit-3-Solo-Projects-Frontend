import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './TopAnime.scss'
import Pagination from './Pagination'

const TopAnime = () => {

    const { pageState } = useContext(UserContext)

    const [pageId, setPageId] = pageState

    setPageId(0)

    const { subtype, page } = useParams()

    const [response, setResponse] = useState([])

    let pageLimit
    switch (subtype) {

        case 'ova':
            pageLimit = 25
            break

        case 'airing':
            pageLimit = 5
            break

        case 'upcoming':
            pageLimit = 5
            break

        case 'movie':
            pageLimit = 65
            break

        case 'special':
            pageLimit = 10
            break

        case 'tv':
            pageLimit = 80
            break
    }

    // https://api.jikan.moe/v3/top/anime/1/movie

    const loadResponse = async () => {
        setResponse([])
        const fetchResponse = await fetch(`https://api.jikan.moe/v3/top/anime/${page}/${subtype}`)

        const response = await fetchResponse.json()

        console.log(response)

        setResponse(response.top)
        console.log(pageLimit)
    }

    useEffect(() => { loadResponse() }, [page, subtype])

    const url = `/top/${subtype}`


    return (
        <div>

            <>
                {/* {parseInt(page) > 1 && response &&

                    <Link to={`/top/${subtype}/${page > 0 && parseInt(page) - 1}`} ><button>back</button></Link>
                }

                {response &&

                    <Link to={`/top/${subtype}/${parseInt(page) + 1}`} ><button >next</button></Link>
                } */}

                <Pagination page={page} url={url} pageLimit={pageLimit} />

            </>

            <h1>{subtype}</h1>

            <div className='top-anime'>

                {response.map((item, i) => {
                    return (
                        <div className='top-anime-card'>

                            <Link to={`/anime/${item.mal_id}`}><h1>{item.title}</h1></Link>

                            <div className='top-anime-details'>


                                <img src={item.image_url} />

                                <div className='top-anime-span'>

                                    <span>episode: {item.episodes} <br /></span>
                                    <span>rank #{item.rank}<br /></span>
                                    <span>score: {item.score}<br /></span>
                                    <span>start date:{item.start_date}<br /></span>
                                    <span>end Date: {item.end_date}<br /></span>

                                </div>
                            </div>


                        </div>
                    )
                })}


            </div>



        </div>
    )
}

export default TopAnime
