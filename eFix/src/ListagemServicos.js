import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import ItemServico from './ItemServico.js'

export default class ListagemServicos extends Component {
    render() {
        return(
            <View style={styles.container}>
                <FlatList data={[
                    {key: '1', nome: 'Trocar tomada', preco: '100,00', categoria: 'Eletricista', descricao: 'Troco tomada mano'},
                    {key: '2', nome: 'Poda', preco: '50,00', categoria: 'Jardinagem', descricao: 'Podo suas pranta'},
                    {key: '3', nome: 'Regular pressão', preco: '75,00', categoria: 'Encanador', descricao: 'Regulo as pressao'}
                ]}
                renderItem={({item}) => <ItemServico nome={item.nome} preco={item.preco} categoria={item.categoria} descricao={item.descricao}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'scroll',
    }
});