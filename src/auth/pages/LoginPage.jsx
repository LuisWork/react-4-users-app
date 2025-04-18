import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../hooks/useAuth'

const initialLoginForm = {
    username: '',
    password: ''
}

export const LoginPage = () => {

    const { handlerLogin } = useAuth()

    const [loginForm, setLoginForm] = useState(initialLoginForm)

    const { username, password } = loginForm

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if (!username || !password) {
            Swal.fire('Validation error', 'Username and Password required', 'error')
        }
        handlerLogin({username, password})
        setLoginForm(initialLoginForm)
    }

    return (
        <div className="modal" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login Page</h5>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <input type="text" className="form-control my-3 w-75 mx-5" placeholder='Username' name='username' autoComplete='off' value={username} onChange={onInputChange} />
                            <input type="password" className="form-control my-3 w-75 mx-5" placeholder='Password' name='password' autoComplete='off' value={password} onChange={onInputChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
