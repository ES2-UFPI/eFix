import {create} from 'apisauce';

const api = create({
    baseURL: 'https://efix-255422.appspot.com',
});

api.getServicos = async () => {
    return await api.get('/servico');
}

api.getServicosByCategory = async (category) => {
    return await api.get('/servico/categ/' + category);
}

api.getServicosById = async (id) => {
    return await api.get('/servico/id/' + id);
}

export default api;