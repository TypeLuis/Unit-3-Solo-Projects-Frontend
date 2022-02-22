import React from 'react'

import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'

const Signup = () => {

    const { userState, pageState } = useContext(UserContext)
    const [user, setUser] = userState

    const [pageId, setPageId] = pageState

    setPageId(0)


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = async (e) => {
        try {
            e.preventDefault()

            const response = await axios.post(`${process.env.BACKEND_URL}/user`, { name, email, password })

            console.log(response)

            await setUser(response.data.user)

            await localStorage.setItem('userId', response.data.user.id)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='sign-page'>
            <form className='login-box' onSubmit={submitForm}>
                <h1>Sign up</h1>

                <div className='textbox'>
                    <label className='username' htmlFor="name"></label>
                    <input value={name} placeholder='Username' onChange={(e) => { setName(e.target.value); e.target.style.background = 'none' }} />
                </div>

                <div className='textbox'>
                    <label className='email' htmlFor="email"></label>
                    <input value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value); e.target.style.background = 'none' }} />
                </div>


                <div className='textbox'>
                    <label className='password' htmlFor="password"></label>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                {/* <input className='btn' type="submit" value="Sign Up!" /> */}

                <button className='btn' type="submit">Sign Up!</button>

            </form>
        </div>
    )
}

export default Signup
