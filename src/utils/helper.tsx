export const getAuthToken = () => {
    const token = localStorage.getItem("token") || ""
    return token
}

export const Logout = () => {
    localStorage.clear()
    sessionStorage.clear()
}

export const setAuthToken = (token: string) => {
    return localStorage.setItem("token", token)
}