import React from 'react'
import { UserRow } from './UserRow'
import { useUsers } from '../hooks/useUsers'
import { useAuth } from '../auth/hooks/useAuth'

export const UsersList = () => {

    const { login } = useAuth()

    const { users } = useUsers()

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
