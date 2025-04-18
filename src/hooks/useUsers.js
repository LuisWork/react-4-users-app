import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { findAll, remove, save, update } from "../services/userService"
import { useDispatch, useSelector } from "react-redux"
import { addUser, initialUserForm, loadingError, loadingUsers, onCloseForm, onOpenForm, onUserSelectedForm, removeUser, updateUser } from "../store/slices/users/userSlice"
import { useAuth } from "../auth/hooks/useAuth"

export const useUsers = () => {

    const { login, handlerLogout } = useAuth()

    const { users, userSelected, visibleForm, errors, isLoading } = useSelector(state => state.users)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const getUsers = async () => {
        try {
            const result = await findAll()
            dispatch(loadingUsers(result.data))
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout()
            }
        }
    }

    const handlerAddUser = async (user) => {

        if (!login.isAdmin) return

        let response

        try {
            if (user.id === 0) {
                response = await save(user)
                dispatch(addUser(response.data))
            } else {
                response = await update(user)
                dispatch(updateUser(response.data))
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
                dispatch(loadingError(error.response.data))
            } else if (error.response && error.response.status == 500 && error.response.data?.message?.includes('constraint')) {
                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch(loadingError(error.response.data))
                }

                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch(loadingError(error.response.data))
                }
            } else if (error.response?.status == 401) {
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
                    dispatch(removeUser(id))
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
        dispatch(onUserSelectedForm({ ...user }))
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        dispatch(loadingError({}))
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelectedUserForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    }
}