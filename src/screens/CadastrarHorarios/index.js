import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    Picker,
    ScrollView
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

export default class CadastrarHorarios extends Component {
    state = {
        horarios: [],
        data: null,
        errorMessage: null,
        novoVisivel: false,
        dia: null,
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
            this.setState({ errorMessage: null });
            this.setState({ dia: null, horaInicio: "00:00", horaFim: "00:00" });
            this.setNovoVisivel(false);
        }
    }

    horario = {
        segunda: [["08:00", "11:00"], ["13:00", "17:00"]],
        terca: [["08:00", "11:00"], ["13:00", "17:00"]],
        quarta: [["08:00", "11:00"], ["13:00", "17:00"]],
        quinta: [["08:00", "11:00"], ["13:00", "17:00"]],
        sexta: [["08:00", "11:00"], ["13:00", "17:00"]],
        sabado: [["08:00", "11:00"]],
        domingo: []
    };

    render() {
        return(
            <ScrollView>
                <Container>
                    <Body>
                        <Schedule day={"Segunda-feira"} intervals={this.horario.segunda}/>
                        <Schedule day={"Terça-feira"} intervals={this.horario.terca}/>
                        <Schedule day={"Quarta-feira"} intervals={this.horario.quarta}/>
                        <Schedule day={"Quinta-feira"} intervals={this.horario.quinta}/>
                        <Schedule day={"Sexta-feira"} intervals={this.horario.sexta}/>
                        <Schedule day={"Sábado"} intervals={this.horario.sabado}/>
                        <Schedule day={"Domingo"} intervals={this.horario.domingo}/>
                        
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