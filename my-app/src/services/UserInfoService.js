const axios = require('axios');

export async function getUserInfo() {

    const response = await axios.get('/.auth/me');
    return response.data;
}
