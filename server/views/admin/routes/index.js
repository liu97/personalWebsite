import App from 'containers/App'
import Home from 'components/Home'
import Article from 'components/Article'

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/article',
        component: Article
      }
    ]
  }
]

export default routes