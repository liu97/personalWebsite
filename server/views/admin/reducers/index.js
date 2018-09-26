import { combineReducers } from 'redux';

import {
	reducerResult,
	getArticleResult,
	getArticleMessageResult,
} from './article'

const rootReducer = combineReducers({
	reducerResult,
	getArticleResult,
	getArticleMessageResult,
})

export default rootReducer;