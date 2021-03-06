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
import RatingScreen from '../TelaAvaliacao';
import api from '../../services/API';
import Modal from 'react-native-modal';
import {
    Container,
    Body,
    Title,
    ButtonContainer,
    Data
} from './styles';

export default class TelaContratoFuncionalidades extends Component {
    state = {
        prest_usuario: [],
        prest_prestador: [],
        imagem: "http://media.agora.com.vc/thumbs/capas/image_1399.jpg",
        contratante: "2e6d9b3a01d160d77f46fd9e5798344f77be8de245da0b13eb537982d50f94a8",
        servico: [],
        contrato: [],
        data: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
        errorMessage: null,
        isModalVisible: false,
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
       this.getPrestador(this.props.navigation.getParam('contrato')['id_prestador']);
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
getPrestador = async (id) => {
    try {
        const response = await api.getProvider(id);
        
        console.log("Recebendo id de prestador: " + response.data);

        this.setState({ prest_prestador: response.data });
    } catch(response) {
        console.log("erro: " + response.data);
        this.setState({ errorMessage: 'Erro'})
    }

    try {
        const response = await api.getUser(this.state.prest_prestador.id_usuario);

        console.log("recebedo usuario: " + response.data);

        this.setState({ prest_usuario: response.data });
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
            'Deseja cancelar o contrato? O prestador do serviço será notificado.',
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

    toggleModal() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    finalizarContrato = async () => {
        try {
            const response = await api.closeContract(this.props.navigation.getParam('contrato').id_contrato);
            Alert.alert(
                "Contrato encerrado.",
                "Avalie o serviço para ajudar a comunidade catolica porra",
                [
                    {
                        text: "Ok",
                        onPress: () => this.toggleModal(),
                    }
                ],
                { cancelable: false },
            );
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: response.data });
            Alert.alert("Contrato não pode ser finalizado.");
        }
    }

    finalizar() {
        var data = this.props.navigation.getParam('contrato').data.data;
        var now = new Date();
        console.log("data: " + data);
        console.log("now: " + (now.getTime() + 7200000));
        if (data > now.getTime() + 7200000) {
            Alert.alert('Finalizar contratos apenas durante o horário marcado');
            return;
        }
        Alert.alert(
            'Finalizar contrato',
            'Ao finalizar o contrato você confirma que ele foi cumprido.',
            [
                {
                    text: 'Finalizar',
                    onPress: () => this.finalizarContrato()
                },
                {
                    text: 'Voltar',
                    onPress: () => console.log("Voltar"),
                    style: 'cancel'
                },
            ],
            { cancelable: false },
        );
    }

    render() {
      {
        console.log(this.props.navigation.getParam('contrato'));
        var data = this.props.navigation.getParam('contrato').data.dia + "/" + (this.props.navigation.getParam('contrato').data.mes+1) + "/" 
            + this.props.navigation.getParam('contrato').data.ano + " às " + this.props.navigation.getParam('contrato').data.hora + ":"
            + (this.props.navigation.getParam('contrato').data.min < 10 ? "0" : "") + this.props.navigation.getParam('contrato').data.min;
        var buttons = <ButtonContainer>
                        <Button text="Cancelar" onPress={() => this.cancelar()}/>
                        <Button text="Finalizar" onPress={() => this.finalizar()}/>
                    </ButtonContainer>;
        return(
            <Container>
                <Body>
                    <Modal isVisible={this.state.isModalVisible}
                       onBackdropPress={() => this.setState({ isModalVisible: false })}>
                        <RatingScreen id_contrato={this.props.navigation.getParam('contrato')} modal={this}/>
                    </Modal>

                    <Title>Provedor</Title>
                    <Text>{this.state.prest_usuario.nome}</Text>
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