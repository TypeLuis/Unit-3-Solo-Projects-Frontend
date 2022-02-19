import React from 'react'

import { useState, useContext }  from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import './userSign.scss'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { userState, pageState } = useContext(UserContext)
    const [ user, setUser ] = userState

    const [pageId , setPageId] = pageState
  
    setPageId(0)


    const submitForm = async (e) => {
        try {
          e.preventDefault()
          // Pulls user from backend
          const response = await axios.post(`${env.BACKEND_URL}/user/login`, { email, password })
            
          console.log(response)

          // Sets user through useContext
          await setUser(response.data.user)
  
          // Set userId into localStorage
          localStorage.setItem('userId', response.data.user.id)
        } catch (error) {
          console.log('Error:', error.message)
        }
      }


    return (
        <div className='sign-page'>
            <form className='login-box' onSubmit={submitForm}>
                <h1>Login</h1>
                <div className='textbox'>
                    <label className='email' htmlFor="email"></label>
                    <input value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                </div>


                <div className='textbox'>
                    <label className='password' htmlFor="password"></label>
                    <input type="Password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                {/* <input className='btn' type="submit" value="Log In!" /> */}
                <button className='btn' type="submit">Log in!</button>

            </form>
        </div>
    )
}

export default Login
