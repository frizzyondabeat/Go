import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT as string;

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
