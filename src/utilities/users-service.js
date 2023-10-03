import * as usersAPI from './users-api'


export async function signUp (userData) {
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials)
    localStorage.setItem('token', token)
    return getUser() 
}

export function logOut() {
    localStorage.removeItem('token') 
}

export function getToken() {
    const token = localStorage.getItem('token')  //attempt to get the token from the client storage
    if (!token) return null     // check if there is a token 
    const payload = JSON.parse(atob(token.split('.')[1])) // because localStorage only store strings, need to break that up and parse it back into a JSON, only taking the payload section of the token 
    if (payload.exp < Date.now() / 1000) { // check if the token is expired 
        localStorage.removeItem('token')
        return null
    }
    return token 
}

export function getUser() {
    const token = getToken() 
    return token ? JSON.parse(atob(token.split('.')[1])).user : null // either return the user or return null 
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date (dateStr))
}