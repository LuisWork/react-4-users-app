import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { useAuth } from '../auth/hooks/useAuth'

export const UserRow = ({ id, username, email, admin }) => {

    const { login } = useAuth()

    const { handlerRemoveUser, handlerSelectedUserForm } = useUsers()

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            {!login.isAdmin ||
                <>
                    <td><button className='btn btn-secondary btn-sm' onClick={() => handlerSelectedUserForm({ id, username, email, admin })}>Update</button></td>
                    <td><NavLink className={'btn btn-success btn-sm'} to={'/users/edit/' + id}>Edit</NavLink></td>
                    <td><button className='btn btn-danger btn-sm' onClick={() => handlerRemoveUser(id)}>Remove</button></td>
                </>
            }
        </tr>
    )
}
