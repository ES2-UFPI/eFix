import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    Alert,
    Button,
    TouchableOpacity
 } from 'react-native';
 import api from '../services/API';

export default class ItemContrato extends Component {
    
    state = {
        prest_usuario: [],
        prest_prestador: {},
        servico: [],
        errorMessage: null,
    }
  
   
    getPrestador = async () => {
        try {
            const response = await api.getProvider(this.props.contrato.id_prestador);
            
            console.log("Recebendo id de prestador: " + response.data);

            this.setState({ prest_prestador: response.data });
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
        }

        try {
            const response = await api.getUser(this.state.prest_prestador.id_usuario);

            console.log("recebedo usuario: " + response.data);

            this.setState({ prest_usuario: response.data });
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
        }
    }
    
    getServico = async () => {
        try {
            const response = await api.getServiceById(this.props.contrato.id_servico);
            
            console.log("Recebendo id de serviço: " + response.data);

            this.setState({ servico : response.data });
        } catch(response) {
            console.log("erro: " + response.data);
            this.setState({ errorMessage: 'Erro'})
        }

    }
   getAtivoOuNao() {
        try {
            console.log("status: " + this.props.contrato.ativo);
            if ( this.props.contrato.ativo === true) {
                
                return "Ativo";
            } else {
                return "Inativo";
            }
           
        } catch (error) {
            console.log("Erro desconhecido" );
        }

   }
   componentDidMount(){
    this.getPrestador();
    this.getServico();
    }
    render() {
        console.log(this.props.contrato.id_contrato);
        var data = this.props.contrato.data.dia + "/" + this.props.contrato.data.mes + "/" 
            + this.props.contrato.data.ano + " às " + this.props.contrato.data.hora + ":"
            + (this.props.contrato.data.min < 10 ? "0" : "") + this.props.contrato.data.min;
        return(
            <TouchableOpacity style={styles.container} onPress={this.props.onPress} >
                <View style={styles.container_top}>
                    <Text style={styles.name}>{this.state.servico.nome}</Text>
                    </View>
                    <Text>Prestador: {this.state.prest_usuario.nome}</Text>
                    <Text>Status: {this.getAtivoOuNao()}</Text>
                    <Text>Data: {data}</Text>
         
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
        marginTop: 1,
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
    },
    login: {
        backgroundColor: '#1e90ff',
        color: 'white',
        width: "75%",
        borderRadius: 10,
        textAlign: 'center',
        marginLeft: '10%',
        padding: "2%",
        fontSize:  16,
        marginTop: '2%'
        
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