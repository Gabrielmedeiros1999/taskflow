
<script setup>
import TaskItem from './TaskItem.vue';

defineProps({
  tarefas: {
    type: Array,
    required: true
  }
});
</script>

<template>
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

      <TaskItem
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        :tarefa="tarefa"
      />

    </div>

  </section>
</template>
