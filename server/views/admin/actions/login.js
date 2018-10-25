import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax'

// 获取登录结果
export const PostLoginMessage = createSimpleAjaxAction('./api/apis/login', 'PostLoginMessage', 'post');

export const Login = createAction('Login');

export const Logout = createAction('Logout');