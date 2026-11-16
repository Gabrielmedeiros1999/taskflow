<script setup>
import { computed, ref  } from 'vue';

const props = defineProps({
  tarefas: {
    type: Array,
    required: true
  }
});

const emit = defineEmits([
  'change-status',
  'delete-task'
]);

const colunas = [
  { titulo: 'Pendente', status: 'Pendente' },
  { titulo: 'Em andamento', status: 'Em andamento' },
  { titulo: 'Concluída', status: 'Concluída' }
];

const tarefasPorStatus = computed(() => {
  return {
    Pendente: props.tarefas.filter(
      tarefa => tarefa.status === 'Pendente'
    ),

    'Em andamento': props.tarefas.filter(
      tarefa => tarefa.status === 'Em andamento'
    ),

    'Concluída': props.tarefas.filter(
      tarefa => tarefa.status === 'Concluída'
    )
  };
});

const tarefaArrastadaId = ref(null);

function iniciarArraste(id) {
  tarefaArrastadaId.value = id;
}

function soltarTarefa(novoStatus) {
  if (tarefaArrastadaId.value === null) {
    return;
  }

  emit('change-status', tarefaArrastadaId.value, novoStatus);

  tarefaArrastadaId.value = null;
}

function finalizarArraste() {
  tarefaArrastadaId.value = null;
}
</script>

<template>
  <section class="kanban-section">
    <div class="kanban-header">
      <div>
        <h2>Quadro de tarefas</h2>
        <p>Organize suas atividades por etapa.</p>
      </div>
    </div>

    <div class="kanban-board">
     <div
        v-for="coluna in colunas"
        :key="coluna.status"
        class="kanban-column"
        @dragover.prevent
        @drop="soltarTarefa(coluna.status)"
        >
        <div class="kanban-column-header">
          <h3>{{ coluna.titulo }}</h3>

          <span class="kanban-count">
            {{ tarefasPorStatus[coluna.status].length }}
          </span>
        </div>

        <div class="kanban-cards">
          <article
                v-for="tarefa in tarefasPorStatus[coluna.status]"
                :key="tarefa.id"
                class="kanban-card"
                draggable="true"
                @dragstart="iniciarArraste(tarefa.id)"
                @dragend="finalizarArraste"
                >
            <div class="kanban-card-top">
              <span
                class="priority"
                :class="tarefa.prioridade.toLowerCase()"
              >
                {{ tarefa.prioridade }}
              </span>

              <button
                class="kanban-delete"
                @click="emit('delete-task', tarefa.id)"
              >
                Excluir
              </button>
            </div>

            <h4>{{ tarefa.titulo }}</h4>

            <p class="kanban-project">
              {{ tarefa.projeto }}
            </p>

            <div class="kanban-card-actions">
              <button
                v-if="tarefa.status === 'Em andamento'"
                class="kanban-move-button secondary"
                @click="emit('change-status', tarefa.id, 'Pendente')"
              >
                Voltar
              </button>

              <button
                v-if="tarefa.status === 'Concluída'"
                class="kanban-move-button secondary"
                @click="emit('change-status', tarefa.id, 'Em andamento')"
              >
                Reabrir
              </button>

              <button
                v-if="tarefa.status === 'Pendente'"
                class="kanban-move-button"
                @click="emit('change-status', tarefa.id, 'Em andamento')"
              >
                Iniciar
              </button>

              <button
                v-if="tarefa.status === 'Em andamento'"
                class="kanban-move-button"
                @click="emit('change-status', tarefa.id, 'Concluída')"
              >
                Concluir
              </button>
            </div>
          </article>

          <p
            v-if="tarefasPorStatus[coluna.status].length === 0"
            class="kanban-empty"
          >
            Nenhuma tarefa nesta coluna.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>