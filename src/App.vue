
<script setup>
import { ref, computed } from 'vue';

import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import StatCard from './components/StatCard.vue';
import TaskList from './components/TaskList.vue';
import TaskFilters from './components/TaskFilters.vue';

// Lista reativa de tarefas
const tarefas = ref([
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
]);

// Dados do formulário
const novoTitulo = ref('');
const novoProjeto = ref('');
const novaPrioridade = ref('Média');

//filtros
const busca = ref('');
const filtroStatus = ref('Todos');
const filtroPrioridade = ref('Todas');
const ordenacao = ref('padrao');

// Cadastrar tarefa
function adicionarTarefa() {

  if (!novoTitulo.value.trim()) {
    return;
  }

  const novaTarefa = {
    id: Date.now(),
    titulo: novoTitulo.value.trim(),
    projeto: novoProjeto.value.trim() || 'Geral',
    prioridade: novaPrioridade.value,
    status: 'Pendente'
  };

  tarefas.value.unshift(novaTarefa);

  // Limpar formulário
  novoTitulo.value = '';
  novoProjeto.value = '';
  novaPrioridade.value = 'Média';
}

// Excluir tarefa
function excluirTarefa(id) {
  tarefas.value = tarefas.value.filter(
    tarefa => tarefa.id !== id
  );
}

// Alternar status da tarefa
function alternarStatus(id) {

  const tarefa = tarefas.value.find(
    tarefa => tarefa.id === id
  );

  if (!tarefa) {
    return;
  }

  if (tarefa.status === 'Concluída') {
    tarefa.status = 'Pendente';
  } else {
    tarefa.status = 'Concluída';
  }
}

const tarefasFiltradas = computed(() => {
  let resultado = tarefas.value;

  // Pesquisa pelo título
  if (busca.value.trim() !== '') {
    resultado = resultado.filter(tarefa =>
      tarefa.titulo
        .toLowerCase()
        .includes(busca.value.toLowerCase().trim())
    );
  }

  // Filtro por status
  if (filtroStatus.value !== 'Todos') {
    resultado = resultado.filter(tarefa =>
      tarefa.status === filtroStatus.value
    );
  }

  // Filtro por prioridade
  if (filtroPrioridade.value !== 'Todas') {
    resultado = resultado.filter(tarefa =>
      tarefa.prioridade === filtroPrioridade.value
    );
  }

  // Ordenação por prioridade
  if (ordenacao.value === 'prioridade') {
    const pesoPrioridade = {
      Alta: 3,
      Média: 2,
      Baixa: 1
    };

    resultado = [...resultado].sort((a, b) =>
      pesoPrioridade[b.prioridade] - pesoPrioridade[a.prioridade]
    );
  }

  return resultado;
});

// Estatísticas calculadas automaticamente
const estatisticas = computed(() => {

  return [
    {
      id: 1,
      titulo: 'Total de tarefas',
      valor: tarefas.value.length,
      icone: '▤'
    },
    {
      id: 2,
      titulo: 'Pendentes',
      valor: tarefas.value.filter(
        tarefa => tarefa.status === 'Pendente'
      ).length,
      icone: '◷'
    },
    {
      id: 3,
      titulo: 'Concluídas',
      valor: tarefas.value.filter(
        tarefa => tarefa.status === 'Concluída'
      ).length,
      icone: '✓'
    },
    {
      id: 4,
      titulo: 'Em andamento',
      valor: tarefas.value.filter(
        tarefa => tarefa.status === 'Em andamento'
      ).length,
      icone: '!'
    }
  ];

});
</script>

<template>
  <div class="app-container">

    <Sidebar />

    <main class="main-content">

      <Header />

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

      <!-- Formulário de cadastro -->
      <section class="form-section">

        <div class="section-header">
          <div>
            <h2>Nova tarefa</h2>
            <p>Adicione uma atividade ao seu planejamento.</p>
          </div>
        </div>

        <form
          class="task-form"
          @submit.prevent="adicionarTarefa"
        >

          <div class="form-field">
            <label for="titulo">Nome da tarefa</label>

            <input
              id="titulo"
              v-model="novoTitulo"
              type="text"
              placeholder="Ex: Estudar JavaScript"
              required
            />
          </div>

          <div class="form-field">
            <label for="projeto">Projeto</label>

            <input
              id="projeto"
              v-model="novoProjeto"
              type="text"
              placeholder="Ex: Estudos"
            />
          </div>

          <div class="form-field">
            <label for="prioridade">Prioridade</label>

            <select
              id="prioridade"
              v-model="novaPrioridade"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <button type="submit" class="add-button">
            + Adicionar tarefa
          </button>

        </form>

      </section>

      <!-- Filtro de tarefas -->
      <TaskFilters
        v-model:busca="busca"
        v-model:status="filtroStatus"
        v-model:prioridade="filtroPrioridade"
        v-model:ordenacao="ordenacao"
      />

      <!-- Lista de tarefas -->
      <TaskList
        :tarefas="tarefasFiltradas"
        @delete-task="excluirTarefa"
        @toggle-task="alternarStatus"
      />

    </main>

  </div>
</template>
