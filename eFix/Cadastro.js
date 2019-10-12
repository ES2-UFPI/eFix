import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Button, 
    Alert,
    SafeAreaView
} from 'react-native';



export default class Cadastro extends Component{

  render(){
    return(
      <SafeAreaView style={styles.container}> 
      <View style={styles.container}>
        <Text style={styles.text}>Cadastrar Usuário</Text>
        <Text>  Nome do Serviço:</Text>
        <TextInput style={styles.input}  placeholder="Nome do Serviço" underlineColorAndroid="transparent"/>
        <Text>  Descrição:</Text>
        <TextInput style={styles.input}  placeholder="Descrição" underlineColorAndroid="transparent"/>
        <Text>  Preço:</Text>
        <TextInput style={styles.input}  placeholder="Preço" underlineColorAndroid="transparent" secureTextEntry={true}/>
        <Text>  Cetegoria:</Text>
        <TextInput style={styles.input}  placeholder="Categoria" underlineColorAndroid="transparent" secureTextEntry={true}/>
        <Button title="Cadastrar" onPress={() => Alert.alert('Simple Button pressed')}/>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center'
  },
  input:{
    height:45,
    borderWidth:1,
    borderColor: 'grey',
    margin: 20,
    padding: 10
  },
  text:{
    textAlign:'center',
    fontSize: 20,
    height:22,
    color: 'black'
  }
});