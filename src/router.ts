import { createRouter, createWebHistory } from 'vue-router'

import Landing from "./views/Landing.vue"

const routes = [
  {
    path: '/',
    component: Landing,
    meta: {
      title: 'Evaluate tasks with the team',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router