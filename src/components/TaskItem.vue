
<script setup>
defineProps({
  tarefa: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <article class="task-card">

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
</template>
