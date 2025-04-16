import { UsersList } from '../components/UsersList'
import { UserModalForm } from '../components/UserModalForm'
import "../assets/styles.css"
import { useEffect } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useAuth } from '../auth/hooks/useAuth'

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers,
    } = useUsers()

    const { login } = useAuth()

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            {!visibleForm || <div className='open-modal animation fadeIn'>
                <UserModalForm />
            </div>}

            <div className='container my-4'>
                <h2>Users App</h2>
                <div className='row'>
                    <div className='col'>
                        {(visibleForm || !login.isAdmin) || <button className='btn btn-success my-2' onClick={handlerOpenForm}>New user</button>}
                        {(users.length === 0) ? (
                            <p className='alert alert-info'>No users data...</p>
                        ) : (
                            <UsersList />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
