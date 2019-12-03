import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet } from 'react-native';
import ItemServico from './ItemServico.js';
import api from '../services/API';
import SimpleButton from '../components/SimpleButton';
import Modal from 'react-native-modal';
import RatingScreen from './TelaAvaliacao';
import Button from '../components/Button/index.js';

export default class Home extends Component {
    state = {
        servicos: [],
        errorMessage: null,
        isModalVisible: false,
    };

    static navigationOpitions = {
        title: "Home",
    }

    componentDidMount(){
        this.getService();
    }

    getService = async () => {
        try{
          const response = await api.getServiceById("0be18d85f66b5cb34f07e36581a872f25ce73d050104812d107a006ba66cafdc");
    
          console.log("Tela: " + response.data);
    
          this.setState({ servicos: [response.data] });
        } catch(response){
          console.log("erro: " + response.data);
          this.setState({ errorMessage: 'Erro'})
        }
      }
    
    toggleModal= () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
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
                </View>
                <Button onPress={this.toggleModal}>Avaliar</Button>
                <Modal isVisible={this.state.isModalVisible}
                       onBackdropPress={() => this.setState({ isModalVisible: false })}>
                        <RatingScreen id_contrato={"2692dcd0b4e110615fe0cce675f93a2190fb0821be1b30f4ee5815694ffd1f54"} modal={this}/>                     
                </Modal>
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