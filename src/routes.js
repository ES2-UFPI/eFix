import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TelaFiltroServicos from './screens/TelaFiltroServicos';
import ListagemServicos from './screens/ListagemServicos';
import BuscaServicos from './screens/BuscaServicos';
import TelaPerfilContratante from './screens/TelaPerfilContratante';
import TelaPerfilPrestador from './screens/TelaPerfilPrestador';
const AppNavigator = createStackNavigator(
	{
        busca: { screen: BuscaServicos },
        filterscreen:{screen: TelaFiltroServicos },
        listscreen:{ screen: ListagemServicos },
        fillerscreen:{ screen: TelaPerfilContratante },
        prestadorscreen:{ screen: TelaPerfilPrestador }
    },
    {
        inicialRouteName: 'busca'
    }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;