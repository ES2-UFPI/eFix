import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/SimpleTextInput';

export default class CadastrarHorarios extends Component {
    render() {
        return(
            <View>
                <Text>Agenda de Trabalho</Text>
                <Text>Segunda de 8 as 10</Text>
                <Text>Terça de 14 as 16</Text>
                <Button>Novo Horário</Button>
                <TextInput placeholder="Dia"/>
                <TextInput placeholder="Inicio"/>
                <TextInput placeholder="Fim"/>
            </View>
        );
    }
}