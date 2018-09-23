import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from '../util/ajax'

export const test = createAction('test');

export const fetchPost = createSimpleAjaxAction('./api/articles', 'fetchArticleList', true);


