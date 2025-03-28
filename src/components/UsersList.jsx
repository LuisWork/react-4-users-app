import React from 'react'
import { UserRow } from './UserRow'

export const UsersList = ({ users = [], handlerRemoveUser, handlerSelectedUserForm }) => {
    return (
        <table className='table table-hover table-striped'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {users.map(({ id, username, email }) => (
                    <UserRow key={id} id={id} username={username} email={email} handlerRemoveUser={handlerRemoveUser} handlerSelectedUserForm={handlerSelectedUserForm}/>
                ))}
            </tbody>
        </table>
    )
}
