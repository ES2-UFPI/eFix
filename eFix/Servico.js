import { AppRegistry } from 'react-native';
import App from './App';
import React, { component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Firebase from 'firebase';

export default class Servico extends component {

    constructor(props){
        
        super(props)

        this.state = { servicos: [] }
    }

   
render() {
   /* const emptyList = <View>
        <Text>Ainda não há cursos cadastrados.</Text>
    </View>
*/
    return (
        <View style={ styles.container }>
                       
                    <Button 
                        title='Busca Por Categoria' 
                        onPress={ () => {this.props.navigation.navigate('App')} } />
                    <Button 
                        title='Busca Por Preco' 
                        onPress={ () => {this.props.navigation.navigate('App')} } />
               
        </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});