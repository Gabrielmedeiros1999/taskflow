
<script setup>
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import StatCard from './components/StatCard.vue';
import TaskList from './components/TaskList.vue';

// Dados das tarefas
const tarefas = [
  {
    id: 1,
    titulo: "Estudar fundamentos do Vue.js",
    projeto: "Estudos",
    prioridade: "Alta",
    status: "Em andamento"
  },
  {
    id: 2,
    titulo: "Organizar tarefas da semana",
    projeto: "Pessoal",
    prioridade: "Média",
    status: "Pendente"
  },
  {
    id: 3,
    titulo: "Finalizar documentação",
    projeto: "TaskFlow",
    prioridade: "Baixa",
    status: "Concluída"
  },
  {
    id: 4,
    titulo: "Praticar JavaScript",
    projeto: "Estudos",
    prioridade: "Alta",
    status: "Pendente"
  }
];

// Dados das estatísticas
const estatisticas = [
  {
    id: 1,
    titulo: "Total de tarefas",
    valor: 12,
    icone: "▤"
  },
  {
    id: 2,
    titulo: "Pendentes",
    valor: 5,
    icone: "◷"
  },
  {
    id: 3,
    titulo: "Concluídas",
    valor: 6,
    icone: "✓"
  },
  {
    id: 4,
    titulo: "Atrasadas",
    valor: 1,
    icone: "!"
  }
];
</script>

<template>
  <div class="app-container">

    <!-- Menu lateral -->
    <Sidebar />

    <!-- Conteúdo principal -->
    <main class="main-content">

      <!-- Cabeçalho -->
      <Header />

      <!-- Boas-vindas -->
      <section class="welcome">

        <div>
          <h2>Olá, Gabriel! 👋</h2>

          <p>
            Aqui está um resumo das suas atividades.
          </p>
        </div>

        <span class="welcome-date">
          Visão geral
        </span>

      </section>

      <!-- Estatísticas -->
      <section class="stats-grid">

        <StatCard
          v-for="item in estatisticas"
          :key="item.id"
          :titulo="item.titulo"
          :valor="item.valor"
          :icone="item.icone"
        />

      </section>

      <!-- Lista de tarefas -->
      <TaskList :tarefas="tarefas" />

    </main>

  </div>
</template>
