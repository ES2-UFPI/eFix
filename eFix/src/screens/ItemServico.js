import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet
 } from 'react-native';

export default class ItemServico extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.container_top}>
                    <Text style={styles.name}>{this.props.nome}</Text>
                    <Text>R$ {this.props.preco}</Text>
                </View>
                <Text style={styles.title}>Categoria</Text>
                <Text>{this.props.categoria}</Text>
                <Text style={styles.title}>Descrição</Text>
                <Text>{this.props.descricao}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 7,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        overflow: 'hidden',
    },
    container_top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    name: {
        fontSize: 18,
    },
    title: {
        fontSize: 10,
        color: 'gray',
    }
});