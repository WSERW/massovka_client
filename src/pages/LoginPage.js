import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let navigate = useNavigate()

    let {loginUser} = useContext(AuthContext)
    let {user} = useContext(AuthContext)

    useEffect(
        ()=>{
            if (user) {
                return navigate("/");
            }
        },
        [user]
    )
    return (
        <div>
            <p>Please Log in</p>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder='username' />
                <input type="password" name="password" placeholder='password' />
                <button>login</button>
            </form>
        </div>
    )
}

export default LoginPage