import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ExampleActions from '../redux';

export function* exampleApiCall() {
	try {
		const response = yield call(() => fetch('https://jsonplaceholder.typicode.com/posts'));
		const data = yield call(() => response.json());
		yield put({ type: ExampleActions.GET_API_CALL_SUCCESS, data });
	} catch (err) {
		yield put({ type: ExampleActions.GET_API_CALL_FAILURE });
	}
}

export default function* root() {
	yield all([
		takeLatest(ExampleActions.GET_API_CALL, exampleApiCall)
	])
}
