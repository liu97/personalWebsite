import { combineReducers } from 'redux';

import {
	reducerResult,
	getArticleResult
} from './test'

const rootReducer = combineReducers({
	reducerResult,
	getArticleResult
})

export default rootReducer;