export const getAuthToken = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token") || ""
    return token
}

export const Logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    // Cookie.remove("authToken")
}