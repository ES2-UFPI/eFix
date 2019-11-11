import React, { Component } from 'react';
import {
    Touchable,
    Text
} from './styles';

export default class Button extends Component {
    render() {
        return(
            <Touchable onPress={this.props.onPress}>
                <Text>{this.props.text}</Text>
            </Touchable>
        );
    }
}