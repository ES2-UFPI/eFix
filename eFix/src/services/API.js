import axios from 'axios';

const api = axios.create({
    baseURL: 'https://efix-255422.appspot.com',
});

api.getServicos = async () => {
    const response = await api.get('/servicos').then( response => {
        console.log(response.data);
        return response;
    }).catch(error => {
        console.log(error);
    });
}

export default api;