import axios from 'axios';

export default axios.create({
    //baseURL: 'https://music-discovery-api-3.onrender.com',
    // baseURL: 'http://3.145.191.91',
    baseURL: 'http://localhost:8080/'
});