import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    Alert,
    TouchableOpacity
 } from 'react-native';
 import api from '../services/API';

export default class ItemContratoPrestador extends Component {
    
    state = {
        prest_usuario: [],
        prest_prestador: {},
        servico: [],
        contratante:[],
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
    getContratante = async () => {
      
        try {
            const response = await api.getUser(this.props.contrato.id_usuario);

            console.log("recebedo usuario: " + response.data);

            this.setState({ contratante: response.data });
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
    this.getContratante();
    }
    render() {
        console.log(this.props.contrato.id_contrato);
        return(
            <TouchableOpacity style={styles.container}>
                <View style={styles.container_top}>
                    <Text style={styles.name}>{this.state.servico.nome}</Text>
                    </View>
                    <Text>Contratante: {this.state.contratante.nome}</Text>
                    <Text>Status: {this.getAtivoOuNao()}</Text>
                    <Text>Data: {this.props.contrato.data}</Text>
                
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