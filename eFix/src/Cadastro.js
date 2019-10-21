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
import api from './services/API';

export default class Cadastro extends Component{

  constructor(props){
    super(props);
  
    this.state = {
      idprestador:'mathe2us1',
      idservico:'s2wf123c5dacu',
      nome:'' ,
      categoria:'',
      preco: 0 ,
      precos:'',
      descricao:'',
      erro:'',
      erroEnv:''
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
    if(state.categoria == '' || state.categoria == "Seleciona categoria..." || state.erro != '' || state.nome == '' || state.preco == '' || state.descricao == '' || state.preco == 0 || isNaN(state.preco)){
      state.erroEnv= "Não foi possível cadastrar este serviço, talvez algum campo não tenha sido escrito ou existe um campo inserido de maneira errônea."
      Alert.alert("Erro!");
    }else{  
      var env = "{\"categoria\": \"" +  state.categoria +"\", \"descricao\": \"" + state.descricao +"\", \"id_prestador\": \""+ state.idprestador + "\", \"id_servico\": \""+ state.idservico + "\", \"nome\": \""+ state.nome + "\", \"preco\" : \" "+ state.precos + "\"}";
      state.erroEnv = '';
      api.createService(env);
      Alert.alert("Cadastrado!");
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
          <Picker.Item label="Jardinagem" value="Jardinagem" />
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
        <Text style={{color:'red', textAlign:'center', marginTop: 10}}>{this.state.erroEnv}</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    height: 40,
    color: 'black',
    marginBottom: 40
  }
});