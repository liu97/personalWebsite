import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const getLoginStatus = handleActions(
  {
    Login: (state, action) => ({
        isLogin: true
    }),
    Logout: (state, action) => ({
        isLogin: false
    }),
  },
  { isLogin: false }
);

export const postLoginResult = createSimpleAjaxReduce("PostLoginMessage");