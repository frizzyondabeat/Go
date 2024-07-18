import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://213.beeceptor.com',
    headers: {
        'Content-Type': 'application/json',
    },
});
