import React, { Component } from 'react';
import {
    View,
    Text,
    Alert
} from 'react-native';
import SimpleButton from '../../components/SimpleButton';
import Header from '../../components/Header';
import ProviderButton from '../../components/ProviderButton';
import ItemServico from '../ItemServico';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/API';
import {
    Container,
    Service,
    Body,
    Title,
} from './styles';

export default class TelaContrato extends Component {
    state = {
        prest_usuario: [],
        prest_prestador: [],
        imagem: "http://media.agora.com.vc/thumbs/capas/image_1399.jpg",
        servico: [],
        horario: null,
    }

    componentDidMount() {
        const id_servico = "37440f00680edb6f3a74fa5db4a859d9e26a80f89c3577afa3e7f1d19df6ba86";
        const id_usuario = "cbe876ac4f8d8db430e81d46c2510869bc30d24a231d7039bbf1e4137d53b333";
        const id_prestador = "2f5f7bbeb1024442922992ab22383faae088e3b35957909979dfb65233876c6e"

        this.getService(id_servico);
        this.getPrestadorUsuario(id_usuario);
        this.getPrestadorPrestador(id_prestador);
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

    getPrestadorUsuario = async (id) => {
        try {
            const response = await api.getUser(id);

            console.log("Tela: " + response.data);

            this.setState({ prest_usuario: response.data });
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
        }
    }

    getPrestadorPrestador = async (id) => {
        try {
            const response = await api.getProvider(id);

            console.log("Tela: " + response.data);

            this.setState({ prest_prestador: response.data });
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
        }
    }

    showAlert = () => {
        Alert.alert("Perfil do prestador");
    }

    render() {
        return(
            <Container>
                <Header title="Contratar Serviço"/>
                <Body>
                    <Title>Provedor</Title>
                    <ProviderButton onPress={this.showAlert}
                        usuario={this.state.prest_usuario}
                        prestador={this.state.prest_prestador}
                        imagem={this.state.imagem}
                        servico={this.state.servico} />
                    <Service>
                        <ItemServico servico={this.state.servico}/>
                    </Service>
                    <SimpleButton title="Agendamento"/>
                    <SimpleButton title="Contratar"/>
                </Body>
            </Container>
        );
    }
}