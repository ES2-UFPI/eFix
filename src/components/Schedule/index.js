import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
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
                    <Title>Intervalos</Title>
                    <FlatList 
                        data={this.props.intervals}
                        renderItem={({item}) => <Text>{item[0]} - {item[1]}</Text>}
                    />
                </Item>
            </Container>
        );
    }
}