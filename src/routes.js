import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TelaFiltroServicos from './screens/TelaFiltroServicos';
import ListagemServicos from './screens/ListagemServicos';
import BuscaServicos from './screens/BuscaServicos';
import TelaContrato from './screens/TelaContrato';
import TelaPerfilContratante from './screens/TelaPerfilContratante';
import TelaPerfilPrestador from './screens/TelaPerfilPrestador';
import CadastroServico from './screens/CadastroServico';

const AppNavigator = createStackNavigator(
	{
        busca: { screen: BuscaServicos },
        contrato: {screen: TelaContrato },
        filterscreen:{screen: TelaFiltroServicos },
        listscreen:{ screen: ListagemServicos },
        fillerscreen:{ screen: TelaPerfilContratante },
        prestadorscreen:{ screen: TelaPerfilPrestador },
        cadastro_servico: { screen: CadastroServico }
    },
    {
        inicialRouteName: 'busca'
    }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;