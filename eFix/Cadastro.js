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
import API from './src/services/API';

export default class Cadastro extends Component{

  constructor(props){
    super(props);
  
    this.state = {
      idprestador:'jonas12',
      idservico:'aswf123cdacue',
      nome:'' ,
      categoria:'',
      preco: 0 ,
      precos:'',
      descricao:'',
      erro:'',
      env2:''
    };
    this.enviar = this.enviar.bind(this);
    this.pegaPreco = this.pegaPreco.bind(this);
  }

  pegaPreco(p){
    let state = this.state;
    var t = p;
    t.replace(',', '.');
    var test = parseFloat(t);

    if(isNaN(test) || p[0] == '.' || test < 0){
      state.erro='Valor digitado em preço é inválido.';
    }
    else{
    state.erro='';
    state.preco = test;
    state.precos = t;
    }
    this.setState(state);
  }
  
  enviar(){
    let state = this.state;
    var env = "{\"categoria\": \"" +  state.categoria +"\", \"descricao\": \"" + state.descricao +"\", \"id_prestador\": \""+ state.idprestador + "\", \"id_servico\": \""+ state.idservico + "\", \"nome\": \""+ state.nome + "\",preco\":\" "+ state.precos + "\"}";
    state.env2 = env;
    API.createService(env);
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

        <Button title="Cadastrar" onPress={this.enviar}/>
        <Text style={{color:'red', textAlign:'center', marginTop: 10}}>{this.state.erro}</Text>
        <Text>{this.state.env2} </Text>
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