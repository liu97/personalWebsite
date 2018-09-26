import { combineReducers } from 'redux';

import {
	reducerResult,
	getArticleResult
} from './article'

const rootReducer = combineReducers({
	reducerResult,
	getArticleResult
})

export default rootReducer;