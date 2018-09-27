import { combineReducers } from 'redux';

import {
	reducerResult,
	getArticleResult,
	getArticleMessageResult,
	getPutArticleResult,
	deleteArticleResult,
	postArticleResult,
} from './article'

const rootReducer = combineReducers({
	reducerResult,
	getArticleResult,
	getArticleMessageResult,
	getPutArticleResult,
	deleteArticleResult,
	postArticleResult,
})

export default rootReducer;