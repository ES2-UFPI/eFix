import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    Picker,
    ScrollView,
    Alert,
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/SimpleTextInput';
import Schedule from '../../components/Schedule';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimePicker from 'react-native-24h-timepicker';
import {
    Container,
    Body,
    Title,
    ButtonContainer,
    NovoBody,
    NovoContainer,
    Item,
    Label,
    TimeInput,
    Error,
} from './styles';
import api from '../../services/API';

export default class CadastrarHorarios extends Component {
    state = {
        segunda: <View></View>,
        terca: <View></View>,
        quarta: <View></View>,
        quinta: <View></View>,
        sexta: <View></View>,
        sabado: <View></View>,
        domingo: <View></View>,
        prestador: [],
        data: null,
        errorMessage: null,
        novoVisivel: false,
        dia: "segunda",
        horaInicio: "00:00",
        horaFim: "00:00",
    }

    static navigationOptions = {
        title: 'Horários Disponíveis',
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
        console.log("Prest: " + this.props.navigation.getParam("id_prestador"));
        this.getPrestador(this.props.navigation.getParam("id_prestador"));
    }

    setHorarios() {
        const segunda = <Schedule day="Segunda-feira" intervals={this.state.prestador["horario"]["segunda"]}/>;
        const terca = <Schedule day="Terça-feira" intervals={this.state.prestador["horario"]["terca"]}/>;
        const quarta = <Schedule day="Quarta-feira" intervals={this.state.prestador["horario"]["quarta"]}/>;
        const quinta = <Schedule day="Quinta-feira" intervals={this.state.prestador["horario"]["quinta"]}/>;
        const sexta = <Schedule day="Sexta-feira" intervals={this.state.prestador["horario"]["sexta"]}/>;
        const sabado = <Schedule day="Sábado" intervals={this.state.prestador["horario"]["sabado"]}/>;
        const domingo = <Schedule day="Domingo" intervals={this.state.prestador["horario"]["domingo"]}/>;
        console.log("Ele nao se encontra");
        console.log(this.state.prestador["horario"]["segunda"].length);
        this.setState({
            segunda: this.state.prestador["horario"]["segunda"] !== undefined && this.state.prestador["horario"]["segunda"].length !== 0 ? segunda : <View></View>,
            terca: this.state.prestador["horario"]["terca"] !== undefined && this.state.prestador["horario"]["terca"].length !== 0 ? terca : <View></View>,
            quarta: this.state.prestador["horario"]["quarta"] !== undefined && this.state.prestador["horario"]["quarta"].length !== 0 ? quarta : <View></View>,
            quinta: this.state.prestador["horario"]["quinta"] !== undefined && this.state.prestador["horario"]["quinta"].length !== 0  ? quinta : <View></View>,
            sexta: this.state.prestador["horario"]["sexta"] !== undefined && this.state.prestador["horario"]["sexta"].length !== 0  ? sexta : <View></View>,
            sabado: this.state.prestador["horario"]["sabado"] !== undefined && this.state.prestador["horario"]["sabado"].length !== 0  ? sabado : <View></View>,
            domingo: this.state.prestador["horario"]["domingo"] !== undefined && this.state.prestador["horario"]["domingo"].length !== 0 ? domingo : <View></View>
        });
        console.log("Volte mais tarde");
    }

    getPrestador = async (id) => {
        try {
            const response = await api.getProvider(id);

            console.log("Dados: " + response.data);

            this.setState({ prestador: response.data });
            console.log(this.state.prestador["id_usuario"]);
            console.log("Olá Barbara");
            console.log("Onde está seu pai Barbara");
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
        }
        this.setHorarios();
    }

    setNovoVisivel(visibility) {
        this.setState({ novoVisivel: visibility });
    }

    setHoraInicio(horas, minutos) {
        var horario = ((horas < 10) ? ("0" + horas) : horas) + ":" + minutos;
        this.setState({ horaInicio: horario });
        this.TimePickerInicio.close();
    }

    setHoraFim(horas, minutos) {
        var horario = ((horas < 10) ? ("0" + horas) : horas) + ":" + minutos;
        this.setState({ horaFim: horario });
        this.TimePickerFim.close();
    }

