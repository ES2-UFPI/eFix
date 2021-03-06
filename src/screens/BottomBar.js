import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './Home';
import CadastroServico from './CadastroServico';
import BuscaServicos from './BuscaServicos';
import TelaContrato from './TelaContrato';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {createAppContainer } from 'react-navigation';
import SearchRoutes from '../routes/SearchRoutes';
import ProfileRoutes from '../routes/ProfileRoutes';
import TelaPerfilContratante from './TelaPerfilContratante';

const BottomTab =  createMaterialBottomTabNavigator(
  {
    Home: { screen: Home,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'home'}/>  
                    </View>
                ),  
            }
    },
    Busca: { screen: SearchRoutes,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'search'}/>  
                    </View>
                ),  
            }
    },
    Perfil: { screen: ProfileRoutes,
        navigationOptions:{
            tabBarIcon: ({ tintColor }) => (  
                <View>  
                    <Icon style={[{color: tintColor}]} size={25} name={'account-circle'}/>  
                </View>
            ),  
        }
},
  },
  {
    navigationOptions: {
        headerSytle: {
            backgroundColor: "#ebd034"
        },
        headerTintColor: "#FFF"
    },
    shifting: true,
    initialRouteName: 'Home',
    activeColor: '#2196f3',
    inactiveColor: '#788281',
    barStyle: { backgroundColor: '#DEE6E6'},
}
);

export default createAppContainer(BottomTab);