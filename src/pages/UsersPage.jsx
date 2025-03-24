import { UsersList } from '../components/UsersList'
import { UserModalForm } from '../components/UserModalForm'
import { useUsers } from '../hooks/useUsers'
import "../assets/styles.css"

export const UsersPage = () => {

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
            {!visibleForm || <div className='open-modal animation fadeIn'>
                <UserModalForm handlerAddUser={handlerAddUser} initialUserForm={initialUserForm} userSelected={userSelected} handlerCloseForm={handlerCloseForm}/>
            </div>}

            <div className='container my-4'>
                <h2>Users App</h2>
                <div className='row'>
                    <div className='col'>
                        {visibleForm || <button className='btn btn-success my-2' onClick={handlerOpenForm}>New user</button>}
                        {(users.length === 0) ? (
                            <p className='alert alert-info'>No users data...</p>
                        ) : (
                            <UsersList users={users} handlerRemoveUser={handlerRemoveUser} handlerSelectedUserForm={handlerSelectedUserForm} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
