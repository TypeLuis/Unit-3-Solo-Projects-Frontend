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
