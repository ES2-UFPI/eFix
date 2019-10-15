import React, { Component } from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import Example from './src/Example';
import ListagemServicos from './src/ListagemServicos'

export default class HelloWorldApp extends Component {
 
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>eFix</Text>
        <ListagemServicos/>
      </View>
    );
  }
}
