import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    DatePickerAndroid,
} from 'react-native';
import Button from '../../components/Button';
import ProviderButton from '../../components/ProviderButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/API';
import {
    Container,
    Body,
    Title,
    ButtonContainer,
    Data
} from './styles';

export default class TelaContratoFuncionalidadesP extends Component {
    state = {
        prest_usuario: [],
        prest_prestador: [],
        imagem: "http://media.agora.com.vc/thumbs/capas/image_1399.jpg",
        contratante: "2e6d9b3a01d160d77f46fd9e5798344f77be8de245da0b13eb537982d50f94a8",
        servico: [],
        contrato: [],
        contratante: [],
        data: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
        errorMessage: null,
    }

    static navigationOptions = {
        title: 'Opçoes do Contrato',
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
        console.log("contrato: " + this.props.navigation.getParam('contrato')); 
        console.log("id serviço: " + this.props.navigation.getParam('contrato')['id_servico']);
        this.getServico(this.props.navigation.getParam('contrato')['id_servico']);
        this.getContratante(this.props.navigation.getParam('contrato')['id_usuario'])
 }

getServico = async (id) => {
    try {
       
        const response = await api.getServiceById(id);
        
        console.log("Recebendo id de serviço: " + response.data);

        this.setState({ servico : response.data });
    } catch(response) {
        console.log("erro: " + response.data);
        this.setState({ errorMessage: 'Erro'})
    }

}
getContratante = async (id) => {
      
    try {
        const response = await api.getUser(id);

        console.log("recebedo usuario: " + response.data);

        this.setState({ contratante: response.data });
    } catch(response) {
        console.log("erro: " + response.data);
        this.setState({ errorMessage: 'Erro'})
    }
}
    setDateAndroid = async () => {
        try {
            const {
                action, year, month, day,
            } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ data: `${day}/${month + 1}/${year}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

    getData() {
        const dia = new Date().getDate();
        const mes = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();
        const data = dia + "/" + mes + "/" + ano;
        this.setState({ data: data });
    }

    cancelarContrato = async () => {
        try {
            const response = await api.deleteContract(this.props.navigation.getParam('contrato').id_contrato);
            Alert.alert("Contrato cancelado.");
            this.props.navigation.goBack();
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: response.data });
            Alert.alert("Contrato não pode ser cancelado.");
        }
    }

    cancelar() {
        Alert.alert(
            'Cancelar contrato',
            'Deseja cancelar o contrato? O contratante do serviço será notificado.',
            [
                {
                    text: 'Sim',
                    onPress: () => this.cancelarContrato()
                },
                {
                    text: 'Não',
                    onPress: () => console.log("Voltar"),
                    style: 'cancel'
                },
            ],
            { cancelable: false },
        );
    }

    render() {
      {
          
        var data = this.props.navigation.getParam('contrato').data.dia + "/" + (this.props.navigation.getParam('contrato').data.mes+1) + "/" 
            + this.props.navigation.getParam('contrato').data.ano + " às " + this.props.navigation.getParam('contrato').data.hora + ":"
            + (this.props.navigation.getParam('contrato').data.min < 10 ? "0" : "") + this.props.navigation.getParam('contrato').data.min;
        var buttons = <ButtonContainer>
                            <Button text="Cancelar" onPress={() => this.cancelar()}/>
                        </ButtonContainer>;
        return(
            <Container>
                <Body>
                    
                    <Title>Contratante</Title>
                    <Text>{this.state.contratante.nome}</Text>
                    <Title>Endereço:</Title>
                    <Text>{this.state.contratante.endereco}</Text>
                    <Title>Serviço</Title>
                    <Text>{this.state.servico.nome}</Text>
                    <Title>Preço</Title>
                    <Text>R$: {this.state.servico.preco}</Text>
                    <Title>Data</Title>
                    <Data>
                        <Text>{data}</Text>
                        
                    </Data>

                    {this.props.navigation.getParam('contrato').ativo ? buttons : <View></View>}
                </Body>
            </Container>
        );
          }
}
}