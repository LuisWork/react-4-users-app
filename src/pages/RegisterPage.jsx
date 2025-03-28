import React, { useEffect, useState } from 'react'
import { UserForm } from '../components/UserForm'
import { useParams } from 'react-router-dom'

const RegisterPage = ({ users = [], handlerAddUser, initialUserForm }) => {

    const [userSelected, setUserSelected] = useState(initialUserForm)

    const { id } = useParams()

    useEffect(() => {
        const user = users.find(u => u.id == id) || initialUserForm
        setUserSelected(user)
    }, [id])
    
  return (
    <div className='container my-4'>
        <h4>{userSelected.id > 0 ? 'Edit User' : 'Create User'}</h4>
        <div className="row">
            <div className="col">
                <UserForm handlerAddUser={handlerAddUser} initialUserForm={initialUserForm} userSelected={userSelected}/>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage
