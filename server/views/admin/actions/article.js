import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax'

export const test = createAction('test');

// 获取article列表
export const fetchArticleList = createSimpleAjaxAction('./api/articles', 'fetchArticleList', 'get');

// 删除单个article
export const deleteArticleMessage = createSimpleAjaxAction('./api/articles', 'deleteArticleMessage', 'delete');

// 获取单个article信息
export const fetchArticleMessage = createSimpleAjaxAction('./api/articles', 'fetchArticleMessage', 'get');

// 修改单个article信息
export const putArticleMessage = createSimpleAjaxAction('./api/articles', 'putArticleMessage', 'put');

// 新增article
export const postArticleMessage = createSimpleAjaxAction('./api/articles', 'postArticleMessage', 'post');
