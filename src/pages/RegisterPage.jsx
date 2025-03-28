import React, { useState } from 'react'
import { UserForm } from '../components/UserForm'

const RegisterPage = ({ handlerAddUser, initialUserForm }) => {

    const [userSelected, setUserSelected] = useState(initialUserForm)

  return (
    <div className='container my-4'>
        <h4>Users Register</h4>
        <div className="row">
            <div className="col">
                <UserForm handlerAddUser={handlerAddUser} initialUserForm={initialUserForm} userSelected={userSelected}/>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage
