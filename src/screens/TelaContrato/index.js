import React, { Component } from 'react';
import {
    View,
    Text,
    Alert
} from 'react-native';
import Button from '../../components/Button';
import ProviderButton from '../../components/ProviderButton';
import Service from '../../components/Service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/API';
import {
    Container,
    Body,
    Title,
    ButtonContainer
} from './styles';

export default class TelaContrato extends Component {
    state = {
        prest_usuario: [],
        prest_prestador: [],
        imagem: "http://media.agora.com.vc/thumbs/capas/image_1399.jpg",
        contratante: "d49769d36a1bd1ce6748e6a215fa948871d932c5445b18a99cb4ef853b130cae",
        servico: [],
        data: null,
        errorMessage: null,
    }

    static navigationOptions = {
        title: 'Contratar Serviço',
        headerStyle: {
            backgroundColor: '#2196f3',
            height: 60,
            elevation: 10,
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            padding: 4,
        }
    }

    componentDidMount() {
        console.log("serv: " + this.props.navigation.getParam('servico'));
        console.log("prest: " + this.props.navigation.getParam('servico')['id_prestador']);
        this.getPrestador(this.props.navigation.getParam('servico')['id_prestador']);
        this.getData();
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

    getPrestador = async (id) => {
        try {
            const response = await api.getProvider(id);

            console.log("Tela: " + response.data);

            this.setState({ prest_prestador: response.data });
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
        }

        try {
            const response = await api.getUser(this.state.prest_prestador.id_usuario);

            console.log("Tela: " + response.data);

            this.setState({ prest_usuario: response.data });
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
        }
    }

    getData() {
        const dia = new Date().getDate();
        const mes = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();
        const data = dia + "/" + mes + "/" + ano;
        this.setState({ data: data });
    }

    criarContrato = async () => {
        var json = "{'id_prestador': '" + this.state.prest_prestador.id_prestador + "', 'id_usuario': '"+ this.state.contratante + "', 'id_servico': '" + this.props.navigation.getParam('servico')['id_servico'] + "', 'data': '" + this.state.data + "'}";
        try {
            console.log(json);
            const response = await api.createContract(json);
            Alert.alert("Contrato feito com sucesso!");
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: response.data });
            Alert.alert("Contrato não pode ser efetuado.");
        }
    }

    showAlert = () => {
        console.log(this.state.servico);
        Alert.alert("Perfil do prestador");
    }

    render() {
        return(
            <Container>
                <Body>
                    <Title>Provedor</Title>
                    <ProviderButton onPress={this.showAlert}
                        usuario={this.state.prest_usuario}
                        prestador={this.state.prest_prestador}
                        imagem={this.state.imagem}
                        servico={this.props.navigation.getParam('servico')} />
                    <Title>Serviço</Title>
                    <Service servico={this.props.navigation.getParam('servico')}/>
                    <ButtonContainer>
                        <Button text="Contratar" onPress={this.criarContrato}/>
                    </ButtonContainer>
                </Body>
            </Container>
        );
    }
}