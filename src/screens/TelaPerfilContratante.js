import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import api from '../services/API';

export default class TelaPerfilContratante extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarios: [
                {
                    id:'',
                    imagem: 'http://media.agora.com.vc/thumbs/capas/image_1399.jpg',
                    nomeUsuario: 'Raimundo Nonato',
                    emailUsuario: 'raimundocabecao@yahoo.com.br',
                    enderecoUsuario: "Rua Tchurosbangos Tchudosbagos, 2193",
                    servicos: ["Nenhum serviço contratado."],
                    tipo: 'contratante',
                    selecionado: true
                },
                {
                    id:'',
                    imagem: 'http://media.agora.com.vc/thumbs/capas/image_1399.jpg',
                    nomeUsuario: 'Ted Sousa',
                    emailUsuario: 'ted@mail.com',
                    enderecoUsuario: "Rua Apinage, 1800",
                    servicos: ["Nenhum serviço prestado."],
                    tipo: 'prestadorServico',
                    selecionado: false
                }	
            ],
            prestador : [],
            ehPrestador: false
        }
       
    }

    static navigationOptions = {
        title: 'Perfil',
        headerStyle: {
            backgroundColor: '#2196f3',
            height: 60,
            elevation: 10,
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            padding: 4,
        }
    }

	mudarPerfil() {
		let usuarios = this.state.usuarios;

		usuarios.map((usuario) => {
			usuario.selecionado = !usuario.selecionado;
		});

		this.setState({usuarios});
    }

    getUserprivileges = async (id) => {
        try {
            const response = await api.getUser(id);
            
            console.log("Tela: " + response.data);
           if (response.data.id_prestador === undefined) {
            console.log("nao é prestador");
           }else{
            console.log("é prestador");
            this.setState({prestador: response.data});
            this.setState({ehPrestador: true});
            return 1;
           }
                
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }
    buttonClickded = () => {
        Alert.alert(
          "Atenção!",
          "Voce Não é prestador de serviço",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );}
    
    componentDidMount(){
        this.getUserprivileges("34d61fb7f20eb7e0538544b4b09bfb429b02ddc704a3b7f66ab75cb5ba438397");
    
        }
    render() {
        let usuario;
        
        this.state.usuarios.map((usr) => {
            if(usr.selecionado) {
                usuario =  usr;
            }
        });

        return (
            <View>

                <View style={{alignItems:'center', alignContent: 'center'}}>
                  <Image source={{uri:usuario.imagem}} style={{height: 150 , width: 150, marginLeft: 10, marginTop: 20, borderRadius: 150/2}}/>
                    <View style={{marginTop:20}} >
                        <Text style={{textAlign:'center', fontSize: 25, color: 'black'}}>{this.state.prestador.nome}</Text>
                        <Text style={{textAlign:'center'}}>{this.state.prestador.email}</Text>
                        <Text style={{textAlign:'center'}}>{this.state.prestador.endereco}</Text>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={styles.buttons}
                            onPress={() =>  { this.getUserprivileges("cbe876ac4f8d8db430e81d46c2510869bc30d24a231d7039bbf1e4137d53b333")
                                if ( this.state.ehPrestador == true) {
                                this.props.navigation.navigate('prestadorscreen', {usuario: this.state.prestador})}
                                else{console.log("nao é prestador");
                            this.buttonClickded();
                            }}
                            }>
                            <Text style={{color:'white'}}>Perfil de Prestador</Text>
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