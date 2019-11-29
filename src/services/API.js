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

// CONTRATO

api.createContract = async (contract) => {
    return await api.post('/contrato', contract);
}

api.getContractList = async () => {
    return await api.get('/contrato');
}

api.getContract = async (contract_id) => {
    return await api.get('/contrato/' + contract_id);
}

api.updateContract = async (contract) => {
    return await api.put('/contrato', contract);
}

api.deleteContract = async (contract_id) => {
    return await api.delete('/contrato/' + contract_id);
}

api.closeContract = async (contract_id) => {
    return await api.put('/contrato/close/' + contract_id);
}

api.getUserContracts = async (user_id) => {
    return await api.get('/contrato/usuario/' + user_id);
}

api.getProviderContracts = async (provider_id) => {
    return await api.get('/contrato/prestador/' + provider_id);
}

api.addContractReview = async (review) => {
    return await api.post('/contrato/avaliacao', review);
}

api.getContractsOfDay = async (provider_id, dateTime) => {
    return await api.get(`/contrato/prestador/data/${provider_id}`, dateTime);
}
// HORÁRIOS

api.createSchedule = async (schedule) => {
    return await api.post('/prestador/horario', schedule);
}

api.updateSchedule = async (schedule) => {
    return api.put('/prestador/horario', schedule);
}

api.deleteSchedule = async(provider_id) => {
    return await api.delete(`/prestador/horario/${provider_id}`);
}

api.getProviderSchedule = async (provider_id) => {
    return await api.get(`/prestador/horario/${provider_id}`);
}

export default api;