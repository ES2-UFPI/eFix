import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TelaPerfilContratante from '../screens/TelaPerfilContratante';
import TelaPerfilPrestador from '../screens/TelaPerfilPrestador';
import CadastroServico from '../screens/CadastroServico';
import ListagemContratos from '../screens/ListagemContratos';
const AppNavigator = createStackNavigator(
	{
        fillerscreen:{ screen: TelaPerfilContratante },
        prestadorscreen:{ screen: TelaPerfilPrestador },
        cadastro_servico: { screen: CadastroServico },
        ListagemContratosscreen: { screen: ListagemContratos }
    },
    {
        inicialRouteName: 'fillerscreen'
    }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;