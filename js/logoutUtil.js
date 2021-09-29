function bindLogoutButton() {
    const btnLogout = document.querySelector('#btn_logout');
    btnLogout.addEventListener('click', logout);
}

async function logout() {
    const token = getToken();
    if (token === null) {
        location.assign('/login');
        return;
    }
    try {
        await axios.delete('https://api.marktube.tv/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log('logout error', error);
    } finally {
        localStorage.clear();
        location.assign('/login');
    }
}