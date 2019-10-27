import { LISTAGEM_SERVICOS } from '../actions/types';

const initialState = {
    servicos: []
};

const listagemServicosReducer = (state = initialState, action) => {
    switch(action.type) {
        case LISTAGEM_SERVICOS:
            return {
                ...state,
                servicos: state.servicos = action.payload
            };
        default:
            return state;
    }
}

export default listagemServicosReducer;