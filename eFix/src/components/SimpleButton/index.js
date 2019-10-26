import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';
import {
    Container
} from './styles'

export default class SimpleButton extends Component {
    render() {
        return(
            <Container>
                <Button title={this.props.title} onPress={this.props.onPress}/>
            </Container>
        );
    }
}