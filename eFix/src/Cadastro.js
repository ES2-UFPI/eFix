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

export default class Cadastro extends Component{

  constructor(props){
    super(props);
  
    this.state = {
      nome:'' ,
      categoria:'eai',
      preco: 0 ,
      descricao:'',
      erro:''
    };
    
    this.pegaPreco = this.pegaPreco.bind(this);
  }

  pegaPreco(p){
    let state = this.state;
    var test = parseFloat(p);

    if(isNaN(test) || p[0] == '.' || test < 0){
      state.erro='Valor digitado em preço é inválido.';
    }
    else{
    state.erro='';
    state.preco = test;
    }
    this.setState(state);
  }
  
  render(){
    return(
    
      <View style={styles.container}>
        <Text style={styles.text}>Cadastrar Serviço</Text>
        
        <TextInput style={styles.input}  
          placeholder="Nome" 
          underlineColorAndroid="transparent" 
          onChangeText={(nome) => this.setState({nome})}/>
        
        <View style={{flexDirection:"row"}}>
          <Picker
            selectedValue={this.state.categoria}
            style={{height: 40, width: 180, backgroundColor:'gainsboro', marginLeft:25, justifyContent:'flex-start', borderRadius:12}}
            itemStyle={{alignItems:'center', padding:10}}
            onValueChange={(itemValue) => this.setState({categoria: itemValue})}>
          <Picker.Item label="Seleciona categoria..." value="" />
          <Picker.Item label="Jardineiro" value="Jardineiro" />
          <Picker.Item label="Eletricista" value="Eletricista" />
          <Picker.Item label="Diarista" value="Diarista" />
          <Picker.Item label="Encanador" value="Encanador" />
          </Picker>  
        
          <TextInput style={{justifyContent:'flex-end', borderRadius:12, borderWidth:1, borderColor:'gainsboro',marginLeft:18, padding:7, width:100}}  
            placeholder="Preço" 
            underlineColorAndroid="transparent"  
            onChangeText={this.pegaPreco}
            keyboardType={'numeric'}/>
        </View>  

        <TextInput style={styles.D}  
          placeholder="Insira uma descrição para o serviço aqui..." 
          underlineColorAndroid="transparent" 
          onChangeText={(descricao) => this.setState({descricao})}/>

        <Button title="Cadastrar" onPress={() => Alert.alert('Simple Button pressed')}/>
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