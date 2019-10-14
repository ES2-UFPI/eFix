import {create} from 'apisauce';

const api = create({
    baseURL: 'https://efix-255422.appspot.com',
});

api.getServices = async () => {
    return await api.get('/servico');
}

api.getServicesByCategory = async (category) => {
    return await api.get('/servico/categ/' + category);
}

api.getServiceById = async (id) => {
    return await api.get('/servico/id/' + id);
}

export default api;