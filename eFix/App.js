import React, { Component } from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import api from './src/services/API';

export default class HelloWorldApp extends Component {
  state = {
    servicos: [],
    errorMessage: null,
  };

  getServicesList = async () => {
    try{
      const response = await api.getServicos();

      console.log("Tela: " + response.data);

      this.setState({ servicos: response.data["servicos"] });
    } catch(response){
      console.log("erro: " + response.data);
      this.setState({ errorMessage: 'Erro'})
    }
  }

  renderItem(item){
    return(
      <View>
        <Text>{item.nome}</Text>
        <Text>{item.descricao}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        
        <Button onPress={this.getServicesList} title="Listar"/>
        
        {console.log(this.state.servicos)}

        { this.state.servicos.map(servico => (
          <View key={servico["id_servico"]} style={{ marginTop: 15}}>
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
