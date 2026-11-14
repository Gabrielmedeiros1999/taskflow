
<script setup>
defineProps({
  titulo: {
    type: String,
    required: true
  },

  valor: {
    type: Number,
    required: true
  },

  icone: {
    type: String,
    required: true
  }
});
</script>

<template>
  <article class="stat-card">

    <div class="stat-header">
      <span>{{ titulo }}</span>

      <span class="stat-icon">
        {{ icone }}
      </span>
    </div>

    <strong class="stat-value">
      {{ valor }}
    </strong>

  </article>
</template>
