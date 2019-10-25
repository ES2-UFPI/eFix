import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TelaFiltroServicos from './TelaFiltroServicos';
import ListagemServicos from './ListagemServicos';
import BuscaServicos from './BuscaServicos';

const AppNavigator = createStackNavigator(
	{
        busca: { screen: BuscaServicos },
        filterscreen:{screen: TelaFiltroServicos },
        listscreen:{ screen: ListagemServicos }
    },
    {
        inicialRouteName: 'busca'
    }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;