import {createRouter, createWebHistory} from 'vue-router'
import AllTasks from '@/views/AllTasks'
import CreateNew from '@/views/CreateNew'
import OneTask from '@/views/OneTask'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: AllTasks },
    { path: '/new', component: CreateNew },
    { path: '/task/:id', component: OneTask }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})
