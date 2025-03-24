import React from 'react'

export const UserRow = ({ id, username, email, handlerRemoveUser, handlerSelectedUserForm }) => {

    /*
    const onRemoveUser = (id) => {
        handlerRemoveUser(id)
    }
        */

    /*
    const onUpdateUser = (user) => {
        handlerSelectedUserForm(user)
    }

    */

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td><button className='btn btn-secondary btn-sm' onClick={() => handlerSelectedUserForm({id, username, email})}>Update</button></td>
            <td><button className='btn btn-danger btn-sm' onClick={() => handlerRemoveUser(id)}>Remove</button></td>
        </tr>
    )
}
