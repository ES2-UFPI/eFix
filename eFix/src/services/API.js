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

/// CATEGORIA

// deve ser enviado um json no formato abaixo. Tanto para criar, deletar, ou atualizar
/*
    {
        "id": "c00x", (sendo x o numero)
        "nome": "nome"
    }
*/
api.createCategory = async (categoria) => {
    return await api.post('/categoria/new', categoria);
}

api.getCategories = async () => {
    return await api.get('/categoria/list');
}

api.updateCategoryName = async (categoria) => {
    return await api.put('/categoria/att', encodeURI(categoria));
}

api.deleteCategory = async (categoria) => {
    return await api.delete('/categoria/del', encodeURI(categoria));
}
export default api;