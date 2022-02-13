import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header';
import Signup from './pages/Signup'
import Login from './pages/Login'
import SearchAnime from './pages/SearchAnime';
import AnimeDetails from './components/AnimeDetails'
import AnimePage from './pages/AnimePage';
import FavedAnime from './pages/FavedAnime'

import axios from 'axios'
import env from 'react-dotenv'

import { UserContext } from "./context/UserContext"
import { useState, useContext, useEffect } from 'react'
import WatchedAnime from './pages/WatchedAnime';
import SearchLogo from './components/SearchLogo';
import TopAnime from './components/TopAnime';
import FaveChart from './pages/FaveChart';
import HeaderSmall from './components/HeaderSmall';

function App() {

  const { pageState, userState } = useContext(UserContext)
  const [user, setUser] = userState

  const [pageId, setPageId] = pageState

  setPageId(0)

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (userId) {
        const response = await axios.get(`${env.BACKEND_URL}/user/verify`, {
          headers: {
            Authorization: userId
          }
        })
        setUser(response.data.user)
      }
    }
    catch (error) { console.log(error) }

  }

  useEffect(() => { fetchUser(); console.log(user) }, [])


  return (
    <div className="App">


      <HeaderSmall />
      {/* <Header /> */}

      <div className='header-margin'>

      </div>

      <Routes>


        <Route path='/*' element={<Navigate to={'/search'} />} />


        <Route path='/signup' element={
          user.id ?
            <Navigate to='/search' />
            :
            <Signup />
        } />


        <Route path='/login' element={
          user.id ?
            <Navigate to='/search' />
            :
            <Login />
        } />



        <Route path='/chart' element={<FaveChart />} />

        <Route path='/search' element={<SearchAnime />} />

        <Route path='/anime/:id' element={<AnimePage />} />

        <Route path='/anime/:id/:request' element={<AnimeDetails />} />

        <Route path='/anime/:id/:request/:page' element={<AnimeDetails />} />


        <Route path='/favorites' element={
          user.id ?
            <FavedAnime />
            :
            <Navigate to='/login' />
        } />


        <Route path='/watched' element={
          user.id ?
            <WatchedAnime />
            :
            <Navigate to='/login' />

        } />


        <Route path='/logo' element={<SearchLogo />} />

        <Route path='/top/:subtype/:page' element={<TopAnime />} />


      </Routes>

    </div>
  );
}

export default App;
