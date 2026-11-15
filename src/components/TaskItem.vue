
<script setup>
defineProps({
  tarefa: {
    type: Object,
    required: true
  }
});

// Eventos enviados ao componente pai
const emit = defineEmits([
  'toggle-task',
  'delete-task'
]);
</script>

<template>
  <article class="task-card">

    <div class="task-info">

      <div class="task-title">

        <span
          class="status-dot"
          :class="tarefa.status.toLowerCase().replace(' ', '-')"
        ></span>

        <strong
          :class="{ 'completed-title': tarefa.status === 'Concluída' }"
        >
          {{ tarefa.titulo }}
        </strong>

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

      <button
        class="action-button complete-button"
        @click="emit('toggle-task', tarefa.id)"
      >
        {{ tarefa.status === 'Concluída' ? 'Reabrir' : 'Concluir' }}
      </button>

      <button
        class="action-button delete-button"
        @click="emit('delete-task', tarefa.id)"
      >
        Excluir
      </button>

    </div>

  </article>
</template>
