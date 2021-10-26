import { createRouter, createWebHistory } from 'vue-router'
import { store } from './store'

import Landing from "./views/Landing.vue"
import Profile from "./views/Profile.vue"
import NewRequest from "./views/NewRequest.vue"
import UnAuthorized from "./views/UnAuthorized.vue"

const routes = [
  {
    path: '/',
    component: Landing,
    meta: {
      title: 'Review matches and level up your gaming skill',
    },
  },
  {
    path: '/unauthorized',
    component: UnAuthorized,
  },
  {
    path: '/me',
    component: Profile,
    beforeEnter(to: any, from: any, next: any) {
        if (store.getters.isLoggedIn) {
          next()
        } else {
          next('/unauthorized');
        }
      }
  },
  {
    path: '/requests/new',
    component: NewRequest,
    beforeEnter(to: any, from: any, next: any) {
        if (store.getters.isLoggedIn) {
          next()
        } else {
          next('/unauthorized');
        }
      }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router