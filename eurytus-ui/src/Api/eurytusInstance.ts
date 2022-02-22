import axios from "axios";

const instance = axios.create({
    baseURL: 'http://eurytus.com/api/v1',
    withCredentials: true
});

export {instance as axios}