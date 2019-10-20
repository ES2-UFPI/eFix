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
  import TelaFiltro from './src/TelaFiltro'
  import AppNavigator from './App';
  import ListagemServicos from './src/ListagemServicos';
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
<TextInput style={styles.input}  
           
           
           
           placeholder="digite um nome ou servico..." 
            underlineColorAndroid="transparent" 
            onChangeText={this.pegaPesquisa}
            //keyboardType={'text'}
            />
            
              <Button title="Buscar" onPress={this.showListS}/>      
                   
                    <Button 
                        title='Filtrar Resultados' 
                        onPress={ () => {this.props.navigation.navigate('filterscreen')} } />
          
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
  });