import React, { Component } from 'react';
import {
    Container,
    Top,
    Name,
    Text,
    Title
} from './styles';

export default class Service extends Component {
    showAlert = () => {
        Alert.alert("Contratar serviço");
    }

    render() {
        console.log(this.props.servico.id_servico);

        return(
            <Container>
                <Top>
                    <Name>{this.props.servico.nome}</Name>
                    <Text>R$ {this.props.servico.preco}</Text>
                </Top>
                <Title>Categoria</Title>
                <Text>{this.props.servico.categoria}</Text>
                <Title>Descrição</Title>
                <Text>{this.props.servico.descricao}</Text>
            </Container>
        );
    }
}