import React, { Component } from 'react';
import {
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Touchable,
    Container,
    Image,
    Info,
    Name,
    Category,
    Avaliation,
} from './styles';

export default class ProviderButton extends Component {
    render() {
        return(
            <Touchable onPress={this.props.onPress}>
                <Container>
                    <Image source={{uri: this.props.imagem}}/>
                </Container>
                <Container>
                    <Info>
                        <Name>
                            {this.props.usuario.nome}
                        </Name>
                        <Category>
                            {this.props.servico.categoria}
                        </Category>
                    </Info>
                    <Avaliation>
                        <Icon style={[{color: 'gold'}]} size={10} name={'star'}/> {this.props.prestador.nota_media}
                    </Avaliation>
                </Container>
            </Touchable>
        );
    }
}