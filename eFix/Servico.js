import { AppRegistry } from 'react-native';
import App from './App';
import React, { component } from 'react';


class Servico extends component {

    constructor(props){
        
        super(props)

        this.state = {

            name:"",
            price:"",
            category:"",
            ID:"",
            descrition:"",

        }
    }
}














/*
function Servico(serviceName, servicePrice, serviceCategory, serviceID ){

 var name = serviceName;
 var ID = serviceID;
 var price = servicePrice;
 var category = serviceCategory;

    //gets
    this.getName = function(){
        return name;
    };

    this.getID = function(){
        return ID;
    };

    this.getPrice = function(){
        return price;
    };

    this.getCategory = function(){
        return category;
    };

    //sets
    this.setName = function(value){
        name = value;
    };

    this.setID = function(value){
        ID = value;
    };
    
    this.setCategory = function(value){
        category = value;
    };

    this.setPrice = function(value){
        price = value;    };
}*/