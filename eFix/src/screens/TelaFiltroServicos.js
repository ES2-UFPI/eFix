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
import api from '../services/API';

export default class TelaFiltro extends Component{

  constructor(props){
    super(props);
  
    this.state = {
      categorias: [],
      preco:0, 
      categoria:'',
      erro:'',
      servicos: [],
    };

    this.pegaPreco = this.pegaPreco.bind(this);
    this.showListP = this.showListP.bind(this);
    this.showListC = this.showListC.bind(this);
    this.getCategorias = this.getCategorias.bind(this);
    this.getCategorias();


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

  getCategorias = async () => {
    let state = this.state;

    try{
    const response = await api.getCategories();
    state.categorias = response.data["categorias"];
    //console.log("Ola " + response.data["categorias"]);
    this.setState({categorias: response.data["categorias"]});
  }catch(response){
    this.setState({categorias: response.data["categorias"]});}
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

    let CategoriaItem = this.state.categorias.map((v, k) => {
        return <Picker.Item key={v} value={v.nome} label={v.nome} />
      }
    );

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
              style={{height: 30, width: 180, backgroundColor:'gainsboro', marginLeft:10, borderRadius:12, marginTop: 16}}
              itemStyle={{alignItems:'center', padding:10}}
              onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}>
            <Picker.Item label="Seleciona categoria..." value="" />
            {CategoriaItem}
          </Picker> 
        </View>

        <View style={styles.fixToText}>
          <Button title="Por Preço" onPress={this.showListP}/>
          <Button title="por Categoria" onPress={this.showListC}/>
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
    justifyContent: 'space-around'
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