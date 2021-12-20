import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import {Link, useParams } from 'react-router-dom'
import axios from 'axios'
import env from 'react-dotenv'


const faveFunctions = {}


faveFunctions.fetchFaveAnime = async (setFaveIds, setFave) => {
    try {
        const options = {
            method: 'GET',
            url: `${env.BACKEND_URL}/fave`,
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        };

        const response = await axios.request(options)


        let Ids = []

        for (let fave of response.data.faveAnimes){
            Ids.push(fave.animeId)
        }

        console.log(response)
        
        setFave(response.data.faveAnimes)
        setFaveIds(Ids)
    } 
    catch (error) {
        console.log(error)    
    }
}

faveFunctions.faveAnime = async (animeId, image, title, setFaveIds, setFave) => {
    try {
        const options = {
            method: 'POST',
            url: `${env.BACKEND_URL}/fave/${animeId}`,
            headers: {
                Authorization: localStorage.getItem('userId')
            },
            data: {
                imageUrl : image,
                title : title,
            }
        };
        const response = await axios.request(options)
        faveFunctions.fetchFaveAnime(setFaveIds, setFave)
        console.log(response)
    } 
    catch (error) {
        console.log(error)    
    }
}

faveFunctions.deleteFave = async (animeId, setFaveIds, setFave) => {
    try {
        const options = {
            method: 'DELETE',
            url: `${env.BACKEND_URL}/fave/${animeId}`,
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        };
        const response = await axios.request(options)
        faveFunctions.fetchFaveAnime(setFaveIds, setFave)
        console.log(response)
        
    } 
    catch (error) {
        console.log(error)    
    }
}



faveFunctions.checkFave = (faveIds, animeId) => {
    try {

        // console.log(faveIds)
        if (faveIds.includes(animeId)) {
            return true
        }
        return false
    } 
    catch (error) {
        console.log(error)    
    }
}




export default faveFunctions