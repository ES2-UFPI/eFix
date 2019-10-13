import {
    Platform,
    StyleSheet,
    Text,
    Button, 
    View
  } from 'react-native';
export default class busca extends React.Component {

   
render() {


    return (


        <View style={ styles.container }>
                       
                    <Button 
                        title='Busca Por Categoria' 
                        onPress={ () => {this.props.navigation.navigate('App')} } />
                    <Button 
                        title='Busca Por Preco' 
                        onPress={ () => {this.props.navigation.navigate('App')} } />
               
        </View>
    );
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });