import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Register from '../views/Register.vue'
import FindPwd from '../views/FindPwd.vue'
import Me from '../views/Me.vue'
import Call from '../views/Call.vue'
import Online from '../views/Online.vue'
import Messback from '../views/Messback.vue'
import Index from '../views/Index.vue'
import Classify from '../views/Classify.vue'
import Details from '../views/Details.vue'
import Ticket from '../views/Ticket.vue'
import Order from '../views/Order.vue'
import TicketDetails from '../views/TicketDetails.vue'
import OrderTicket from '../views/OrderTicket.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/orderTicket',
    name: 'OrderTicket',
    component: OrderTicket
  },
  {
    path: '/ticketDetails',
    name: 'TicketDetails',
    component: TicketDetails
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: Ticket
  },
  {
    path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/classify',
    name: 'Classify',
    component: Classify
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/messback',
    name: 'Messback',
    component: Messback
  },
  {
    path: '/online',
    name: 'Online',
    component: Online
  },
  {
    path: '/call',
    name: 'Call',
    component: Call
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/findPwd',
    name: 'FindPwd',
    component: FindPwd
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
