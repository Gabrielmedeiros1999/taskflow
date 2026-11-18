
<script setup>
import { computed } from 'vue';

const props = defineProps({
  tarefas: {
    type: Array,
    required: true
  }
});

// Total de tarefas
const totalTarefas = computed(() => {
  return props.tarefas.length;
});

// Tarefas concluídas
const tarefasConcluidas = computed(() => {
  return props.tarefas.filter(
    tarefa => tarefa.status === 'Concluída'
  ).length;
});

// Percentual de conclusão
const percentualConclusao = computed(() => {
  if (totalTarefas.value === 0) {
    return 0;
  }

  return Math.round(
    (tarefasConcluidas.value / totalTarefas.value) * 100
  );
});

// Quantidade por status
const tarefasPorStatus = computed(() => {
  return [
    {
      nome: 'Pendente',
      quantidade: props.tarefas.filter(
        tarefa => tarefa.status === 'Pendente'
      ).length,
      cor: '#e5a54b'
    },
    {
      nome: 'Em andamento',
      quantidade: props.tarefas.filter(
        tarefa => tarefa.status === 'Em andamento'
      ).length,
      cor: '#7658ed'
    },
    {
      nome: 'Concluída',
      quantidade: props.tarefas.filter(
        tarefa => tarefa.status === 'Concluída'
      ).length,
      cor: '#42b883'
    }
  ];
});

// Quantidade por prioridade
const tarefasPorPrioridade = computed(() => {
  return [
    {
      nome: 'Alta',
      quantidade: props.tarefas.filter(
        tarefa => tarefa.prioridade === 'Alta'
      ).length,
      cor: '#e56b6f'
    },
    {
      nome: 'Média',
      quantidade: props.tarefas.filter(
        tarefa => tarefa.prioridade === 'Média'
      ).length,
      cor: '#e5a54b'
    },
    {
      nome: 'Baixa',
      quantidade: props.tarefas.filter(
        tarefa => tarefa.prioridade === 'Baixa'
      ).length,
      cor: '#42b883'
    }
  ];
});
</script>

<template>
  <section class="dashboard-section">

    <div class="dashboard-header">
      <div>
        <h2>Dashboard</h2>
        <p>Acompanhe seu progresso e suas atividades.</p>
      </div>
    </div>

    <!-- Indicadores -->
    <div class="dashboard-stats">

      <article class="dashboard-card">
        <span>Total de tarefas</span>
        <strong>{{ totalTarefas }}</strong>
        <small>Tarefas cadastradas</small>
      </article>

      <article class="dashboard-card">
        <span>Tarefas concluídas</span>
        <strong>{{ tarefasConcluidas }}</strong>
        <small>Atividades finalizadas</small>
      </article>

      <article class="dashboard-card">
        <span>Progresso geral</span>
        <strong>{{ percentualConclusao }}%</strong>
        <small>Percentual de conclusão</small>
      </article>

    </div>

    <!-- Barra de progresso -->
    <article class="dashboard-panel">
      <div class="panel-header">
        <h3>Progresso das atividades</h3>
        <strong>{{ percentualConclusao }}%</strong>
      </div>

      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: percentualConclusao + '%' }"
        ></div>
      </div>

      <p>
        {{ tarefasConcluidas }} de {{ totalTarefas }}
        tarefas concluídas.
      </p>
    </article>

    <!-- Gráficos -->
    <div class="dashboard-charts">

      <article class="dashboard-panel">
        <h3>Tarefas por status</h3>

        <div class="chart-list">
          <div
            v-for="item in tarefasPorStatus"
            :key="item.nome"
            class="chart-item"
          >
            <div class="chart-label">
              <span>
                <i :style="{ background: item.cor }"></i>
                {{ item.nome }}
              </span>

              <strong>{{ item.quantidade }}</strong>
            </div>

            <div class="chart-track">
              <div
                class="chart-bar"
                :style="{
                  width: totalTarefas
                    ? (item.quantidade / totalTarefas) * 100 + '%'
                    : '0%',
                  background: item.cor
                }"
              ></div>
            </div>
          </div>
        </div>
      </article>

      <article class="dashboard-panel">
        <h3>Tarefas por prioridade</h3>

        <div class="chart-list">
          <div
            v-for="item in tarefasPorPrioridade"
            :key="item.nome"
            class="chart-item"
          >
            <div class="chart-label">
              <span>
                <i :style="{ background: item.cor }"></i>
                {{ item.nome }}
              </span>

              <strong>{{ item.quantidade }}</strong>
            </div>

            <div class="chart-track">
              <div
                class="chart-bar"
                :style="{
                  width: totalTarefas
                    ? (item.quantidade / totalTarefas) * 100 + '%'
                    : '0%',
                  background: item.cor
                }"
              ></div>
            </div>
          </div>
        </div>
      </article>

    </div>

    <div
      v-if="totalTarefas === 0"
      class="dashboard-empty"
    >
      Você ainda não possui tarefas cadastradas.
      Adicione uma tarefa para visualizar seu Dashboard.
    </div>

  </section>
</template>
