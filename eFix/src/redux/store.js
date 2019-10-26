import { createStore, combineReducers } from 'redux';
import listagemServicosReducer from './reducers/listagemServicosReducer';

const rootReducer = combineReducers({
    listagemServicos: listagemServicosReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;