import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet
 } from 'react-native';

export default class ListagemServicos extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Listagem de serviços</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        justifyContent: 'center'
    }
});