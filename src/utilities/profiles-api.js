import sendRequest from './send-request';
const BASE_URL = '/api/profiles';

export function createProfile(profileData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', profileData)
}

export function requestProfile() {
    return sendRequest(BASE_URL)
}

export async function getProfile() {
    const profile = await requestProfile()
    return profile
}

export async function uploadPhoto(photoForm) {
    return sendRequest(`${BASE_URL}/photo-upload`, 'POST', photoForm, true)
}

export async function displayProfiles() {
    return sendRequest(`${BASE_URL}/display`)
}


export async function sendLike (id) {
    return sendRequest(`${BASE_URL}/like`, 'POST', {id})
}

export async function sendDislike (id) {
    return sendRequest(`${BASE_URL}/dislike`, 'POST', {id})
}

export async function sendMatch (id) {
    return sendRequest(`${BASE_URL}/match/add`, 'POST', {id})
}

// export function updateProfile(profileData) {
//     return sendRequest(`${BASE_URL}/edit`, 'PUT', profileData)
// }