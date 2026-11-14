
<script setup>
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

const estatisticas = [
  { id: 1, titulo: "Total de tarefas", valor: 12, icone: "▤" },
  { id: 2, titulo: "Pendentes", valor: 5, icone: "◷" },
  { id: 3, titulo: "Concluídas", valor: 6, icone: "✓" },
  { id: 4, titulo: "Atrasadas", valor: 1, icone: "!" }
];
</script>

<template>
  <div class="app-container">

    <!-- Menu lateral -->
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-icon">✓</span>
        <h2>TaskFlow</h2>
      </div>

      <div class="menu-section">
        <span class="menu-label">MENU PRINCIPAL</span>

        <nav class="menu">
          <a href="#" class="menu-item active">
            <span>▦</span>
            Dashboard
          </a>

          <a href="#" class="menu-item">
            <span>☷</span>
            Minhas tarefas
          </a>

          <a href="#" class="menu-item">
            <span>▤</span>
            Projetos
          </a>

          <a href="#" class="menu-item">
            <span>▦</span>
            Calendário
          </a>
        </nav>
      </div>

      <div class="sidebar-footer">
        <div class="avatar">GM</div>
        <div>
          <strong>Gabriel Medeiros</strong>
          <span>Minha conta</span>
        </div>
      </div>
    </aside>

    <!-- Conteúdo principal -->
    <main class="main-content">

      <header class="topbar">
        <div>
          <span class="breadcrumb">Workspace / Dashboard</span>
          <h1>Dashboard</h1>
        </div>

        <div class="topbar-right">
          <span class="date-label">Meu espaço de trabalho</span>
          <div class="avatar">GM</div>
        </div>
      </header>

      <section class="welcome">
        <div>
          <h2>Olá, Gabriel! 👋</h2>
          <p>Aqui está um resumo das suas atividades.</p>
        </div>

        <span class="welcome-date">Visão geral</span>
      </section>

      <!-- Cards de estatísticas -->
      <section class="stats-grid">
        <article
          v-for="item in estatisticas"
          :key="item.id"
          class="stat-card"
        >
          <div class="stat-header">
            <span>{{ item.titulo }}</span>
            <span class="stat-icon">{{ item.icone }}</span>
          </div>

          <strong class="stat-value">{{ item.valor }}</strong>
        </article>
      </section>

      <!-- Lista de tarefas -->
      <section class="tasks-section">

        <div class="section-header">
          <div>
            <h2>Tarefas recentes</h2>
            <p>Acompanhe suas atividades.</p>
          </div>

          <span class="task-count">
            {{ tarefas.length }} tarefas
          </span>
        </div>

        <div class="task-list">

          <article
            v-for="tarefa in tarefas"
            :key="tarefa.id"
            class="task-card"
          >
            <div class="task-info">
              <div class="task-title">
                <span
                  class="status-dot"
                  :class="tarefa.status.toLowerCase().replace(' ', '-')"
                ></span>

                <strong>{{ tarefa.titulo }}</strong>
              </div>

              <span class="task-project">
                {{ tarefa.projeto }}
              </span>
            </div>

            <div class="task-details">
              <span
                class="priority"
                :class="tarefa.prioridade.toLowerCase()"
              >
                {{ tarefa.prioridade }}
              </span>

              <span class="task-status">
                {{ tarefa.status }}
              </span>
            </div>
          </article>

        </div>
      </section>

    </main>
  </div>
</template>
