<script setup>
defineProps({
  busca: String,
  status: String,
  prioridade: String,
  ordenacao: String
});

defineEmits([
  'update:busca',
  'update:status',
  'update:prioridade',
  'update:ordenacao'
]);
</script>

<template>
  <section class="filters-section">
    <div class="filter-field search-field">
      <label for="busca">Pesquisar tarefa</label>
      <input
        id="busca"
        type="text"
        placeholder="Digite o nome da tarefa..."
        :value="busca"
        @input="$emit('update:busca', $event.target.value)"
      />
    </div>

    <div class="filter-field">
      <label for="filtro-status">Status</label>
      <select
        id="filtro-status"
        :value="status"
        @change="$emit('update:status', $event.target.value)"
      >
        <option value="Todos">Todos</option>
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluída">Concluída</option>
      </select>
    </div>

    <div class="filter-field">
      <label for="filtro-prioridade">Prioridade</label>
      <select
        id="filtro-prioridade"
        :value="prioridade"
        @change="$emit('update:prioridade', $event.target.value)"
      >
        <option value="Todas">Todas</option>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select>
    </div>

    <div class="filter-field">
      <label for="ordenacao">Ordenar por</label>
      <select
        id="ordenacao"
        :value="ordenacao"
        @change="$emit('update:ordenacao', $event.target.value)"
      >
        <option value="padrao">Ordem padrão</option>
        <option value="prioridade">Maior prioridade</option>
      </select>
    </div>
  </section>
</template>