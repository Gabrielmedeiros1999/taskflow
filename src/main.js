import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './style.css';
import App from './App.vue';

import router from './router';
import { useTaskStore } from './stores/taskStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Salva as tarefas no localStorage sempre que algo mudar
const taskStore = useTaskStore();
taskStore.$subscribe((mutation, state) => {
  localStorage.setItem('taskflow-tarefas', JSON.stringify(state.tarefas));
});

app.mount('#app');