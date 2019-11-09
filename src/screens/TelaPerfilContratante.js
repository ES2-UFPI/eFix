import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';

export default class TelaPerfilContratante extends Component{

    constructor(props){
        super(props);

        this.state = {
            id:'',
            nomeUsuario: 'Raimundo Nonato',
            emailUsuario: 'raimundocabecao@yahoo.com.br',
            enderecoUsuario: "Rua Tchurosbangos Tchudosbagos, 2193",
            servicos: ["Nenhum serviço contratado."]
        }
    }


    render(){
        return (
            <View>
                <Text style={styles.top_label}>Perfil de Contratante</Text>

                <View style={{alignItems:'center', alignContent: 'center'}}>
                  <Image source={{uri:'http://media.agora.com.vc/thumbs/capas/image_1399.jpg'}} style={{height: 150 , width: 150, marginLeft: 10, marginTop: 20, borderRadius: 150/2}}/>
                  <View style={{marginTop:20}} >
                        <Text style={{textAlign:'center', fontSize: 25, color: 'black'}}>{this.state.nomeUsuario}</Text>
                        <Text style={{textAlign:'center'}}>{this.state.emailUsuario}</Text>
                        <Text style={{textAlign:'center'}}>{this.state.enderecoUsuario}</Text>
                        
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttons}>
                          <Text style={{color:'white'}}>Trocar de Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttons}>
                          <Text style={{color:'white'}}>Editar Perfil</Text>
                        </TouchableOpacity>
                        </View>
                  </View> 
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
            fontSize: 24,
            padding: 20
        },
        container:{
            borderBottomWidth: 1,
            borderColor: 'grey',
        },
        text_name:{
            color: "black",
            fontWeight: "bold",
            fontSize: 15
        },
        text_info:{
            justifyContent: 'center',
            alignContent: 'center',
            fontSize: 15
        },
        buttons:{
          margin: 10, 
          borderWidth: 1, 
          alignItems:'center', 
          borderRadius:20, 
          padding: 10, 
          height: 40,
          backgroundColor: 'dodgerblue',
          borderColor: 'dodgerblue'
        }

    });
