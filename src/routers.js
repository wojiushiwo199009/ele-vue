import Home from './main-components/home.vue'
import Login from './main-components/login.vue'

const routers = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/home',
    component: Home
  /* children: [
       {
        path: '/',
        component: Login
      }
    ] */
  }
  /* {
    path: '/home/:id',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'first',
        name: 'first',
        component: First
      }
    ]
  } */
]
export default routers
