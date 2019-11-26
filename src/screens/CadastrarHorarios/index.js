import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    Picker,
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/SimpleTextInput';
import Schedule from '../../components/Schedule';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

    salvarHorario = async () => {
        this.setState({ dia: null });
        this.setNovoVisivel(false);
    }

    render() {
        return(
            <Container>
                <Body>
                    <Schedule day="Segunda-feira" start="14h" finish="18h"/>
                    <Schedule day="Segunda-feira" start="8h" finish="11h"/>
                    
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
                                        <Picker.Item label="Segunda-feira" value={0}/>
                                        <Picker.Item label="Terça-feira" value={1}/>
                                        <Picker.Item label="Quarta-feira" value={2}/>
                                        <Picker.Item label="Quinta-feira" value={3}/>
                                        <Picker.Item label="Sexta-feira" value={4}/>
                                        <Picker.Item label="Sábado" value={5}/>
                                        <Picker.Item label="Domingo" value={6}/>
                                    </Picker>
                                </Item>
                                <Item>
                                    <Label>Início</Label>
                                    <TimeInput>
                                        <Text>{this.state.horaInicio}</Text>
                                        <Button text={<Icon style={[{color: '#FFF'}]} size={15} name={'access-time'}/>}/>
                                    </TimeInput>
                                </Item>
                                <Item>
                                    <Label>Fim</Label>
                                    <TimeInput>
                                        <Text>{this.state.horaFim}</Text>
                                        <Button text={<Icon style={[{color: '#FFF'}]} size={16} name={'access-time'}/>}/>
                                    </TimeInput>
                                </Item>
                                <ButtonContainer>
                                    <Button text="Salvar" onPress={() => this.salvarHorario()}/>
                                </ButtonContainer>
                            </NovoContainer>
                        </NovoBody>
                    </Modal>
                </Body>
            </Container>
        );
    }
}