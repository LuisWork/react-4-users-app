import axios from "axios"

export const findAll = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/users')
        return response
    } catch (error) {
        console.error(error)
    }
    return null
}