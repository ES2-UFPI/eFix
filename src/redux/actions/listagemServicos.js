import { LISTAGEM_SERVICOS } from './types'

export const listagemServicos = (servicos) => {
    return {
        type: LISTAGEM_SERVICOS,
        payload: servicos
    }
}