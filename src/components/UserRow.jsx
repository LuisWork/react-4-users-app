import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/userContext'

export const UserRow = ({ id, username, email }) => {

    const { handlerRemoveUser, handlerSelectedUserForm } = useContext(UserContext)

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td><button className='btn btn-secondary btn-sm' onClick={() => handlerSelectedUserForm({id, username, email})}>Update</button></td>
            <td><NavLink className={'btn btn-success btn-sm'} to={'/users/edit/' + id}>Edit</NavLink></td>
            <td><button className='btn btn-danger btn-sm' onClick={() => handlerRemoveUser(id)}>Remove</button></td>
        </tr>
    )
}
