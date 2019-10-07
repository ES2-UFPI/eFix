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
        <Text>  Nome:</Text>
        <TextInput style={styles.input}  placeholder="Nome" underlineColorAndroid="transparent"/>
        <Text>  Email:</Text>
        <TextInput style={styles.input}  placeholder="Email" underlineColorAndroid="transparent"/>
        <Text>  Senha:</Text>
        <TextInput style={styles.input}  placeholder="Senha" underlineColorAndroid="transparent" secureTextEntry={true}/>
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