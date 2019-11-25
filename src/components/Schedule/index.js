import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import {
    Container,
    Title,
    Item,
    IconView,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Schedule extends Component {
    render() {
        return(
            <Container>
                <IconView>
                    <Icon style={[{color: '#2196f3'}]} size={20} name={'date-range'}/>
                </IconView>
                <Item>
                    <Title>Dia da Semana</Title>
                    <Text>{this.props.day}</Text>
                </Item>
                <Item>
                    <Title>Intervalo</Title>
                    <Text>{this.props.start} às {this.props.finish}</Text>
                </Item>
            </Container>
        );
    }
}