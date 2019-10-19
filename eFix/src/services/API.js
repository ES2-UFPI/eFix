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

api.getServiceUnderPrice = async (preco) => {
    return await api.get('/servico/preco/' + preco);
}

api.getServiceSearch = async (texto) => {
    return await api.get('/servico/busca/' + texto);
}

api.createService = async (service) => {
    return await api.post('/servico', service);
}
export default api;