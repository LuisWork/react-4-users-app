import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext'

const NavBar = () => {

  const { login, handlerLogout } = useContext(AuthContext)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="nav-link fs-1 m-5" to="/users">Home</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/users">Users</NavLink>
            </li>
            {!login.isAdmin ||
              <li className='nav-item'>
                <NavLink className="nav-link" to="/users/register">User Register</NavLink>
              </li>}
          </ul>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navBarLogout">
          <span className='nav-item nav-link text-primary mx-3'>Welcome, {login.user?.username}</span>
          <button className='btn btn-outline-success' onClick={handlerLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
