import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'remote-redux-devtools';
import Reactotron from 'reactotron-react-native';

const persistConfig = {
	key: 'root',
	storage
};

export default (rootReducer, rootSaga) => {
	const middlewares = [];
	const enhancers = [];

	const persistedReducer = persistReducer(persistConfig, rootReducer);
	const sagaMonitor = Reactotron.createSagaMonitor();
	const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

	middlewares.push(sagaMiddleware);

	if (__DEV__) {
		enhancers.push(composeWithDevTools(applyMiddleware(...middlewares)))
	} else {
		enhancers.push(applyMiddleware(...middlewares));
	}

	const getCreateStore = __DEV__ ? Reactotron.createStore : createStore;
	const store = getCreateStore(persistedReducer, compose(...enhancers));
	const persistor = persistStore(store);

	sagaMiddleware.run(rootSaga);

	return { store, persistor };
}
