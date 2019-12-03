import React, { Component } from 'react';

import { View, TextInput, StyleSheet, Text } from 'react-native';

import {AirbnbRating } from 'react-native-ratings';

import { Container, SubContainer } from './styles';
import Button from '../../components/Button';
import { ButtonContainer } from '../CadastrarHorarios/styles';

import API from '../../services/API';

export default class TelaAvaliacao extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            size_rating: 45,
            user_rating: null,
            text: ""
        };
        this.sendRating = this.sendRating.bind(this);
        this.setRating = this.setRating.bind(this);
        this.makeUserAvaliation = this.makeUserAvaliation.bind(this);
        this.comentView = this.comentView.bind(this);
        this.ratingComponent = this.ratingComponent.bind(this);
    }
    
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    setRating = (rating) => {
        this.setState({ size_rating: 10 })
        this.setState({ user_rating: rating});
        this.forceUpdate();
    }

    makeUserAvaliation = () =>{
        var user_avaliation = {
            id_contrato: this.props.id_contrato,
            avaliacao: {
                nota: this.state.user_rating,
                comentario: this.state.text
            }
        }
        return user_avaliation;
    }
    sendRating = async() => {
        var user_avaliation = this.makeUserAvaliation();
        
        if(!(user_avaliation.avaliacao.nota == null)){
            try {
                const response = await API.addContractReview(user_avaliation);
            } catch (response) {
                console.log(response);
            }
            this.props.modal.toggleModal();
        }
    }

    ratingComponent = () => {
        return(
            <AirbnbRating
                    count={5}
                    reviews={["Terrível", "Ruim", "Regular", "OK", "Muito Bom!"]}
                    defaultRating={1}
                    size={this.state.size_rating}
                    onFinishRating={this.setRating}
            />
        );
    }

    comentView() {
        return(
            <TextInput placeholder="Que tal deixar um comentário?"
                          underlineColorAndroid="transparent"
                          maxLength={180}
                          style={styles.Input} 
                          onChangeText={(text) => this.setState({ text })}
            />
        );
    }
    
    render() {

    return(
         <Container>
             <View>
                 {this.ratingComponent()}
                {this.state.user_rating == null ? <View></View> : this.comentView()}
             </View>
            
            <SubContainer>
                <ButtonContainer>
                    <Button text={this.state.user_rating == null ? "OK" : "Avaliar"} onPress={() => {this.sendRating()}}/>        
                </ButtonContainer>
            </SubContainer>
         </Container>
    );
  }
}


const styles = StyleSheet.create({
    Input:{
      borderRadius:12,
      height:65,
      borderWidth:1,
      borderColor: 'gainsboro',
      margin: 20,
      padding: 10
    },
});