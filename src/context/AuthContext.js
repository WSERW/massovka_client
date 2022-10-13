import { createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"

const  AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    let navigate = useNavigate()

    let localToken = localStorage.getItem('authToken')

    let [authToken, setAuthToken] = useState(()=> localToken?JSON.parse(localToken):null)
    let [user, setUser] = useState(()=> localToken? jwt_decode(localToken):null)
    let [loading, setLoading] = useState(()=> (true))

    let loginUser = async(e)=> {
        e.preventDefault()
        const url = 'http://127.0.0.1:8000/api/token/'
        let response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:e.target.username.value,password:e.target.password.value})
        }
        )
        let data = await response.json()
        if(response.status === 200){
            console.log(data)
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            navigate('/')
        }
        else(
            alert('Что-то пошло не так')
        )
    }

    let logoutUser = () => {
        setUser(null)
        setAuthToken(null)
        localStorage.removeItem('authToken')
        navigate('/login')
    }

    let updateToken = async () => {
        let url = 'https//127.0.0.1:8000/api/token/refresh/'
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'refresh':authToken.refresh})
        })

        let data = await response.json()

        if (response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
        }
        else {
            logoutUser()
        }
    }

    let contextData = {
        authToken:authToken,
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=>{
            let interval = setInterval(()=>{
                if(authToken){
                    updateToken()
                }
            },1000*60*4)
            return () => clearInterval(interval)
        },
        [authToken,loading]
    )

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}