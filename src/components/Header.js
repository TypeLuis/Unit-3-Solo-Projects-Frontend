import React from 'react'
import { Link, Route } from 'react-router-dom'
import AnimePage from '../pages/AnimePage'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import './Header.css'

const Header = () => {
    console.log('window', window.location.pathname.split('/')[2])
    const currentWindow = window.location.pathname.split('/')[2]
    console.log(currentWindow)

    const { pageState, userState } = useContext(UserContext)
    const [user, setUser] = userState

    const [pageId, setPageId] = pageState
    console.log(pageId)


    // useEffect(()=>{}, [pageId])


    return (
        <nav className='navbar'>

            {user.id ?



                <div className='userShows'>
                    <Link to={`/favorites`}>Favorites</Link>
                    <Link to={`/watched`}>Watched</Link>
                    <Link to='/login' onClick={() => { setUser({}); localStorage.removeItem('userId') }} >Logout</Link>
                </div>

                :

                <>

                    <Link to='/signup' onClick={setPageId(NaN)} >Signup</Link>

                    <Link to='/login' >login</Link>


                </>

            }




            <Link to='/search' >Search</Link>
            <Link to='/chart'>Chart</Link>

            <div className='dropdown'>

                <button className="dropbtn">Top Anime
                    <i className="fa fa-caret-down"></i>
                </button>

                <div className="dropdown-content">
                    <Link to={`/top/tv/1`}>tv</Link>
                    <Link to={`/top/airing/1`}>airing</Link>
                    <Link to={`/top/upcoming/1`}>upcoming</Link>
                    <Link to={`/top/movie/1`}>Movie</Link>
                    <Link to={`/top/special/1`}>special</Link>
                    <Link to={`/top/ova/1`}>ova</Link>
                </div>

            </div>

            {/* current window's id is equal to context pageId */}
            {currentWindow === pageId &&

                <div className='dropdown'>

                    <button className="dropbtn">Anime Details
                        <i className="fa fa-caret-down"></i>
                    </button>

                    <div className="dropdown-content">
                        <Link to={`/anime/${pageId}/episodes/1`}>episodes</Link>
                        <Link to={`/anime/${pageId}/pictures`}>pictures</Link>
                        <Link to={`/anime/${pageId}/characters_staff`}>characters</Link>
                        <Link to={`/anime/${pageId}/videos`}>videos</Link>
                        <Link to={`/anime/${pageId}/recommendations`}>recommendations</Link>
                        <Link to={`/anime/${pageId}`}>Anime Page</Link>
                    </div>

                </div>


            }





        </nav>
    )
}

export default Header
