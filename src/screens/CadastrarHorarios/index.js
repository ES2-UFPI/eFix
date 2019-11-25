import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/SimpleTextInput';
import Schedule from '../../components/Schedule';
import {
    Container,
    Body,
    Title,
} from './styles';

export default class CadastrarHorarios extends Component {
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

    render() {
        return(
            <Container>
                <Body>
                    <Schedule day="Segunda-feira" start="14h" finish="18h"/>
                    <Button text="Novo Horário"/>
                </Body>
            </Container>
        );
    }
}