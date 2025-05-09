import React from 'react'
import { UserForm } from './UserForm'
import { useUsers } from '../hooks/useUsers'

export const UserModalForm = () => {

    const { userSelected, handlerCloseForm } = useUsers()

    return (
        <div className='modal' style={{ display: "block" }} tabIndex={'-1'}>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {(userSelected.id > 0) ? 'Edit' : 'Create'}
                        </h5>
                    </div>
                    <div className="modal-body">
                        <UserForm userSelected={userSelected} handlerCloseForm={handlerCloseForm} />
                    </div>
                </div>
            </div>
        </div>
    )
}
