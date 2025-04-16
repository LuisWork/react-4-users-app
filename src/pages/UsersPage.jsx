import { UsersList } from '../components/UsersList'
import { UserModalForm } from '../components/UserModalForm'
import "../assets/styles.css"
import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { useUsers } from '../hooks/useUsers'

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers,
    } = useUsers()

    const { login } = useContext(AuthContext)

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
