import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax'

export const test = createAction('test');

export const fetchArticleList = createSimpleAjaxAction('./api/articles', 'fetchArticleList', 'get');


export const fetchArticleMessage = createSimpleAjaxAction('./api/articles', 'fetchArticleMessage', 'get');
