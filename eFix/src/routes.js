import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TelaFiltro from './TelaFiltro';
import ListagemServicos from './ListagemServicos';
import Busca from './Busca';

const AppNavigator = createStackNavigator(
	{
        busca: { screen: Busca },
        filterscreen:{screen: TelaFiltro },
        listscreen:{ screen: ListagemServicos }
    },
    {
        inicialRouteName: 'busca'
    }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;