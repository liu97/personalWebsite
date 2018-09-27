import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax'


// 获取article列表
export const fetchMessageList = createSimpleAjaxAction('./api/contacts', 'fetchMessageList', 'get');

