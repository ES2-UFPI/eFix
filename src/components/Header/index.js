import React, { Component } from 'react';
import {
    Container,
    Text
} from './styles';

export default class SimpleButton extends Component {
    render() {
        return(
            <Container>
                <Text>{this.props.title}</Text>
            </Container>
        );
    }
}