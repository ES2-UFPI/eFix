import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    Alert,
    TouchableOpacity
 } from 'react-native';

export default class ItemServico extends Component {
    showAlert = () => {
        Alert.alert("Contratar serviço");
    }

    render() {
        console.log(this.props.servico.id_servico);

        return(
            <TouchableOpacity style={styles.container} onPress={this.showAlert}>
                <View style={styles.container_top}>
                    <Text style={styles.name}>{this.props.servico.nome}</Text>
                    <Text>R$ {this.props.servico.preco}</Text>
                </View>
                <Text style={styles.title}>Categoria</Text>
                <Text>{this.props.servico.categoria}</Text>
                <Text style={styles.title}>Descrição</Text>
                <Text>{this.props.servico.descricao}</Text>
            </TouchableOpacity>
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