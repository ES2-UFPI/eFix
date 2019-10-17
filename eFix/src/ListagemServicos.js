import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import ItemServico from './ItemServico.js';
import api from './services/API';

export default class ListagemServicos extends Component {
    state = {
        servicos: [],
        errorMessage: null,
    };

    constructor(props) {
        super(props);

        const valor = this.props.value;
        switch(this.props.filter) {
            case 'categoria':
                this.getServiceByCategoria(valor);
                console.log("Filtro por categoria " + valor);
                break;
            case 'preco':
                this.getServiceBypreco(valor);
                console.log("Filtro por preco " + valor);
                break;
            default:
                this.getServiceList();
                console.log("Sem filtro");
                break;
        }
    }

    getServiceList = async () => {
        try {
            const response = await api.getServices();

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }

    getServiceByCategoria = async (categoria) => {
        try {
            const response = await api.getServicesByCategory(categoria);

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }
    getServiceBypreco = async (preco) => {
        try {
            const response = await api.getServiceUnderPrice(preco);

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