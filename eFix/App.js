import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import {createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Busca from './Busca';
import TelaFiltro from './src/TelaFiltro'
import ListagemServicos from './src/ListagemServicos';

class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#1e90ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    
  };
  
  render(){

    return(

 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        <Button 
                        title='Ir para tela de Busca de Serviços' 
                        onPress={ () => {this.props.navigation.navigate('secondscreen')} } />
      </View>

    );
  }
}

const AppNavigator = createStackNavigator(
	{
		Home: { 
      
			screen: HomeScreen
	
    },
    secondscreen:{
      screen: Busca
    },
    filterscreen:{
      screen: TelaFiltro
    },
    listscreen:{
      screen: ListagemServicos
    }
    },
    
    {
inicialRouteName: 'Home'
    }
);
 const AppContainer = createAppContainer(AppNavigator);
export default class HelloWorldApp extends Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}
