import axios from 'axios';


const api = axios.create({
    baseURL: 'https://api-simon-filmes.onrender.com'
});

export default api;