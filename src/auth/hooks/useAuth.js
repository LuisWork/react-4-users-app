import { useReducer } from "react"
import { loginReducer } from "../reducers/loginReducer"
import Swal from "sweetalert2"
import { loginUser } from "../services/authService"
import { useNavigate } from "react-router-dom"

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined
}

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin)
    const navigate = useNavigate()

    const handlerLogin = async ({ username, password }) => {

        try {
            const response = await loginUser({ username, password })
            const token = response.data.token
            const user = { username: response.data.username }
            dispatch({
                type: 'login',
                payload: user
            })
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user
            }))
            navigate('/users')
        } catch (error) {
            Swal.fire('Login error', 'Username or Password invalid', 'error')
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout'
        })
        sessionStorage.removeItem('login')
    }

    return {
        login,
        handlerLogin,
        handlerLogout
    }

}