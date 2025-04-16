import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './auth/pages/LoginPage'
import { UserRoutes } from './routes/UserRoutes'
import { useSelector } from 'react-redux'

export const AppRoutes = () => {

    const { isAuth, isLoginLoading } = useSelector(state => state.auth)

    if (isLoginLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-info" style={{ width: '4rem', height: '4rem' }} role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>

        )
    }

    return (
        <Routes>
            {isAuth
                ? (
                    <Route path="/*" element={<UserRoutes />} />
                )
                : <>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/login" />} />
                </>
            }
        </Routes>
    )

}