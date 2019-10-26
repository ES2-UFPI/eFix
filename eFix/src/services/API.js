import {create} from 'apisauce';

const api = create({
    baseURL: 'https://efix-255422.appspot.com',
});

api.getServices = async () => {
    return await api.get('/servico');
}

api.getServicesByCategory = async (category) => {
    return await api.get('/servico/categ/' + encodeURI(category));
}

api.getServiceById = async (id) => {
    return await api.get('/servico/id/' + id);
}

api.getServicesUnderPrice = async (preco) => {
    return await api.get('/servico/preco/' + preco);
}

api.getServicesSearch = async (texto) => {
    return await api.get('/servico/busca/' + encodeURI(texto));
}

api.createService = async (service) => {
    return await api.post('/servico', service);
}
export default api;