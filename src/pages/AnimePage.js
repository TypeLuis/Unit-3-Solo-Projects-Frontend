import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import {Link, useParams } from 'react-router-dom'
import axios from 'axios'

const AnimePage = () => {

    const {pageState} = useContext(UserContext)
    const [pageId , setPageId] = pageState

    const {id} = useParams()

    setPageId(id)

    const [response, setResponse] = useState({})

    const loadAnime = async () => {

        setResponse({})

        const request = await fetch(`https://api.jikan.moe/v3/anime/${id}`)

        const response = await request.json()

        console.log(response)

        setResponse(response)
        
    }


    useEffect(()=> {loadAnime()}, [])

    return (
        <div>
            <a href={response.url}> <h1>{response.title}</h1> </a>
            <span> Score: {response.score}</span>
            <div>
                <img src={response.image_url} />
            </div>
            
            <p>{response.synopsis}</p>

            <div>
                <span>premiered: {response.premiered} <br /> </span>
                <span>status: {response.status} <br /> </span>
                <span>rating: {response.rating} <br /> </span>
                <span>broadcast: {response.broadcast} <br /> </span>
            </div>

            <div>

                <ul>

                    <li>
                        <Link to={`/${id}/episodes/1`}>episodes</Link>
                    </li>

                    <li>
                        <Link to={`/${id}/pictures`}>pictures</Link>
                    </li>

                    <li>
                        <Link to={`/${id}/characters_staff`}>characters_staff</Link>
                    </li>

                    <li>
                        <Link to={`/${id}/videos`}>videos</Link>
                    </li>

                    <li>
                        <Link to={`/${id}/recommendations`}>recommendations</Link>
                    </li>

                </ul>

            </div>


            <div>
                <h1>{response.title} Trailer:</h1>
                <iframe src={response.trailer_url}></iframe>
            </div>
            
        </div>
    )
}

export default AnimePage
