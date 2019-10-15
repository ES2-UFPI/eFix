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

export default class TelaFiltro extends Component{

  constructor(props){
    super(props);
  
    this.state = {
      inserir:'', 
      categoria:'',
      erro:''
    };
    
  
  }

  
  render(){
    return(
    
      <View style={styles.container}>
        <Text style={styles.text}>Filtragem</Text>
        
        <TextInput style={styles.input}  
          placeholder="insira aqui o dado do serviço procurado..." 
          underlineColorAndroid="transparent" 
          onChangeText={(inserir) => this.setState({inserir})}/>
        <View style={styles.fixToText}>
          <Button title="Buscar por Categoria" onPress={() => Alert.alert('Busca por categoira')}/>
          <Button title="Buscar por Preço" onPress={() => Alert.alert('Busca por categoira')}/>
        </View>  
        <Text style={{color:'red', textAlign:'center', marginTop: 10}}>{this.state.erro}</Text>
 
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

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  text:{
    textAlign:'center',
    fontFamily: 'normal',
    fontSize: 43,
    fontWeight: 'bold',
    height:56,
    color: 'black',
    marginBottom: 40
  }
});