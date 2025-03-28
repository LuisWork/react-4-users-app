import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersPage } from '../pages/UsersPage'
import NavBar from '../components/layout/NavBar'
import RegisterPage from '../pages/RegisterPage'
import { UserProvider } from '../context/userProvider'

const UserRoutes = () => {

  return (
    <>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/register" element={<RegisterPage />} />
          <Route path="users/edit/:id" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default UserRoutes
