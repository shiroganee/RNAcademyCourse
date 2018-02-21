import { combineReducers } from 'redux';
import configureStore from './configureStore';
import rootSaga from '../saga';

const ADD_ELEMENT = 'ADD_ELEMENT';
const REMOVE_ELEMENT = 'REMOVE_ELEMENT';
export const GET_API_CALL = 'GET_API_CALL';
export const GET_API_CALL_SUCCESS = 'GET_API_CALL_SUCCESS';
export const GET_API_CALL_FAILURE = 'GET_API_CALL_FAILURE';

export const addElement = (element) => ({ type: ADD_ELEMENT, element });
export const removeElement = (element) => ({ type: REMOVE_ELEMENT, element });
export const getApiCall = () => ({ type: GET_API_CALL });

export const INITIAL_STATE = {
	elements: [],
	posts: [],
	postsCount: 0
};

const example = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_ELEMENT:
			return {
				...state,
				elements: [...state.elements, action.element]
			};

		case REMOVE_ELEMENT:
			return {
				...state,
				elements: state.elements.filter(element => element !== action.element)
			};

		case GET_API_CALL_SUCCESS:
			return {
				...state,
				postsCount: action.data.length,
				posts: action.data
			};

		default:
			return state;
	}
};

const appReducer = combineReducers({
	example
});

export default configureStore(appReducer, rootSaga);
