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
import ItemContrato from './ItemContrato';
import api from '../services/API';

export default class ListagemContratos extends Component {
    
    state = {
    
        contrato:[],
        contratos: [],
        errorMessage: null,
        filter: null,
        ord: null
    };

    componentDidMount() {
        this.updateContractList(this.props.filter, this.props.ord);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.filter !== prevState.filter || nextProps.ord !== prevState.ord) {
            return {
                filter: nextProps.filter,
                ord: nextProps.ord
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filter !== this.props.filter || prevProps.ord !== this.props.ord) {
            console.log("Atualizar lista");
            this.updateServicesList(this.props.filter, this.props.ord);
        }
    }

    updateContractList(filter, ord) {
        this.setState({ filter: filter, ord: ord });

        switch(filter) {

            default:
                this.getContractList("2e6d9b3a01d160d77f46fd9e5798344f77be8de245da0b13eb537982d50f94a8");
                console.log("cara especifico");
                break;
        }
    }

    getContractList = async (id_usuario) => {
        try {
            const response = await api.getUserContracts(id_usuario);

            console.log("Tela firs response: " + response.data);

            this.setState({contratos: response.data["contratos"]});
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
            <Text>Nenhum contrato recuperado.</Text> 

        </View>

        return(
            <View style={styles.container}>
               
                {console.log(this.state.contratos)}

                <FlatList 
                    data={this.state.contratos}
                    ListEmptyComponent={emptyList}
                    extraData={this.state.contratos}
                    renderItem={({item}) => <ItemContrato contrato ={item} onPress={() => this.props.navigation.navigate('ContratoOptionsscreen', { contrato: item })}/>}
                    keyExtractor={(item, id_contrato) => item.id_usuario + id_contrato}
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