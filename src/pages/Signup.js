import React from 'react'

import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'

const Signup = () => {

    const { userState, pageState } = useContext(UserContext)
    const [ user, setUser ] = userState

    const [pageId , setPageId] = pageState
  
    setPageId(0)
  

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = async (e) => {
        try {
            e.preventDefault()

            const response = await axios.post(`${env.BACKEND_URL}/user`, { name, email, password })

            console.log(response)

            await setUser(response.data.user)

            await localStorage.setItem('userId', response.data.user.id)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <form onSubmit={submitForm}>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>


                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                <input type="submit" value="Sign Up!" />

            </form>
        </div>
    )
}

export default Signup
