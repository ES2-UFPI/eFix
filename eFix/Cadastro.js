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

  constructor(props){
    super(props);
  
    this.state = {
      nome:'' ,
      tipo:'' ,
      preco:'' ,
      descricao:''
    };

  }


  render(){
    return(
    
      <View style={styles.container}>
        <Text style={styles.text}>Cadastrar um Serviço</Text>
        
        <Text>  Nome:</Text>
        <TextInput style={styles.input}  
          placeholder="Nome" 
          underlineColorAndroid="transparent" 
          onChangeText={(nome) => this.setState({nome})}/>

        <Text>  Tipo de Serviço:</Text>
        <TextInput style={styles.input}  
          placeholder="Tipo de Serviço" 
          underlineColorAndroid="transparent" 
          onChangeText={(tipo) => this.setState({tipo})}/>
        
        <Text>  Preço:</Text>
        <TextInput style={styles.input}  
          placeholder="Preço" 
          underlineColorAndroid="transparent"  
          onChangeText={(preco) => this.setState({preco})}/>
        
        <Text>  Descrição:</Text>
        <TextInput style={styles.D}  
          placeholder="Insira uma descrição para o serviço aqui..." 
          underlineColorAndroid="transparent" 
          onChangeText={(descricao) => this.setState({descricao})}/>
        
        <Button title="Cadastrar" onPress={() => Alert.alert('Simple Button pressed')}/>
    
      </View>
     
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

  D: {
    height:60,
    borderWidth:1,
    borderColor: 'grey',
    margin: 20,
    padding: 10
  },

  text:{
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
    height:22,
    color: 'black'
  }
});