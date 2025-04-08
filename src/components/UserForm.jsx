import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { UserContext } from '../context/userContext'

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useContext(UserContext)
    const [userForm, setUserForm] = useState(initialUserForm)
    const { id, username, password, email } = userForm

    useEffect(() => {
        setUserForm({ ...userSelected, password: '' })
    }, [userSelected])

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        /*
        if (!username || ((!password) && id === 0) || !email) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Validation warning!...",
                text: "Some field on your form are empty",
                showConfirmButton: false,
                timer: 3000
            });
            return
        }

        if(!email.includes('@')) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Email error",
                text: "Email invalid format",
                showConfirmButton: false,
                timer: 3000
            });
            return
        }
        */

        handlerAddUser(userForm)
        //setUserForm(initialUserForm)
    }

    const onCloseForm = () => {
        handlerCloseForm()
        setUserForm(initialUserForm)
    }

    return (
        <form onSubmit={onSubmit}>
            <input className='form-control my-3 w-75'
                placeholder='Username'
                name='username'
                value={username}
                onChange={onInputChange}
                autoComplete='off' />
            <p className='text-danger'>{errors?.username}</p>
            {(id > 0) || (
                <>
                    <input className='form-control my-3 w-75'
                        placeholder='Password'
                        name='password'
                        value={password}
                        type='password'
                        onChange={onInputChange}
                        autoComplete='off' />
                    <p className='text-danger'>{errors?.password}</p>
                </>
            )}

            <input className='form-control my-3 w-75'
                placeholder='Email'
                name='email' type='email'
                value={email}
                onChange={onInputChange}
                autoComplete='off' />
            <p className='text-danger'>{errors?.email}</p>
            <input type="hidden"
                name="id"
                value={id}
            />
            <button className='btn btn-primary' type='submit'>{(id > 0) ? 'Edit' : 'Create'}</button>
            {!handlerCloseForm || <button className='btn btn-dark mx-2' onClick={() => onCloseForm()} type="button">Close</button>}
        </form>
    )
}
