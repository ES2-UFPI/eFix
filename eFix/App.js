import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import {createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import render from './Busca';
import Busca from './Busca';

class HomeScreen extends Component{
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
class secondscreen extends Component{
  render(){

    return(

 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      
       
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
