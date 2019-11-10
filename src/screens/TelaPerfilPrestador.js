import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';

export default class TelaPerfilPrestador extends Component{

    constructor(props){
        super(props);

        this.state = {
            id:'',
            nomeUsuario: 'Raimundo Nonato',
            emailUsuario: 'raimundocabecao@yahoo.com.br',
            enderecoUsuario: "Rua Tchurosbangos Tchudosbagos, 2193",
            servicosAutorais: ["Nenhum serviço cadastrado."],
            servicosContratados:'',
            disponibilidade: 'Serviços Desativados no momento...',
            horariosDisponibilizados:[]
        }
        this.trocarDisponibilidade = this.trocarDisponibilidade.bind(this);
    }

    trocarDisponibilidade(){
        let state = this.state;
        if(state.disponibilidade == "Serviços Desativados no momento..."){
            this.setState({disponibilidade: 'Serviços Ativados no momento...'});
        }
        else{
            this.setState({disponibilidade: 'Serviços Desativados no momento...'});
        }
    }

    render(){
        return (
            <View>
                <Text style={styles.top_label}>Perfil de Prestador de Servicos</Text>

                <View style={{alignItems:'center', alignContent: 'center', borderBottomColor:'gainsboro', marginBottom: 5}}>
                  <Image source={{uri:'http://media.agora.com.vc/thumbs/capas/image_1399.jpg'}} style={{height: 120 , width: 120, marginLeft: 10, marginTop: 20, borderRadius: 120/2}}/>
                  <View style={{marginTop:5}} >
                        <Text style={{textAlign:'center', fontSize: 25, color: 'black'}}>{this.state.nomeUsuario}</Text>
                        <Text style={{textAlign:'center'}}>{this.state.emailUsuario}</Text>
                        <Text style={{textAlign:'center'}}>{this.state.enderecoUsuario}</Text>
                        
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttons} onPress={() =>  {this.props.navigation.navigate('fillerscreen')}}>
                          <Text style={{color:'white'}}>Perfil de Contratante</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttons}>
                          <Text style={{color:'white'}}>Cadastrar Servicos</Text>
                        </TouchableOpacity>
                      

                        <TouchableOpacity style={styles.buttons}>
                          <Text style={{color:'white'}}>Editar Serviços</Text>
                        </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity style={styles.buttons}  onPress={this.trocarDisponibilidade}>
                          <Text style={{color:'white'}}>Trocar Disponibilidade</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttons}>
                          <Text style={{color:'white'}}>Visualizar Horários</Text>
                        </TouchableOpacity>
                        </View>

                  </View> 
                </View>   

                <View style={{alignContent:'center'}}>
                    <Text style={{color: 'white', textAlign:'center', borderWidth:1, borderColor:'gainsboro', backgroundColor:'lightskyblue'}}>{this.state.disponibilidade}</Text>
                    <Text style={{textAlign: 'center'}}>{this.state.servicosAutorais}</Text>
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
            fontSize: 13
        },
        buttons:{
          margin: 5, 
          borderWidth: 1, 
          alignItems:'center', 
          borderRadius:20, 
          padding: 7, 
          height: 40,
          backgroundColor: 'dodgerblue',
          borderColor: 'dodgerblue'
        }

    });
