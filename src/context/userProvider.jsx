import { useUsers } from "../hooks/useUsers"
import { UserContext } from "./userContext"

export const UserProvider = ({ children }) => {

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
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerSelectedUserForm,
                handlerOpenForm,
                handlerCloseForm
            }
        }>
            {children}
        </UserContext.Provider>
    )

}