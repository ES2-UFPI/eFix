import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    Alert,
    TouchableOpacity
 } from 'react-native';

export default class ItemContrato extends Component {
    render() {
        console.log(this.props.contrato.id_contrato);

        return(
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={styles.container_top}>
                    <Text style={styles.name}>{this.props.contrato.id_contrato}</Text>
                    <Text>data: {this.props.contrato.data}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 7,
        justifyContent: 'center',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        overflow: 'hidden',
        borderRadius: 10,
        marginTop: 3,
        marginBottom: 3,
        marginLeft: 10,
        marginRight: 10,
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