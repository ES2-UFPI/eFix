import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    DatePickerAndroid,
    TimePickerAndroid
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
    ButtonContainer,
    Data
} from './styles';

export default class TelaContrato extends Component {
    state = {
        prest_usuario: [],
        prest_prestador: [],
        imagem: "http://media.agora.com.vc/thumbs/capas/image_1399.jpg",
        contratante: "2e6d9b3a01d160d77f46fd9e5798344f77be8de245da0b13eb537982d50f94a8",
        servico: [],
        data: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()} ${new Date().getUTCHours() + 21}:${new Date().getUTCMinutes()}`,
        realtime: null,
        dia: null,
        miliseconds: null,
        errorMessage: null,
        stringData: null
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
        console.log("serv: " + this.props.navigation.getParam('servico')['horario']);
        console.log("prest: " + this.props.navigation.getParam('servico')['id_prestador']);
        this.getPrestador(this.props.navigation.getParam('servico')['id_prestador']);
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
            console.log("Horários:" + this.state.prest_prestador.horario.quarta);
            console.log("Tela: " + response.data);

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
            }

            const {action2, hour, minute} = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: false, // Will display '2 PM'
            });
            if (action2 !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                //Applying extra 0 before the hour/minute for better visibility
                // 9 minutes => 09 minutes
                var m=(minute<10)?"0"+ minute:minute;
                var h=(hour<10)?"0"+ hour:hour;
                console.log("minutes = " + m + ", h = "+ h);
                this.setState({ data: `${day}/${month + 1}/${year} ${h}:${m}` });
            }
             var x= new Date(year,month,day,hour,minute);
             var y = x.toUTCString();
             var z = x.getTime() + 10800000;   
             this.setState({realtime: y, miliseconds: z});
             console.log("eeeeeeeeeeeeee2:"+ z);
             console.log("eeeeeeeeeeeeee:"+ this.state.realtime);
            
            x = x.getDay(); 
            
            switch(x){
                case 0:
                    this.setState({dia: "domingo"});
                    break;
                case 1:
                    this.setState({dia: "segunda"});
                    break;
                case 2:
                    this.setState({dia: "terca"});
                    break;
                case 3:
                    this.setState({dia: "quarta"});    
                    break;
                case 4:
                    this.setState({dia: "quinta"});
                    break;
                case 5:
                    this.setState({dia: "sexta"});
                    break;
                default:
                    break;
            }
            console.log("Hoje é :" + this.state.dia);

        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

    getData() {
        const dia = new Date().getDate();
        const mes = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();
        const horario = new Date().getTime;
        console.log("horario escolhido:" + horario);
        const data = dia + "/" + mes + "/" + ano;
        this.setState({ stringData: data });
    }

    criarContrato = async () => {
        var json = "{\"id_prestador\": \"" + this.state.prest_prestador.id_prestador + "\", \"id_usuario\": \""+ this.state.contratante + "\", \"id_servico\": \"" + this.props.navigation.getParam('servico')['id_servico'] + "\", \"data\": \"" + this.state.data + "\"}";
        try {
            console.log(json);
            const response = await api.createContract(json);
            console.log(response.data);
            Alert.alert("Contrato feito com sucesso!");
            this.props.navigation.goBack();
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

    validarData = async () =>{

        console.log("horairo do prestador" + this.state.prest_prestador.horario.quarta[0]);
        testarDia();
        try{
            console.log("{\"data\":\""+this.state.miliseconds+"\"}");
            const response = await api.getContractsOfDay(this.state.prest_prestador.id_prestador, "{\"data\": \""+this.state.miliseconds+"\"}");
            console.log("Validar data: " + response);
            var valid = response.data;
        }catch(response){
            console.log("erro: " + response.data);
            this.setState({ errorMessage: response.data });
            Alert.alert("Contrato não pode ser efetuado.");
        }
    }
    
    testarDia = () =>{
        let state = this.state;
        if(state.dia == "quarta"){
           state.prest_prestador.horario.quarta; 
        }
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
                    <Title>Data</Title>
                    <Data>
                        <Text>{this.state.data}</Text>
                        
                    </Data>
                    <ButtonContainer>
                        <Button text="Alterar Data" onPress={this.setDateAndroid}/>
                        <Button text="Contratar" onPress={this.validarData}/>
                    </ButtonContainer>
                </Body>
            </Container>
        );
    }
}