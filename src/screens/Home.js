import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet } from 'react-native';
import ItemServico from './ItemServico.js';
import api from '../services/API';
import SimpleButton from '../components/SimpleButton';

export default class Home extends Component {
    state = {
        servicos: [],
        errorMessage: null,
    };

    static navigationOpitions = {
        title: "Home",
    }

    componentDidMount(){
        this.getService();
    }

    getService = async () => {
        try{
          const response = await api.getServiceById("suadh0uhu1uh232ewqeq1");
    
          console.log("Tela: " + response.data);
    
          this.setState({ servicos: response.data["servicos"] });
        } catch(response){
          console.log("erro: " + response.data);
          this.setState({ errorMessage: 'Erro'})
        }
      }

    render(){
        const emptyList = <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Nenhum serviço recuperado.</Text></View>
        return(
            <View>
                <View style={styles.header}>
                    <Text style={styles.texto_header}>
                        Bem vindo, João
                    </Text>
                </View>
                <View style={styles.box}>
                    <View style={styles.container}>
                        <Text style={styles.texto}>
                            Seu próximo serviço mais próximo é
                        </Text>
                    </View>
                    <View style={styles.container}>
                        <FlatList 
                            data={this.state.servicos}
                            ListEmptyComponent={emptyList}
                            renderItem={({item}) => <ItemServico servico={item}/>}
                            keyExtractor={(item, id_servico) => item.nome + id_servico}
                        />
                    </View>
                    <SimpleButton title="Ir para serviço"/>
                </View>
            </View>
        );   
    }
}

const styles = StyleSheet.create({
    header:{
        padding: 10,
        height: 60,
        backgroundColor: "#2196f3",
        fontWeight: 'bold',
        marginBottom: 8,
        elevation: 10
        
    },
    container:{
        marginHorizontal: 20,
        marginBottom: 8
    },
    texto_header:{
        fontSize: 16,
        fontWeight: "bold",
        padding: 10,
        color: "#FFF"
    },
    texto:{
        fontSize: 14,
        padding: 10,
    },
    box:{
        borderBottomColor: "#ebf0f0",
        borderTopColor: "#ebf0f0",
        borderLeftColor: "#ebf0f0",
        borderRightColor: "#ebf0f0",
        borderWidth: 1,
        borderRadius: 15,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 8,
        backgroundColor: "#ebf0f0",
        elevation: 10,
        borderStyle: "dotted"
    }

});