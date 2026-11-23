<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { useToast } from '../composables/useToast';

const taskStore = useTaskStore();
const { mostrarToast } = useToast();

const busca = ref('');
const filtroStatus = ref('Todos');
const filtroPrioridade = ref('Todas');
const ordenacao = ref('padrao');

const data = ref('');
const titulo = ref('');
const projeto = ref('');
const prioridade = ref('Média');

const tarefaEditando = ref(null);

const tarefasFiltradas = computed(() => {
  let resultado = taskStore.tarefas;

  if (busca.value.trim()) {
    resultado = resultado.filter(tarefa =>
      tarefa.titulo.toLowerCase().includes(
        busca.value.trim().toLowerCase()
      )
    );
  }

  if (filtroStatus.value !== 'Todos') {
    resultado = resultado.filter(
      tarefa => tarefa.status === filtroStatus.value
    );
  }

  if (filtroPrioridade.value !== 'Todas') {
    resultado = resultado.filter(
      tarefa => tarefa.prioridade === filtroPrioridade.value
    );
  }

  if (ordenacao.value === 'prioridade') {
    const peso = {
      Alta: 3,
      Média: 2,
      Baixa: 1
    };

    resultado = [...resultado].sort(
      (a, b) => peso[b.prioridade] - peso[a.prioridade]
    );
  }

  return resultado;
});

function salvarTarefa() {
  if (!titulo.value.trim()) {
    mostrarToast('Informe o nome da tarefa.', 'erro');
    return;
  }

  if (tarefaEditando.value !== null) {
    taskStore.editarTarefa(
      tarefaEditando.value,
      titulo.value,
      projeto.value,
      prioridade.value,
      data.value
    );

    mostrarToast('Tarefa atualizada com sucesso!');
  } else {
    taskStore.adicionarTarefa(
      titulo.value,
      projeto.value,
      prioridade.value,
      data.value
    );

    mostrarToast('Tarefa criada com sucesso!');
  }

  limparFormulario();
}


function prepararEdicao(tarefa) {
  tarefaEditando.value = tarefa.id;
  titulo.value = tarefa.titulo;
  projeto.value = tarefa.projeto;
  prioridade.value = tarefa.prioridade;
  data.value = tarefa.data || '';

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function cancelarEdicao() {
  limparFormulario();
}

function limparFormulario() {
  titulo.value = '';
  projeto.value = '';
  prioridade.value = 'Média';
  tarefaEditando.value = null;
  data.value = '';
}

function excluirTarefa(id) {
  if (confirm('Deseja realmente excluir esta tarefa?')) {
    taskStore.excluirTarefa(id);

    mostrarToast('Tarefa excluída com sucesso!');
  }
}

function alterarStatus(id, novoStatus) {
  taskStore.alterarStatus(id, novoStatus);

  if (novoStatus === 'Concluída') {
    mostrarToast('Tarefa concluída com sucesso!');
  } else if (novoStatus === 'Em andamento') {
    mostrarToast('Tarefa movida para Em andamento!');
  } else {
    mostrarToast('Tarefa reaberta com sucesso!');
  }
}

function limparFiltros() {
  busca.value = '';
  filtroStatus.value = 'Todos';
  filtroPrioridade.value = 'Todas';
  ordenacao.value = 'padrao';
}
</script>

<template>
  <div class="tasks-page">

    <section class="tasks-heading">
      <div>
        <h2>Minhas tarefas</h2>
        <p>Gerencie e acompanhe todas as suas atividades.</p>
      </div>

      <span class="tasks-total">
        {{ taskStore.tarefas.length }} tarefas
      </span>
    </section>

    <section class="task-create-card">
      <div class="tasks-section-title">
        <h3>
          {{ tarefaEditando !== null ? 'Editar tarefa' : 'Nova tarefa' }}
        </h3>
        <p>
          {{
            tarefaEditando !== null
              ? 'Atualize as informações da atividade.'
              : 'Adicione uma nova atividade ao seu planejamento.'
          }}
        </p>
      </div>

      <form class="tasks-form" @submit.prevent="salvarTarefa">
        <div class="tasks-field">
          <label for="task-title">Nome da tarefa</label>
          <input
            id="task-title"
            v-model="titulo"
            type="text"
            placeholder="Ex: Estudar JavaScript"
            required
          />
        </div>

        <div class="tasks-field">
          <label for="task-project">Projeto</label>
          <input
            id="task-project"
            v-model="projeto"
            type="text"
            placeholder="Ex: Estudos"
          />
        </div>

        <div class="tasks-field">
          <label for="task-priority">Prioridade</label>
          <select id="task-priority" v-model="prioridade">
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div class="tasks-field">
          <label for="task-date">Data de vencimento</label>
          <input
            id="task-date"
            v-model="data"
            type="date"
          />
        </div>

        <div class="tasks-form-actions">
          <button type="submit" class="tasks-primary-button">
            {{ tarefaEditando !== null ? 'Salvar alterações' : '+ Adicionar tarefa' }}
          </button>

          <button
            v-if="tarefaEditando !== null"
            type="button"
            class="tasks-cancel-button"
            @click="cancelarEdicao"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>

    <section class="tasks-list-section">

      <div class="tasks-section-title">
        <h3>Lista de tarefas</h3>
        <p>Pesquise, filtre e organize suas atividades.</p>
      </div>

      <div class="tasks-filters">
        <input
          v-model="busca"
          type="search"
          placeholder="Pesquisar tarefa..."
          aria-label="Pesquisar tarefa"
        />

        <select v-model="filtroStatus" aria-label="Filtrar por status">
          <option value="Todos">Todos os status</option>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>

        <select v-model="filtroPrioridade" aria-label="Filtrar por prioridade">
          <option value="Todas">Todas as prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>

        <select v-model="ordenacao" aria-label="Ordenar tarefas">
          <option value="padrao">Ordem padrão</option>
          <option value="prioridade">Maior prioridade</option>
        </select>
      </div>

      <div v-if="tarefasFiltradas.length > 0" class="tasks-list">

        <article
          v-for="tarefa in tarefasFiltradas"
          :key="tarefa.id"
          class="task-card"
        >
          <div class="task-card-info">
            <h4>{{ tarefa.titulo }}</h4>

            <span class="task-project">
              {{ tarefa.projeto }}
            </span>
          </div>

          <div class="task-card-details">

            <span
              class="task-priority"
              :class="`priority-${tarefa.prioridade.toLowerCase()}`"
            >
              {{ tarefa.prioridade }}
            </span>

            <select
              :value="tarefa.status"
              aria-label="Status da tarefa"
              @change="alterarStatus(tarefa.id, $event.target.value)"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>

            <button
              type="button"
              class="task-edit-button"
              @click="prepararEdicao(tarefa)"
            >
              Editar
            </button>

            <button
              type="button"
              class="task-delete-button"
              @click="excluirTarefa(tarefa.id)"
            >
              Excluir
            </button>

          </div>
        </article>

      </div>

      <div v-else class="tasks-empty">
        <template v-if="taskStore.tarefas.length === 0">
          <h3>Você ainda não possui tarefas</h3>
          <p>
            Comece organizando sua rotina. Cadastre sua primeira tarefa
            usando o formulário acima.
          </p>
        </template>

        <template v-else>
          <h3>Nenhuma tarefa encontrada</h3>
          <p>
            Não encontramos tarefas com os filtros selecionados.
            Experimente modificar sua pesquisa.
          </p>
          <button
            v-if="taskStore.tarefas.length > 0"
            type="button"
            class="tasks-clear-filters"
            @click="limparFiltros"
          >
            Limpar filtros
          </button>
        </template>
      </div>

    </section>
  </div>
</template>

<style scoped>
.tasks-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tasks-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.tasks-heading h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.tasks-heading p,
.tasks-section-title p {
  margin: 0;
  color: #9999a5;
  font-size: 14px;
}

.tasks-total {
  padding: 9px 14px;
  border-radius: 10px;
  background: #29233e;
  color: #c5aaff;
  font-size: 13px;
}

.task-create-card,
.tasks-list-section {
  padding: 24px;
  border: 1px solid #302e3a;
  border-radius: 14px;
  background: #19181f;
}

.tasks-section-title {
  margin-bottom: 20px;
}

.tasks-section-title h3 {
  margin: 0 0 7px;
  font-size: 18px;
}

.tasks-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.tasks-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tasks-field label {
  font-size: 13px;
  color: #c5c3ce;
}

.tasks-field input,
.tasks-field select,
.tasks-filters input,
.tasks-filters select,
.task-card-details select {
  width: 100%;
  min-width: 0;
  padding: 11px 12px;
  border: 1px solid #383542;
  border-radius: 8px;
  background: #211f28;
  color: #f0eef5;
  outline: none;
}

.tasks-field input:focus,
.tasks-field select:focus,
.tasks-filters input:focus,
.tasks-filters select:focus {
  border-color: #9270dc;
}

.tasks-form-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 10px;
}

