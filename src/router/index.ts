import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
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
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/DrinkList.vue")
  },
  {
    path: "/drinks",
    name: "drinks",
    component: () => import("../views/Day.vue")
  },
  {
    path: "/drinks/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})",
    name: "drinks-date",
    component: () => import("../views/Day.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
