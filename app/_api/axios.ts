import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT as string;

console.log('API_ENDPOINT', baseURL);

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
