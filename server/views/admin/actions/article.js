import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax'

export const test = createAction('test');

export const fetchList = createSimpleAjaxAction('./api/articles', 'fetchArticleList', 'get');


