<<<<<<< HEAD
import React from 'react'

import { useState, useContext } from 'react'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div>
            <form>

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
=======
import React from 'react'

import { useState, useContext }  from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'


const Signup = () => {
  // WILL - This is the userContext syntax added
  const { userState } = useContext(UserContext)
  const [ user, setUser ] = userState

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const submitForm = async (e) => {
        e.preventDefault()
        try {
        // Pulls user from backend
          const response = await axios.post(`${env.BACKEND_URL}/user`, { name, email, password })

          // Sets user through useContext
          setUser(response.data.user)

          // Sets userId into localStorage
          setTimeout(()=>{localStorage.setItem('userId', response.data.user.id)}, 1)
        } catch (error) {
          console.log('Error:', error.mesage)
          
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

        <div>
          <input type="submit" value="Sign Up!" />
        </div>
      </form>
    </div>
    )
}


export default Signup
>>>>>>> f0aefa1284972ed0de1d0acceaea3f2239d1d987
