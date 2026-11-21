
<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();

const busca = ref('');
const filtroStatus = ref('Todos');

const projetos = computed(() => {
  const agrupados = {};

  taskStore.tarefas.forEach(tarefa => {
    const nomeProjeto = tarefa.projeto || 'Geral';

    if (!agrupados[nomeProjeto]) {
      agrupados[nomeProjeto] = {
        nome: nomeProjeto,
        tarefas: [],
        total: 0,
        concluidas: 0,
        pendentes: 0,
        andamento: 0
      };
    }

    const projeto = agrupados[nomeProjeto];

    projeto.tarefas.push(tarefa);
    projeto.total++;

    if (tarefa.status === 'Concluída') {
      projeto.concluidas++;
    } else if (tarefa.status === 'Pendente') {
      projeto.pendentes++;
    } else if (tarefa.status === 'Em andamento') {
      projeto.andamento++;
    }
  });

  return Object.values(agrupados).map(projeto => ({
    ...projeto,
    progresso: projeto.total > 0
      ? Math.round((projeto.concluidas / projeto.total) * 100)
      : 0
  }));
});

const projetosFiltrados = computed(() => {
  return projetos.value.filter(projeto => {
    const correspondeBusca = projeto.nome
      .toLowerCase()
      .includes(busca.value.trim().toLowerCase());

    let correspondeStatus = true;

    if (filtroStatus.value === 'Concluído') {
      correspondeStatus = projeto.progresso === 100;
    } else if (filtroStatus.value === 'Em andamento') {
      correspondeStatus = projeto.progresso > 0 &&
        projeto.progresso < 100;
    } else if (filtroStatus.value === 'Não iniciado') {
      correspondeStatus = projeto.progresso === 0;
    }

    return correspondeBusca && correspondeStatus;
  });
});

const totalTarefas = computed(() => taskStore.tarefas.length);

const totalConcluidas = computed(() =>
  taskStore.tarefas.filter(
    tarefa => tarefa.status === 'Concluída'
  ).length
);
</script>

<template>
  <div class="projects-page">

    <section class="projects-heading">
      <div>
        <h2>Projetos</h2>
        <p>Acompanhe suas atividades e o progresso de cada projeto.</p>
      </div>

      <span class="projects-total">
        {{ projetos.length }} projetos
      </span>
    </section>

    <section class="projects-stats">

      <article class="project-stat-card">
        <span>Total de projetos</span>
        <strong>{{ projetos.length }}</strong>
      </article>

      <article class="project-stat-card">
        <span>Total de tarefas</span>
        <strong>{{ totalTarefas }}</strong>
      </article>

      <article class="project-stat-card">
        <span>Tarefas concluídas</span>
        <strong>{{ totalConcluidas }}</strong>
      </article>

    </section>

    <section class="projects-content">

      <div class="projects-section-title">
        <div>
          <h3>Meus projetos</h3>
          <p>Projetos identificados pelas tarefas cadastradas.</p>
        </div>
      </div>

      <div class="projects-filters">

        <input
          v-model="busca"
          type="search"
          placeholder="Pesquisar projeto..."
          aria-label="Pesquisar projeto"
        />

        <select
          v-model="filtroStatus"
          aria-label="Filtrar projetos por progresso"
        >
          <option value="Todos">Todos os projetos</option>
          <option value="Não iniciado">Não iniciados</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluídos</option>
        </select>

      </div>

      <div
        v-if="projetosFiltrados.length > 0"
        class="projects-grid"
      >

        <article
          v-for="projeto in projetosFiltrados"
          :key="projeto.nome"
          class="project-card"
        >

          <div class="project-card-header">
            <div class="project-icon">▤</div>

            <span class="project-task-count">
              {{ projeto.total }}
              {{ projeto.total === 1 ? 'tarefa' : 'tarefas' }}
            </span>
          </div>

          <h4>{{ projeto.nome }}</h4>

          <div class="project-progress-info">
            <span>Progresso</span>
            <strong>{{ projeto.progresso }}%</strong>
          </div>

          <div
            class="project-progress-bar"
            role="progressbar"
            :aria-valuenow="projeto.progresso"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`Progresso de ${projeto.nome}`"
          >
            <div
              class="project-progress-fill"
              :style="{ width: `${projeto.progresso}%` }"
            ></div>
          </div>

          <div class="project-status-summary">
            <span class="project-completed">
              {{ projeto.concluidas }} concluídas
            </span>

            <span class="project-pending">
              {{ projeto.pendentes }} pendentes
            </span>

            <span class="project-progressing">
              {{ projeto.andamento }} em andamento
            </span>
          </div>

        </article>

      </div>

      <div v-else class="projects-empty">
        <h3>Nenhum projeto encontrado</h3>
        <p>
          Cadastre tarefas com o nome de um projeto ou altere sua pesquisa.
        </p>
      </div>

    </section>

  </div>
</template>

<style scoped>
.projects-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.projects-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.projects-heading h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.projects-heading p,
.projects-section-title p {
  margin: 0;
  color: #9999a5;
  font-size: 14px;
}

.projects-total {
  padding: 9px 14px;
  border-radius: 10px;
  background: #29233e;
  color: #c5aaff;
  font-size: 13px;
}

.projects-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.project-stat-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid #302e3a;
  border-radius: 12px;
  background: #19181f;
}

.project-stat-card span {
  color: #9999a5;
  font-size: 13px;
}

.project-stat-card strong {
  font-size: 26px;
  color: #d1baff;
}

.projects-content {
  padding: 24px;
  border: 1px solid #302e3a;
  border-radius: 14px;
  background: #19181f;
}

.projects-section-title {
  margin-bottom: 20px;
}

.projects-section-title h3 {
  margin: 0 0 7px;
  font-size: 18px;
}

.projects-filters {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.projects-filters input,
.projects-filters select {
  width: 100%;
  min-width: 0;
  padding: 11px 12px;
  border: 1px solid #383542;
  border-radius: 8px;
  background: #211f28;
  color: #f0eef5;
  outline: none;
}

.projects-filters input:focus,
.projects-filters select:focus {
  border-color: #9270dc;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.project-card {
  padding: 20px;
  border: 1px solid #35313f;
  border-radius: 12px;
  background: #211f28;
}

.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #39304f;
  color: #d1baff;
}

.project-task-count {
  color: #9999a5;
  font-size: 12px;
}

.project-card h4 {
  margin: 18px 0;
  font-size: 17px;
}

.project-progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 9px;
  color: #aaa7b5;
  font-size: 12px;
}

.project-progress-info strong {
  color: #d1baff;
}

.project-progress-bar {
  height: 8px;
  overflow: hidden;
  border-radius: 20px;
  background: #383542;
}

.project-progress-fill {
  height: 100%;
  border-radius: inherit;
  background: #9270dc;
  transition: width 0.3s ease;
}

.project-status-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 17px;
  font-size: 11px;
}

.project-completed {
  color: #91d9ad;
}

.project-pending {
  color: #f5cb79;
}

.project-progressing {
  color: #b9a3ef;
}

.projects-empty {
  padding: 35px 15px;
  text-align: center;
  color: #9999a5;
}

.projects-empty h3 {
  color: #eee;
  font-size: 16px;
}

@media (max-width: 750px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .projects-stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .projects-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .projects-filters {
    grid-template-columns: 1fr;
  }

  .projects-content {
    padding: 16px;
  }
}
</style>
