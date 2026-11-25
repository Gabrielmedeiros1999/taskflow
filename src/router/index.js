import { createRouter, createWebHistory } from 'vue-router';

import SettingsView from '../views/SettingsView.vue';
import DashboardView from '../views/DashboardView.vue';
import TasksView from '../views/TasksView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import CalendarView from '../views/CalendarView.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/tarefas',
    name: 'tarefas',
    component: TasksView
  },
  {
    path: '/projetos',
    name: 'projetos',
    component: ProjectsView
  },
  {
    path: '/calendario',
    name: 'calendario',
    component: CalendarView
  },
  {
    path: '/configuracoes',
    name: 'configuracoes',
    component: SettingsView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;