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
    Picker
  } from 'react-native';
  import React, { Component } from 'react';
  import ListagemServicos from './ListagemServicos';

export default class Busca extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      pesquisa:'', 
      erro:'',
      servicos: [],
    };
    
    this.pegaPesquisa = this.pegaPesquisa.bind(this);
    this.showListS = this.showListS.bind(this);
  }
  pegaPesquisa(s){
    let state = this.state;
    state.erro='';
    state.pesquisa = s;
    
    this.setState(state);
  }
  showListS(){ 
    let state = this.state;
    var x = state.pesquisa;
    this.setState({servicos: <ListagemServicos filter='busca' value={x} />});
  } 
render() {
    
    return (
        <View style={ styles.container }>
          <ListagemServicos/>
          <View style={styles.input_view}>
            <TextInput style={styles.input}  
              placeholder="digite um nome ou servico..." 
              underlineColorAndroid="transparent" 
              onChangeText={this.pegaPesquisa}
              />
          </View>            
          
          <View style={styles.button_view}>
              <Button title="Buscar" onPress={this.showListS}/>      
             
              <Button title='Filtrar' onPress={ () => {this.props.navigation.navigate('filterscreen')} } />
          </View>
          
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
      backgroundColor: '#F5FCFF',
    },
    button_view:{
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: 8
    },
    input_view:{
      justifyContent: 'center',
      padding: 10
    },
    input:{
      borderRadius:12,
      height:40,
      borderWidth:1,
      borderColor: 'gainsboro',
      width:350,
      padding: 10
    },
  });