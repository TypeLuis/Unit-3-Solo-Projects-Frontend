import React from 'react'
import { Link, Route } from 'react-router-dom'
import AnimePage from '../pages/AnimePage'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import './Header.css'

const Header = () => {
    console.log(window.location.pathname.split('/')[1])
    const currentWindow = window.location.pathname.split('/')[1]
    console.log(currentWindow)

    const {pageState} = useContext(UserContext)

    const [pageId , setPageId] = pageState
    console.log(pageId)


    useEffect(()=>{}, [pageId])


    console.log(<Route path='/:id'/>)

    return (
        <nav className='navbar'>

            <Link to='/signup' onClick={setPageId(NaN)} >Signup</Link>

            <Link to='/login' >login</Link>

            <Link to='/search' >Search</Link>

            <div className='dropdown'>

                <button className="dropbtn">Top Anime
                    <i className="fa fa-caret-down"></i>
                </button>

                <div className="dropdown-content">
                    <Link to={``}>tv</Link>
                    <Link to={``}>airing</Link>
                    <Link to={``}>upcoming</Link>
                </div>

            </div>

            {currentWindow === pageId ?

                <div className='dropdown'>

                    <button className="dropbtn">Anime Details
                        <i className="fa fa-caret-down"></i>
                    </button>

                    <div className="dropdown-content">
                        <Link to={`/${pageId}/episodes/1`}>episodes</Link>
                        <Link to={`/${pageId}/pictures`}>pictures</Link>
                        <Link to={`/${pageId}/characters_staff`}>characters_staff</Link>
                        <Link to={`/${pageId}/videos`}>videos</Link>
                        <Link to={`/${pageId}/recommendations`}>recommendations</Link>
                    </div>

                </div>
               
                :

                console.log('bye')
        
            }

        </nav>
    )
}

export default Header
