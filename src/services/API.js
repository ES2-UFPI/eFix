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

api.updateService = async (service) => {
    return await api.put('/servico', service);
}

api.deleteService = async (service) => {
    return await api.delete('/servico', service);
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

// USUARIO

/* 
EXAMPLE

to create and update a user:
{
	"id": "4c5f5b39c126f5d63f7ce1fc7ff93dc2eae5b5a102d832d5287e15",
	"nome": "Zéca Garganta",
	"senha": "soufoda01",
	"email": "meuemail@example.com",
	"endereco": "Rua das Aguaceiras, 34555, ZP, Teresina, PI"
}

*/
api.createUser = async (user) => {
    return await api.post('/usuario', user);
}

api.getUser = async (user_id) => {
    return await api.get('/usuario/' + encodeURI(user_id));
}

api.updateUser = async (new_values) => {
    return await api.put('/usuario/', new_values);
}

api.deleteUser = async (user_id) => {
    return await api.delete('/usuario/' + encodeURI(user_id));
}

// PRESTADOR DE SERVICOS

/*
EXAMPLE

to create a provider:
{
	"id_usuario": "óusbduaishbahuydtd3lj44hb13oysdoasgtudo3jg4134o1",
	"bio": "Sou um eletricista muito louco"
}

*/
api.createProvider = async (provider) => {
    return await api.post('/prestador', provider);
}

api.getProvidersList = async () => {
    return await api.get('/prestador');
}

api.getProvider = async (provider_id) => {
    return await api.get('/prestador/' + encodeURI(provider_id));
}

api.updateProvider = async (new_values) => {
    return await api.put('/prestador', new_values);
}

api.deleteProvider = async (provider_id) => {
    return await api.delete('/prestador/' + encodeURI(provider_id));
}

api.addAvaliationToProvider = async (avaliation) => {
    return await api.post('/prestador/avaliacao', avaliation);
}

api.changeProviderDisponibitily = async (provider_id) => {
    return await api.put('/prestador/status/' + encodeURI(provider_id));
}

export default api;