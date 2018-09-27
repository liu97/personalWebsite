import App from 'containers/App';
import Home from 'pages/Home';
import ArticleList from 'pages/Article/List';
import ArticleAdd from 'pages/Article/Add';
import ArticleDetail from 'pages/Article/Detail';
import ArticleEdit from 'pages/Article/Edit';
import MessageList from 'pages/Message/List';
import MessageDetail from 'pages/Message/Detail';

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/article/add',
        component: ArticleAdd,
      },
      {
        path: '/article/list',
        component: ArticleList,
      },
      {
        path: '/article/detail',
        component: ArticleDetail
      },
      {
        path: '/article/edit',
        component: ArticleEdit
      },
      {
        path: '/message/list',
        component: MessageList,
      },
      {
        path: '/message/detail',
        component: MessageDetail,
      },
    ]
  }
]

export default routes