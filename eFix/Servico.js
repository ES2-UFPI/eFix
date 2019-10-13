import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Button, 
    Alert,
    SafeAreaView,
    Picker
} from 'react-native';

export default class Serviço extends Component{

  constructor(props){
    super(props);
  
    this.state = {
      nome:'' ,
      categoria:'eai',
      preco: 0 ,
      descricao:'',
      PrestadorID: 0,
      ID:0
    };
    
   
  }

  
  render(){
    return(
    
      <View style={styles.container}>
        
      </View>
  
     
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center'
  },
  input:{
    borderRadius:12,
    height:45,
    borderWidth:1,
    borderColor: 'gainsboro',
    margin: 20,
    padding: 10
  },

  D: {
    height:100,
    borderRadius:12,
    borderWidth:1,
    borderColor: 'gainsboro',
    margin: 15,
    padding: 10
  },

  text:{
    textAlign:'center',
    fontFamily: 'normal',
    fontSize: 20,
    fontWeight: 'bold',
    height:22,
    color: 'black',
    marginBottom: 40
  }
});