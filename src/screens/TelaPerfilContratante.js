import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';

export default class TelaPerfilContratante extends Component{

    constructor(props){
        super(props);

        this.state = {
            nomeUsuario: 'Raimundo Nonato',
            emailUsuario: 'raimundocabecao@yahoo.com.br',
            enderecoUsuario: "Rua Tchurosbangos Tchudosbagos, 2193"
        }
    }


    render(){
        return (
            <View>
                <Text style={styles.top_label}>Perfil de Contratante</Text>
                
                <View style={{flexDirection:'row', marginTop:20}}>
                    <Text style={styles.text_name}>Nome: </Text>
                     <Text style={styles.text_info}>{this.state.nomeUsuario}</Text>
                </View>
                
                <View style = {styles.container}>
                    <Text>Email: {this.state.emailUsuario}</Text>
                    <Text>Endereço: {this.state.enderecoUsuario}</Text>
                </View>
            </View>    
        );
    }

}
    const styles = StyleSheet.create({
        top_label:{
            backgroundColor:"#1e90ff",
            color: "white",
            fontWeight: 'bold',
            fontSize: 26,
            padding: 20
        },
        container: {
            borderBottomWidth: 1,
            borderColor: 'grey'
        },
        text_name:{
            color: "black",
            fontWeight: "bold",
            fontSize: 18
        },
        text_info:{
            fontSize: 18
        }
    });
