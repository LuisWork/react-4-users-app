export const AppRoutes = () => {

    const { login } = useContext(AuthContext)

    return (
        <Routes>
            {login.isAuth
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