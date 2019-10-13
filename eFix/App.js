import React, { Component } from 'react';
import { Text, View } from 'react-native';
import API from './src/services/API';

export default class HelloWorldApp extends Component {
  state = {
    servicos: [],
  };

  async componentDidMount(){
    const response = await API.getSevicos();

    this.setState({ servicos: response.data });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        { this.state.servicos.map(servico => (
          <View key={servico.id_servico} style={{ marginTop: 15}}>
            <Text style={{ fontWeight: 'bold'}}>
              {servico.nome}
            </Text>
            <Text>{servico.descricao}</Text>
          </View>
        ))}
      </View>
    );
  }
}
