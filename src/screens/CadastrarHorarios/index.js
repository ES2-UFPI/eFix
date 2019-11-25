import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/SimpleTextInput';

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
            <View>
                <Text>Agenda de Trabalho</Text>
                <Text>Segunda de 8 as 10</Text>
                <Text>Terça de 14 as 16</Text>
                <Button text="Novo Horário"/>
                <TextInput placeholder="Dia"/>
                <TextInput placeholder="Inicio"/>
                <TextInput placeholder="Fim"/>
            </View>
        );
    }
}