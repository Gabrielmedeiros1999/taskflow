<script setup>
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

import { useTaskStore } from './stores/taskStore';
import Toast from './components/Toast.vue';
import { useToast } from './composables/useToast';

const { mensagem, tipo, visivel } = useToast();

const taskStore = useTaskStore();

// Salvar automaticamente as alterações no LocalStorage
taskStore.$subscribe((mutation, state) => {
  try {
    localStorage.setItem(
      'taskflow-tarefas',
      JSON.stringify(state.tarefas)
    );
  } catch (erro) {
    console.error('Erro ao salvar tarefas:', erro);
  }
}, {
  detached: true
});
</script>

<template>
  <div class="app-container">
    <Sidebar />

    <main class="main-content">
      <Header />

      <RouterView />
      <Toast
        v-if="visivel"
        :mensagem="mensagem"
        :tipo="tipo"
      />
    </main>
  </div>
</template>