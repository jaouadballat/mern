import axios from 'axios';

export default (token = localStorage.getItem('token')) => {
    return axios.create({
        baseURL: 'http://localhost:3000',
            headers: {
                "Authorization": token,
            }
    });
}

