import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native';
import ItemServicoShow from './ItemServicoShow.js';
import api from '../services/API';

export default class ListagemServicoPrestador extends Component {
    
    state = {
        servicos: [],
        servico: [],
        errorMessage: null,
        filter: null,
        value: null,
        value2: null, 
        value3: null,
        id_prestador: null,
        ord: null
    };

    componentDidMount() {
        this.updateServicesList(this.props.filter, this.props.value, this.props.value2, this.props.value3, this.props.ord);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.filter !== prevState.filter || nextProps.value !== prevState.value || nextProps.value2 !== prevState.value2 || nextProps.value3 !== prevState.value3 || nextProps.ord !== prevState.ord) {
            return {
                filter: nextProps.filter,
                value: nextProps.value,
                value2: nextProps.value2,
                value3: nextProps.value3,
                ord: nextProps.ord
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filter !== this.props.filter || prevProps.value !== this.props.value || prevProps.value2 !== this.props.value2 || prevProps.value3 !== this.props.value3 || prevProps.ord !== this.props.ord) {
            console.log("Atualizar lista");
            this.updateServicesList(this.props.filter, this.props.value, this.props.value2, this.props.value3, this.props.ord);
        }
    }

    updateServicesList(filter, value, value2, value3, ord) {
        this.setState({ filter: filter, value: value , value2: value2, value3: value3, ord: ord });
        console.log("ENTROU AQUI 1");
        switch(filter) {
            case 'provider':
                console.log("ENTROU AQUI 2 ID: " + value);
                this.getServicesProvider(value);
                break;
            default:
                this.getServicesList();
                console.log("Sem filtro");
                break;
        }
    }

   

    getServicesProvider = async (id_prestador) => {
        try{
            console.log("AAAAAAAAAAAA");
            const response = await api.getProviderServicesList(id_prestador);
            console.log("Telassssss: " + response.data);
            this.setState({servicos: response.data["servicos"]})
        }   catch (response) {
            console.log("DEU ERRO");
            this.setState({errorMessage: "Erro"});
        }
    }

    getServicesByPreco = async (preco) => {
        try {
            const response = await api.getServicesUnderPrice(preco);

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }

    showAlert = () => {
        Alert.alert("Contratar serviço");
    }

    render() {
        const emptyList = <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Nenhum serviço recuperado.</Text> 

        </View>

        return(
            <View style={styles.container}>
               
                {console.log(this.state.servicos)}

                <FlatList 
                    data={this.state.servicos}
                    ListEmptyComponent={emptyList}
                    extraData={this.state.servicos}
                    renderItem={({item}) => <ItemServicoShow servico={item}/>}
                    keyExtractor={(item, id_servico) => item.nome + id_servico}
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
        backgroundColor:'white'
    },
    buttons:{
        alignItems: 'center',
        justifyContent: 'center',
        height:15,
        elevation: 20,
        
    },
    buttonText:{
        padding: 4,
        fontSize:15
    }
});