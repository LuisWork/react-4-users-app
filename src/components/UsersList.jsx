import React, { useContext } from 'react'
import { UserRow } from './UserRow'
import { UserContext } from '../context/userContext'
import { AuthContext } from '../auth/context/AuthContext'

export const UsersList = () => {

    const { login } = useContext(AuthContext)
    const { users } = useContext(UserContext)

    return (
        <table className='table table-hover table-striped'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    {!login.isAdmin ||
                        <>
                            <th>Update</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </>}
                </tr>
            </thead>
            <tbody>
                {users.map(({ id, username, email, admin }) => (
                    <UserRow key={id} id={id} username={username} email={email} admin={admin} />
                ))}
            </tbody>
        </table>
    )
}
