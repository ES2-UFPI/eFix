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
        errorMessage: null
    };

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

    getServiceByCategoria = async () => {
    }

    getServiceByMargemDePreco = async () => {
    }

    render() {
        const emptyList = <View>
            <Text>Nenhum serviço recuperado.</Text>
        </View>

        switch(this.props.filter) {
            case 'categoria':
                this.getServiceByCategoria();
                console.log("Filtro por categoria " + this.props.value);
                break;
            case 'preco':
                this.getServiceByMargemDePreco();
                console.log("Filtro por preco " + this.props.value);
                break;
            default:
                this.getServiceList();
                console.log("Sem filtro");
                break;
        }

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