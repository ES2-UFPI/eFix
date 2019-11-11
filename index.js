/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/screens/BottomBar';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';

import configureStore from './src/redux/store';

const store = configureStore()

const RNRedux = () => (
    <Provider store = { store }>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);