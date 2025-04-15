import { Provider } from "react-redux"
import { AppRoutes } from "./AppRoutes"

export const UsersApp = () => {

    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    )
    
}
