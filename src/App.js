import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Signup from './pages/Signup'
import Login from './pages/Login'
import SearchAnime from './pages/SearchAnime';
import AnimeDetails from './components/AnimeDetails'
import AnimePage from './pages/AnimePage';

import { UserContext } from "./context/UserContext"
import { useState, useContext, useEffect } from 'react'

function App() {

  const {pageState} = useContext(UserContext)

  const [pageId , setPageId] = pageState

  setPageId(0)



  return (
    <div className="App">

      <Header />


      <Routes>

        <Route path='/signup' element={<Signup />} />

        <Route path='/login' element={<Login />} />

        <Route path='/search' element={<SearchAnime />} />

        <Route path='/:id' element={<AnimePage />} />

        <Route path='/:id/:request' element={<AnimeDetails />}  />

        <Route path='/:id/:request/:page' element={<AnimeDetails />}  />


      </Routes>

    </div>
  );
}

export default App;
