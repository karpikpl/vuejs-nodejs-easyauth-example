// const axios = require('axios');

export async function getAllUsers() {

    // https://github.com/axios/axios/issues/674#issuecomment-279225530
    // no way to prevent axios from following redirects
    const response = await fetch('/api/users', { method: 'GET', redirect: 'manual' });

    if (response.type == 'opaqueredirect')
        window.location.reload();
    else
        return await response.json();
}

export async function createUser(data) {
    return getData(async () => {
        // const response = await axios.post(`/api/user`, { user: data });

        const response = await fetch('/api/users', { method: 'POST', redirect: 'manual', body: { user: data } });
        if (response.type == 'opaqueredirect')
            window.location.reload();
        else
            return await response.json();
    }
    )
}

async function getData(func) {
    try {
        var result = await func();
        return result;
    } catch (error) {
        console.error(error);
    }
}