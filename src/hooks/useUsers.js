import { useReducer, useState } from "react"
import { usersReducer } from "../reducers/usersReducer"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const initialUsers = [
    {
        id: 1,
        username: 'Pepe',
        password: '12345',
        email: 'pepe@correo.com'
    }
]

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
}

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers)
    const [userSelected, setUserSelected] = useState(initialUserForm)
    const [visibleForm, setVisibleForm] = useState(false)
    const navigate = useNavigate()

    const handlerAddUser = (user) => {
        let type
        dispatch({
            type: (user.id === 0) ? type = 'addUser' : 'updateUser',
            payload: user
        })
        Swal.fire(
            (user.id === 0) ? 'User created!' : 'User updated',
            (user.id === 0) ? 'The user has been created successfully' : 'The user has been updated successfully',
            'success'
          );
          handlerCloseForm()
          navigate('/users')
    }

    const handlerRemoveUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'removeUser',
                    payload: id
                })
              Swal.fire({
                title: "User deleted!",
                text: "The user has been remove successfully!",
                icon: "success"
              });
            }
          });

    }

    const handlerSelectedUserForm = (user) => {
        setVisibleForm(true)
        setUserSelected({...user})
    }

    const handlerOpenForm = () => {
        setVisibleForm(true)
    }

    const handlerCloseForm = () => {
        setVisibleForm(false)
        setUserSelected(initialUserForm)
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelectedUserForm,
        handlerOpenForm,
        handlerCloseForm,
    }
}