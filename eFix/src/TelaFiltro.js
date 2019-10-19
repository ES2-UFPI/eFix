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
import ListagemServicos from './ListagemServicos.js';

export default class TelaFiltro extends Component{

  constructor(props){
    super(props);
  
    this.state = {
      preco:0, 
      categoria:'',
      erro:'',
      servicos: [],
    };
    
    this.pegaPreco = this.pegaPreco.bind(this);
    this.showListP = this.showListP.bind(this);
    this.showListC = this.showListC.bind(this);
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
    }
    this.setState(state);
  }

  showListP(){ 
    let state = this.state;
    var x = state.preco;
    this.setState({servicos: <ListagemServicos filter='preco' value={x} />});
  } 

  showListC(){ 
    let state = this.state;
    var x = state.categoria;
    state.servicos = <ListagemServicos filter='categoria' value={x}/>;
    console.log(this.state.servicos);
    state.servicos2 = state.servicos; 
    this.setState(state);
  } 

  render(){

    return(
      <View style={styles.container}>
        <Text style={styles.text}>Filtragem</Text>
        
        <View style={styles.fixToText}>
          <TextInput style={styles.input}  
            placeholder="Preço máximo..." 
            underlineColorAndroid="transparent" 
            onChangeText={this.pegaPreco}
            keyboardType={'numeric'}/>

          <Picker
              selectedValue={this.state.categoria}
              style={{height: 50, width: 180, backgroundColor:'gainsboro', marginLeft:10, borderRadius:12}}
              itemStyle={{alignItems:'center', padding:10}}
              onValueChange={(itemValue) => this.setState({categoria: itemValue})}>
            <Picker.Item label="Seleciona categoria..." value="" />
            <Picker.Item label="Jardineiro" value="Jardineiro" />
            <Picker.Item label="Eletricista" value="Eletricista" />
            <Picker.Item label="Diarista" value="Diarista" />
            <Picker.Item label="Encanador" value="Encanador"/>
          </Picker> 
        </View>

        <View style={styles.fixToText}>
          <Button title="Buscar por Preço" onPress={this.showListP}/>
          <Button title="Buscar por Categoria" onPress={this.showListC}/>
        </View>  
        <Text style={{color:'red', textAlign:'center', marginTop: 10}}>{this.state.erro}</Text> 
        
        {this.state.servicos}
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
    height:40,
    borderWidth:1,
    borderColor: 'gainsboro',
    width:120,
    margin: 10,
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