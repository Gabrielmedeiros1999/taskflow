
<script setup>
import TaskItem from './TaskItem.vue';

defineProps({
  tarefas: {
    type: Array,
    required: true
  }
});

const emit = defineEmits([
  'delete-task',
  'toggle-task'
]);
</script>

<template>
  <section class="tasks-section">

    <div class="section-header">

      <div>
        <h2>Minhas atividades</h2>
        <p>Acompanhe suas atividades.</p>
      </div>

      <span class="task-count">
        {{ tarefas.length }} tarefas
      </span>

    </div>

    <div class="task-list">

      <TaskItem
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @delete-task="emit('delete-task', $event)"
        @toggle-task="emit('toggle-task', $event)"
      />

      <p v-if="tarefas.length === 0" class="empty-message">
        Nenhuma tarefa encontrada com esses filtros.
      </p>

    </div>

  </section>
</template>
