import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import SimpleButton from '../../components/SimpleButton';
import Header from '../../components/Header';
import ItemServico from '../ItemServico';
import api from '../../services/API';
import {
    Container,
    Service,
} from './styles';

export default class TelaContrato extends Component {
    state = {
        prestador: null,
        servico: [],
        horario: null
    }

    getService = async (id) => {
        try{
            const response = await api.getServiceById(id);
      
            console.log("Tela: " + response.data);
      
            this.setState({ servico: response.data });
          } catch(response){
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
          }
    }

    render() {
        this.getService("0096a43749737bc43bd53c00d59d3d44d05ef5a6d9b0751af2571894f53322ca");

        return(
            <Container>
                <Header title="Contrato de Serviço"/>
                <Text>Prestador</Text>
                <Text>Avaliação: Tal</Text>
                <Service>
                    <ItemServico servico={this.state.servico}/>
                </Service>
                <SimpleButton title="Agendamento"/>
                <SimpleButton title="Contratar"/>
            </Container>
        );
    }
}