import React, { Component } from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import api from './services/API';

export default class Example extends Component {
  state = {
    servicos: [],
    errorMessage: null,
  };

  getServicesList = async () => {
    try{
      const response = await api.getServices();

      console.log("Tela: " + response.data);

      this.setState({ servicos: response.data["servicos"] });
    } catch(response){
      console.log("erro: " + response.data);
      this.setState({ errorMessage: 'Erro'})
    }
  }

  getServicesListCategory = async () => {
    try{
      const response = await api.getServicesByCategory("Jardinagem");

      console.log("Tela: " + response.data);

      this.setState({ servicos: response.data["servicos"] });
    } catch(response){
      console.log("erro: " + response.data);
      this.setState({ errorMessage: 'Erro'})
    }
  }

  getService = async () => {
    try{
      const response = await api.getServiceById("suadh0uhu1uh232ewqeq1");

      console.log("Tela: " + response.data);

      this.setState({ servicos: response.data["servicos"] });
    } catch(response){
      console.log("erro: " + response.data);
      this.setState({ errorMessage: 'Erro'})
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        
        <Button onPress={this.getServicesList} title="Listar"/>
        <Button onPress={this.getServicesListCategory} title="Jardinagem"/>
        <Button onPress={this.getService} title="Aparo de Grama"/>
        
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
