import React, { Component } from 'react';
import {
    View
} from 'react-native';
import SimpleButton from '../../components/SimpleButton';
import ItemServico from '../ItemServico';

export default class TelaContrato extends Component {
    state = {
        prestador: null,
        servico: null,
        horario: null
    }

    render() {
        return(
            <View>
                <Text>Contrato de serviço</Text>
                <Text>Prestador</Text>
                <Text>Avaliação: Tal</Text>
                <ItemServico servico={this.state.servico}/>
                <SimpleButton title="Agendamento"/>
                <SimpleButton title="Contratar"/>
            </View>
        );
    }
}