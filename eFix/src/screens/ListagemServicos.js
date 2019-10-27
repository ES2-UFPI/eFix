import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import ItemServico from './ItemServico.js';
import api from '../services/API';

export default class ListagemServicos extends Component {
    
    state = {
        servicos: [],
        errorMessage: null,
        filter: null,
        value: null
    };

    componentDidMount() {
        this.updateServicesList(this.props.filter, this.props.value);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.filter !== prevState.filter || nextProps.value !== prevState.value) {
            return {
                filter: nextProps.filter,
                value: nextProps.value
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filter !== this.props.filter || prevProps.value !== this.props.value) {
            console.log("Atualizar lista");
            this.updateServicesList(this.props.filter, this.props.value);
        }
    }

    updateServicesList(filter, value) {
        this.setState({ filter: filter, value: value });

        switch(filter) {
            case 'categoria':
                this.getServicesByCategoria(value);
                console.log("Filtro por categoria " + value);
                break;
            case 'preco':
                this.getServicesByPreco(value);
                console.log("Filtro por preco " + value);
                break;
            case 'busca':
                this.getServicesBySearch(value);
                console.log("Filtro de busca por " + value);
                break;
            default:
                this.getServicesList();
                console.log("Sem filtro");
                break;
        }
    }

    getServicesList = async () => {
        try {
            const response = await api.getServices();

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }

    getServicesByCategoria = async (categoria) => {
        try {
            const response = await api.getServicesByCategory(categoria);

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
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

    getServicesBySearch = async (texto) => {
        try {
            const response = await api.getServicesSearch(texto);

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
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
                    renderItem={({item}) => <ItemServico nome={item.nome} preco={item.preco} categoria={item.categoria} descricao={item.descricao}/>}
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
    }
});