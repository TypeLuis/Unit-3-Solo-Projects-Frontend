<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>

            <Link to='/signup' >Signup</Link>

            <Link to='/login' >login</Link>

        </div>
    )
}

export default Header
=======
import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Header = () => {
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState

    return (
        <div>
            <ul className='nav-bar'>

                <>

                    <li>
                        <Link
                            to="/category">
                            Category
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/cart">
                            My Cart
                        </Link>
                    </li>

                    <li>

                        <span 
                            onClick={()=>{localStorage.removeItem('userId')
                            setUser({})}}
                        >Logout</span>

                    </li>


                    <li>
                        <Link
                            to="/signup">
                            Sign Up
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/login">
                            login
                        </Link>
                    </li>


                </>


            </ul>
        </div>
    )
}

export default Header
>>>>>>> f0aefa1284972ed0de1d0acceaea3f2239d1d987