.tasks-primary-button,
.tasks-cancel-button,
.task-edit-button,
.task-delete-button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.tasks-primary-button {
  background: #7553c8;
  color: white;
}

.tasks-cancel-button {
  background: #34313d;
  color: #eee;
}

.tasks-filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border: 1px solid #302e3a;
  border-radius: 10px;
  background: #211f28;
}

.task-card-info h4 {
  margin: 0 0 7px;
  font-size: 14px;
}

.task-project {
  color: #9999a5;
  font-size: 12px;
}

.task-card-details {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-card-details select {
  width: auto;
}

.task-priority {
  padding: 6px 9px;
  border-radius: 6px;
  font-size: 12px;
}

.priority-alta {
  background: #49252e;
  color: #ff9aa8;
}

.priority-média {
  background: #493b22;
  color: #f5cb79;
}

.priority-baixa {
  background: #243d32;
  color: #91d9ad;
}

.task-edit-button {
  background: #39304f;
  color: #d1baff;
}

.task-delete-button {
  background: #48262b;
  color: #ffabb3;
}

.tasks-empty {
  padding: 35px 15px;
  text-align: center;
  color: #9999a5;
}

.tasks-empty h3 {
  color: #eee;
  font-size: 16px;
}

@media (max-width: 900px) {
  .tasks-form {
    grid-template-columns: 1fr 1fr;
  }

  .tasks-filters {
    grid-template-columns: 1fr 1fr;
  }

  .task-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .task-card-details {
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .tasks-form,
  .tasks-filters {
    grid-template-columns: 1fr;
  }

  .task-create-card,
  .tasks-list-section {
    padding: 16px;
  }

  .tasks-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .task-card-details {
    width: 100%;
  }
}

.tasks-clear-filters {
  margin-top: 12px;
  padding: 10px 16px;
  border: 1px solid #7553c8;
  border-radius: 8px;
  background: transparent;
  color: #c5aaff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.tasks-clear-filters:hover {
  background: #29233e;
}
</style>