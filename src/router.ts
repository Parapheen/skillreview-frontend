import { createRouter, createWebHistory } from 'vue-router'

import Landing from "./views/Landing.vue"

const routes = [
  {
    path: '/',
    component: Landing,
    meta: {
      title: 'Review matches and level up your gaming skill',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router