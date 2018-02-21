import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './redux';
import { MainNavigator } from './navigators';

export default class App extends Component {
	render() {
		return (
			<Provider store={configureStore.store}>
				<PersistGate loading={null} persistor={configureStore.persistor}>
					<MainNavigator />
				</PersistGate>
			</Provider>
		);
	}
}
