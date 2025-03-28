import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersPage } from '../pages/UsersPage'
import NavBar from '../components/layout/NavBar'
import RegisterPage from '../pages/RegisterPage'
import { useUsers } from '../hooks/useUsers'

const UserRoutes = ({ login, handlerLogout }) => {

  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerSelectedUserForm,
    handlerOpenForm,
    handlerCloseForm
  } = useUsers()

  return (
    <>
      <NavBar login={login} handlerLogout={handlerLogout} />
      <Routes>
        <Route path="users" element={<UsersPage
        users={users}
        userSelected={userSelected}
        initialUserForm={initialUserForm}
        visibleForm={visibleForm}
        handlerAddUser={handlerAddUser}
        handlerRemoveUser={handlerRemoveUser}
        handlerSelectedUserForm={handlerSelectedUserForm}
        handlerOpenForm={handlerOpenForm}
        handlerCloseForm={handlerCloseForm}
         />} />
        <Route path="users/register" element={<RegisterPage handlerAddUser={handlerAddUser} initialUserForm={initialUserForm} />} />
        <Route path="users/edit/:id" element={<RegisterPage handlerAddUser={handlerAddUser} initialUserForm={initialUserForm} users={users}/>} />
        <Route path="/" element={<Navigate to="/users" />} />
      </Routes>
    </>
  )
}

export default UserRoutes
