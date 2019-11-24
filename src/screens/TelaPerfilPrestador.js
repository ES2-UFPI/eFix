import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import ListagemServicoPrestador from './ListagemServicoPrestador.js';

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
            disponibilidade: 'Serviços Ativados no momento...',
            horariosDisponibilizados:[],
        }
        this.trocarDisponibilidade = this.trocarDisponibilidade.bind(this);
        this.listarServicos = this.listarServicos.bind(this);
        this.listarServicos();
    }

    static navigationOptions = {
        title: 'Perfil de Prestador de Serviços',
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

    componentDidMount() {
        console.log(this.props.navigation.getParam('usuario'));
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

    listarServicos(){
        let state = this.state;
        console.log('ID de prestado: ' + this.props.navigation.getParam('usuario')['id_prestador']);
        state.servicosAutorais = [];
        state.servicosAutorais = <ListagemServicoPrestador filter='provider' value={this.props.navigation.getParam('usuario')['id_prestador']}/>;
        this.setState(state);

    }

    render(){
        return (
            <View style={{flex: 1}}>
                <View style={{alignItems:'center', alignContent: 'center', borderBottomColor:'gainsboro', marginBottom: 5}}>
                  <Image source={{uri:'https://i.pinimg.com/originals/05/3d/9f/053d9f3c1a5306a28109aa7a85eed9e7.jpg'}} style={{height: 120 , width: 120, marginLeft: 10, marginTop: 20, borderRadius: 120/2}}/>
                  <View style={{marginTop:5}} >
                        <Text style={{textAlign:'center', fontSize: 25, color: 'black'}}>{this.props.navigation.getParam('usuario')['nome']}</Text>
                        <Text style={{textAlign:'center'}}>{this.props.navigation.getParam('usuario')['email']}</Text>
                        <Text style={{textAlign:'center'}}>{this.props.navigation.getParam('usuario')['endereco']}</Text>
                        
                        <View style={{flexDirection:'row', justifyContent: 'center', marginTop: 5}}>
                        <TouchableOpacity style={styles.buttons_left} onPress={() =>  {this.props.navigation.navigate('fillerscreen')}}>
                          <Text style={{color:'white', fontSize:11.5}}>Perfil de Contratante</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttons_center} onPress={() => this.props.navigation.navigate('cadastro_servico', {id_prestador: this.props.navigation.getParam('usuario')['id_prestador']})}>
                          <Text style={{color:'white', fontSize:11.5}}>Cadastrar Servicos</Text>
                        </TouchableOpacity>
                      

                        <TouchableOpacity style={styles.buttons_right}>
                          <Text style={{color:'white', fontSize:11.5}}>Editar Serviços</Text>
                        </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'center', marginTop: 5}}>
                        <TouchableOpacity style={styles.buttons_left}  onPress={this.trocarDisponibilidade}>
                          <Text style={{color:'white', fontSize:11.5}}>Trocar Disponibilidade</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttons_center} onPress = {() => this.props.navigation.navigate('ListagemContratosPrestadorscreen')}>
                          <Text style={{color:'white', fontSize:11.5}}>Visualizar Contratos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttons_right}>
                          <Text style={{color:'white', fontSize:11.5}}>Visualizar Horários</Text>
                        </TouchableOpacity>
                        </View>

                        <Text style={{width: 414, marginTop: 5, color: 'white', textAlign:'center', borderWidth:1, borderColor:'gainsboro', backgroundColor:'lightskyblue'}}>{this.state.disponibilidade}</Text>

                  </View> 
                </View>   
                {this.state.servicosAutorais}
                
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
            fontSize: 14
        },
        buttons_center:{
            margin: 1, 
            borderWidth: 0, 
            alignItems:'center', 
            borderRadius:0, 
            padding: 5, 
            height: 30,
            backgroundColor: 'dodgerblue',
            borderColor: 'dodgerblue'
          },
          buttons_left:{
              margin: 1,
            borderWidth: 0, 
            alignItems:'center', 
            borderTopLeftRadius:20,
            borderBottomLeftRadius:20,  
            padding: 5, 
            height: 30,
            backgroundColor: 'dodgerblue',
            borderColor: 'dodgerblue'
          },
          buttons_right:{
            margin: 1, 
            borderWidth: 0, 
            alignItems:'center', 
            borderTopRightRadius:20,
            borderBottomRightRadius:20,  
            padding: 5, 
            height: 30,
            backgroundColor: 'dodgerblue',
            borderColor: 'dodgerblue'
          }

    });
