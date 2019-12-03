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
            user_rating: null,
            text: ""
        };
        this.sendRating = this.sendRating.bind(this);
        this.setRating = this.setRating.bind(this);
        this.makeUserAvaliation = this.makeUserAvaliation.bind(this);
        this.comentView = this.comentView.bind(this);
        this.ratingComponent = this.ratingComponent.bind(this);
    }
    componentWillUpdate(){
        console.log(this.state);
    }

    setRating = (rating) => {
        console.log("Rate: " + rating);
        this.setState({ user_rating: rating});
        this.forceUpdate();
    }

    makeUserAvaliation = () =>{
        console.log("Montando review...");
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
        console.log("Avaliation: " + user_avaliation.id_contrato);
        console.log("Avaliation: " + user_avaliation.avaliacao.nota);
        console.log("Avaliation: " + user_avaliation.avaliacao.comentario);

        try {
            const response = await API.addContractReview(user_avaliation);
            console.log(response);
        } catch (response) {
            console.log(response);
        }
        this.props.modal.toggleModal();
    }

    ratingComponent = () => {
        return(
            <AirbnbRating
                    count={5}
                    reviews={["Terrível", "Ruim", "Regular", "OK", "Muito Bom!"]}
                    defaultRating={5}
                    size={45}
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
                {this.state.user_rating == null ? this.ratingComponent() : this.comentView()}
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