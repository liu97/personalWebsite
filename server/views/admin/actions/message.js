import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax'


// 获取message列表
export const fetchMessageList = createSimpleAjaxAction('./api/contacts', 'fetchMessageList', 'get');

// 删除单个message
export const deleteMessageMessage = createSimpleAjaxAction('./api/contacts', 'deleteMessageMessage', 'delete');

// 获取单个message
export const getMessageMessage = createSimpleAjaxAction('./api/contacts', 'getMessageMessage', 'get');

// 修改信息查看状态
export const putMessageMessage = createSimpleAjaxAction('./api/contacts', 'putMessageMessage', 'put');

