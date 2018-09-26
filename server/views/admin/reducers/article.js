import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const reducerResult = handleActions(
  {
    test: (state, action) => ({
      counter: state.counter+1
    })
  },
  { counter: 0 }
);

export const getArticleResult = createSimpleAjaxReduce("fetchArticleList")

