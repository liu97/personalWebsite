import App from 'containers/App'
import Home from 'pages/Home'
import Article from 'pages/Article/List'
import Detail from 'pages/Article/Detail'
import Edit from 'pages/Article/Edit'

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/article/list',
        component: Article,
      },
      {
        path: '/article/detail',
        component: Detail
      },
      {
        path: '/article/edit',
        component: Edit
      }

    ]
  }
]

export default routes