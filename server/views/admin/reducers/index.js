import { combineReducers } from 'redux';

import {
	reducerResult,
	getArticleResult,
	getArticleMessageResult,
	getPutArticleResult,
	deleteArticleResult,
	postArticleResult,
} from './article'

import {
	getMessageListResult,
	deleteMessageResult,
	getMessageResult,
	putMessageResult,
} from './message'

const rootReducer = combineReducers({
	reducerResult,
	getArticleResult,
	getArticleMessageResult,
	getPutArticleResult,
	deleteArticleResult,
	postArticleResult,
	getMessageListResult,
	deleteMessageResult,
	getMessageResult,
	putMessageResult,
})

export default rootReducer;