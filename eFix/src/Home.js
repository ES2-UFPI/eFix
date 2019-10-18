import React, { Component } from 'react';
import {View, Text } from 'react-native';
import Cadastro from './Cadastro';

export default class Home extends Component {
    static navigationOpitions = {
        title: "Home",
    }

    render(){
        return(
            <View>
                <Text>
                    Bem vindo, João
                </Text>
            </View>
        );   
    }
}