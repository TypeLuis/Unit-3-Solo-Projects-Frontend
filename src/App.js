import './App.css';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">

      <Header />


      <Routes>

        <Route path='/signup' element={<Signup />} />

        <Route path='/login' element={<Login />} />


      </Routes>

=======
import {Route, Routes} from 'react-router-dom'
import env from 'react-dotenv'

// imports components and pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyCart from './pages/MyCart';
import Category from './pages/Category';
import Header from './components/Header';
import AllProducts from './components/AllProducts'


import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

import axios from 'axios'

function App() {

  const { userState } = useContext(UserContext)
  const [ user, setUser ] = userState

  const fetchUser = async () => {
    const userId = localStorage.getItem('userId')
    try {
      if (userId) {
        // console.log(userId)
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


  useEffect(()=>{fetchUser()}, [])
  const value = useContext(UserContext)

  return (
    <div className="App">


      <Header />

      <Routes>

        <Route  path='/signup'  element={<Signup />} />

        <Route path='/login' element={<Login />} />

        <Route path='/cart' element={<MyCart />} />

        <Route path='/category' element={<Category />} />

        <Route path='/category/:name' element={<AllProducts />} />

      </Routes>
      
>>>>>>> f0aefa1284972ed0de1d0acceaea3f2239d1d987
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> f0aefa1284972ed0de1d0acceaea3f2239d1d987
