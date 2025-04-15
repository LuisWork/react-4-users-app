import { useReducer, useState } from "react"
import { usersReducer } from "../reducers/usersReducer"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { findAll, remove, save, update } from "../services/userService"
import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"

const initialUsers = []

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false
}

const initialErrors = {
    username: '',
    password: '',
    email: ''
}

export const useUsers = () => {

    const { login, handlerLogout } = useContext(AuthContext)
    const [users, dispatch] = useReducer(usersReducer, initialUsers)
    const [userSelected, setUserSelected] = useState(initialUserForm)
    const [visibleForm, setVisibleForm] = useState(false)
    const [errors, setErrors] = useState(initialErrors)
    const navigate = useNavigate()

    const getUsers = async () => {
        const result = await findAll()
        dispatch({
            type: 'loadingUsers',
            payload: result.data
        })
    }

    const handlerAddUser = async (user) => {

        if (!login.isAdmin) return

        let response

        try {
            if (user.id === 0) {
                response = await save(user)
            } else {
                response = await update(user)
            }

            dispatch({
                type: (user.id === 0) ? 'addUser' : 'updateUser',
                payload: response.data
            })
            Swal.fire(
                (user.id === 0) ? 'User created!' : 'User updated',
                (user.id === 0) ? 'The user has been created successfully' : 'The user has been updated successfully',
                'success'
            );
            handlerCloseForm()
            navigate('/users')
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setErrors(error.response.data)
            } else if (error.response && error.response.status == 500 && error.response.data?.message?.includes('constraint')) {
                if (error.response.data?.message?.includes('UK_username')) {
                    setErrors({
                        username: 'El username ya existe'
                    })
                }

                if (error.response.data?.message?.includes('UK_email')) {
                    setErrors({
                        email: 'El email ya existe'
                    })
                }
            } else if (error.response.status == 401) {
                handlerLogout()
            } else {
                throw error
            }
        }
    }

    const handlerRemoveUser = (id) => {
        if (!login.isAdmin) return
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    await remove(id)
                    dispatch({
                        type: 'removeUser',
                        payload: id
                    })
                    Swal.fire({
                        title: "User deleted!",
                        text: "The user has been remove successfully!",
                        icon: "success"
                    });
                } catch (error) {
                    if (error.response.status == 401) {
                        handlerLogout()
                    }
                }
            }
        });
    }

    const handlerSelectedUserForm = (user) => {
        setVisibleForm(true)
        setUserSelected({ ...user })
    }

    const handlerOpenForm = () => {
        setVisibleForm(true)
    }

    const handlerCloseForm = () => {
        setVisibleForm(false)
        setUserSelected(initialUserForm)
        setErrors({})
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelectedUserForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    }
}