    salvarHorario = async () => {
        var timeInicio = new Date('1970-01-01T' + this.state.horaInicio + ":00" + 'Z');
        var timeFim = new Date('1970-01-01T' + this.state.horaFim + ":00" + 'Z');
        if (timeInicio.getTime() >= timeFim.getTime()) {
            this.setState({ errorMessage: "Intervalo inválido!" });
            return;
        } else {
            // Salvar horario no bd
            console.log(this.state.dia);
            console.log(this.state.horaInicio + " - " + this.state.horaFim);
            var novoHorario = this.state.prestador["horario"];
            if (novoHorario[this.state.dia] === undefined)
                novoHorario[this.state.dia] = [];
            novoHorario[this.state.dia].push([this.state.horaInicio, this.state.horaFim]);
            var json = {
                id_prestador: this.state.prestador["id_prestador"],
                horario: novoHorario
            }
            json = JSON.stringify(json);
            console.log(json);
            try {
                const response = await api.updateSchedule(json);
                console.log(response.data);
                this.setState({ errorMessage: null });
                this.setState({ dia: "segunda", horaInicio: "00:00", horaFim: "00:00" });
                this.setNovoVisivel(false);
                this.getPrestador(this.state.prestador.id_prestador);
            } catch(response) {
                console.log("erro: " + response.data);
                this.setState({ errorMessage: response.data });
                Alert.alert("Novo horário disponível não pôde ser salvo!");
            }
        }
    }

    render() {
        return(
            <ScrollView>
                <Container>
                    <Body>
                        {this.state.segunda}
                        {this.state.terca}
                        {this.state.quarta}
                        {this.state.quinta}
                        {this.state.sexta}
                        {this.state.sabado}
                        {this.state.domingo}

                        <ButtonContainer>
                            <Button text="Novo" onPress={() => this.setNovoVisivel(true)}/>
                        </ButtonContainer>

                        <Modal transparent={true}
                            visible={this.state.novoVisivel}
                            animationType={'fade'}>
                            <NovoBody>
                                <NovoContainer>
                                    <Title>Novo Horário</Title>
                                    <Item>
                                        <Label>Dia</Label>
                                        <Picker selectedValue={this.state.dia}
                                            style={{width: 165, height: 30}}
                                            onValueChange={(itemValue, itemIndex) => this.setState({ dia: itemValue })}>
                                            <Picker.Item label="Segunda-feira" value="segunda"/>
                                            <Picker.Item label="Terça-feira" value="terca"/>
                                            <Picker.Item label="Quarta-feira" value="quarta"/>
                                            <Picker.Item label="Quinta-feira" value="quinta"/>
                                            <Picker.Item label="Sexta-feira" value="sexta"/>
                                            <Picker.Item label="Sábado" value="sabado"/>
                                            <Picker.Item label="Domingo" value="domingo"/>
                                        </Picker>
                                    </Item>
                                    <Item>
                                        <Label>Início</Label>
                                        <TimeInput>
                                            <Text>{this.state.horaInicio}</Text>
                                            <Button text={<Icon style={[{color: '#FFF'}]} size={15} name={'access-time'}/>}
                                                onPress={() => this.TimePickerInicio.open()}
                                            />
                                            <TimePicker
                                                textConfirm="Confirmar"
                                                textCancel="Cancelar"
                                                itemStyle={{color: 'yellow'}}
                                                ref={ref => {
                                                    this.TimePickerInicio = ref;
                                                }}
                                                onCancel={() => this.TimePickerInicio.close()}
                                                onConfirm={(hours, minutes) => this.setHoraInicio(hours, minutes)}
                                            />
                                        </TimeInput>
                                    </Item>
                                    <Item>
                                        <Label>Fim</Label>
                                        <TimeInput>
                                            <Text>{this.state.horaFim}</Text>
                                            <Button text={<Icon style={[{color: '#FFF'}]} size={15} name={'access-time'}/>}
                                                onPress={() => this.TimePickerFim.open()}
                                            />
                                            <TimePicker
                                                ref={ref => {
                                                    this.TimePickerFim = ref;
                                                }}
                                                onCancel={() => this.TimePickerFim.close()}
                                                onConfirm={(hours, minutes) => this.setHoraFim(hours, minutes)}
                                            />
                                        </TimeInput>
                                    </Item>
                                    <Error>{this.state.errorMessage}</Error>
                                    <ButtonContainer>
                                        <Button text="Cancelar" onPress={() => this.setNovoVisivel(false)}/>
                                        <Button text="Salvar" onPress={() => this.salvarHorario()}/>
                                    </ButtonContainer>
                                </NovoContainer>
                            </NovoBody>
                        </Modal>
                    </Body>
                </Container>
            </ScrollView>
        );
    }
}