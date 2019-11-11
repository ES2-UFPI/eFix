import React, { Component } from 'react';
import {
    Container,
    Input
} from './styles'

export default class SimpleTextInput extends Component {
    render() {
        return(
            <Container>
                <Input placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                />
            </Container>
        );
    }
}