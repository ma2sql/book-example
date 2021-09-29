function getToken() {
    return localStorage.getItem('token');
}

async function getUserByToken(token) {
    try {
        const res = await axios.get('https://api.marktube.tv/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data
    } catch(error) {
        console.log('getUserToken error', error);
        return null;
    }
}

function checkToken(path='/login') {
    const token = getToken();
    if (token === null) {
        location.assign(path);
        return false;
    }
    return true;
}

async function checkUserByToken() {
    const user = await getUserByToken(getToken());
    if (user === null) {
        localStorage.clear();
        location.assign('/login');
        return false;
    }
    return true;
}