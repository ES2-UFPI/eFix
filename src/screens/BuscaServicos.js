import {
    Platform,
    StyleSheet,
    Text,
    Button, 
    View,
    Image,
    TextInput,
    Alert,
    SafeAreaView,
    Picker,
    TouchableOpacity
  } from 'react-native';
  import React, { Component } from 'react';
  import ListagemServicos from './ListagemServicos';
  import SimpleButton from '../components/SimpleButton';
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import SimpleTextInput from '../components/SimpleTextInput';
  import api from '../services/API';

export default class Busca extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      pesquisa:'', 
      erro:'',
      servicos: <ListagemServicos />,
      categorias: [],
      preco: '',
      categoria: '',
    };
    
    this.pegaPesquisa = this.pegaPesquisa.bind(this);
    this.showListS = this.showListS.bind(this);
    this.pegaPreco = this.pegaPreco.bind(this);
    this.showErro = this.showErro.bind(this);
    this.getCategorias = this.getCategorias.bind(this);
    this.getCategorias();
  }

  pegaPesquisa(s){
    let state = this.state;
    state.erro='';
    state.pesquisa = s;
    this.setState(state);
  }

  showListS(){ 
    if (this.state.preco !=null && this.state.categoria == '' && this.state.pesquisa == ''){
      let state = this.state;
      var x = state.preco;
      this.setState({servicos: <ListagemServicos filter='preco' value={x} />});
    }
    else if (this.state.categoria!= '' && this.state.pesquisa == '' && this.state.preco =='') {
      let state = this.state;
      var x = state.categoria;
      this.setState({servicos: <ListagemServicos filter='categoria' value={x} />});
    }
    else if (this.state.categoria!= '' && this.state.pesquisa == '' && this.state.preco != '') {
      let state = this.state;
      var x = state.categoria;
      var z = state.preco;
      this.setState({servicos: <ListagemServicos filter='busca3' value={x} value2={z}/>});
    }
    else if (this.state.categoria == '' && this.state.pesquisa != '' && this.state.preco != '') {
      
      let state = this.state;
      var x = state.pesquisa;
      var z = state.preco;
      this.setState({servicos: <ListagemServicos filter='busca2' value={x} value2={z}/>});
    }
    else if (this.state.categoria != '' && this.state.pesquisa != '' && this.state.preco == '') {
      let state = this.state;
      var x = state.pesquisa;
      var z = state.categoria;
      this.setState({servicos: <ListagemServicos filter='busca4' value={x} value2={z}/>});
    }
    else if (this.state.categoria != '' && this.state.pesquisa != '' && this.state.preco != '') {
      let state = this.state;
      var x = state.pesquisa;
      var z = state.categoria;
      var w = state.preco;
      this.setState({servicos: <ListagemServicos filter='buscatudinho' value={x} value2={z} value3={w}/>});
    }
     else if (this.state.pesquisa != '' && this.state.preco == '' && this.state.categoria== '') {
      let state = this.state;
      var x = state.pesquisa;
      this.setState({servicos: <ListagemServicos filter='busca' value={x} />});
    }
  } 

  pegaPreco(p){
    let state = this.state;
    var t = p;
    t.replace(',', '.');
    var test = parseFloat(t);

    if((isNaN(test) || p[0] == '.' || test < 0) && t !== ''){
      state.erro='Valor digitado em preço é inválido.';
      state.preco = 0;
    }
    else{
    state.erro='';
    state.preco = test;
    }
    this.setState(state);
    console.log(this.state.erro);
    this.showErro();
    console.log(this.state.preco);
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

  showErro() {
    if (this.state.erro === '') {
      this.setState({ show_erro: null });
    } else {
      this.setState({ show_erro: <Text style={{color:'red', textAlign:'center', marginTop: 10}}>{this.state.erro}</Text> })
    }
  }

  mandarFiltragem = () => {
    this.props.filtragemCallback(this.state.categoria, this.state.preco);
  };

  render() {
    let CategoriaItem = this.state.categorias.map((v, k) => {
        return <Picker.Item key={v} value={v.nome} label={v.nome} />
    });

    return (
        <View style={ styles.container }>
          
          <View style={styles.input_view}>
            <TextInput style={styles.input}  placeholder="Digite o nome de um serviço..." 
              underlineColorAndroid="transparent" 
              onChangeText={this.pegaPesquisa}
              />
            <TouchableOpacity style={styles.search_Button} onPress={this.showListS}>
              <Icon style={{color: 'white'}} size={20} name={'search'} onPress={this.showListS}/>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.text}>Opções de filtragem:</Text>
          <View style={styles.container2}>
            <TextInput style={styles.input2} placeholder="Preço máximo..." 
              underlineColorAndroid="transparent" 
              onChangeText={this.pegaPreco}
              keyboardType={'numeric'}/>
            
            <Picker
              selectedValue={this.state.categoria}
              style={{height: 33, width: 120, backgroundColor:'gainsboro', marginLeft:5, borderRadius:12, marginTop: 10}}
              itemStyle={{alignItems:'center', padding:10}}
              onValueChange={(itemValue, itemIndex) => this.setState({ categoria: itemValue })}>
              <Picker.Item label="Categoria..." value="" />
              {CategoriaItem}
            </Picker>
          </View>
          {this.state.show_erro}
          
          
        {this.state.servicos}     
        </View>
    );
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     // justifyContent: 'center',
     // alignItems: 'center',
    },
    container2: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "gainsboro",
      marginBottom: 18,
    },
    button_view:{
      flexDirection: "column",
      justifyContent: "center",
      marginBottom: 8
    },
    input_view:{
      flexDirection: 'row',
      justifyContent: "space-around",
      marginTop: 10,
    },
    input:{
      borderRadius:12,
      height:40,
      borderWidth:1,
      borderColor: 'gainsboro',
      width:300,
      padding: 10,
      marginTop:7,
      backgroundColor: 'white'
    },
    input2:{
      borderRadius:12,
      height:40,
      borderWidth:1,
      borderColor: 'gainsboro',
      width:120,
      padding: 10,
      marginTop:7,
      marginBottom: 10,
      backgroundColor:"white"
    },
    text: {
      textAlign: "left",
      marginLeft: 35,
      marginBottom:6,
      fontSize: 15,
    },
    search_Button:{
      alignItems:"center",
      alignContent:"center", 
      borderWidth:1,
      borderRadius: 10,
      marginRight: 25,
      height: 40,
      padding: 10,
      marginTop: 7,
      backgroundColor: '#1e90ff',
      borderColor: '#1e90ff',
      elevation: 5
    }
  });