
<script setup>
import { ref, watch } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { useToast } from '../composables/useToast';

const taskStore = useTaskStore();
const { mostrarToast } = useToast();

function confirmarLimpeza() {
  const confirmado = confirm(
    'Tem certeza que deseja excluir todas as tarefas? Essa ação não pode ser desfeita.'
  );

  if (confirmado) {
    taskStore.limparTarefas();
    mostrarToast('Todas as tarefas foram excluídas!');
  }
}

const ordenacaoPadrao = ref(
  localStorage.getItem('taskflow-ordenacao') || 'padrao'
);

watch(ordenacaoPadrao, (novaOrdenacao) => {
  localStorage.setItem('taskflow-ordenacao', novaOrdenacao);
});
</script>

<template>
  <section class="settings-page">
    <div class="settings-header">
      <h1>Configurações</h1>
      <p>Personalize sua experiência no TaskFlow.</p>
    </div>

    <div class="settings-card">
      <h2>Preferências</h2>

      <div class="settings-option">
        <label for="ordenacao-padrao">
          Ordenação padrão das tarefas
        </label>

        <select
          id="ordenacao-padrao"
          v-model="ordenacaoPadrao"
        >
          <option value="padrao">Ordem padrão</option>
          <option value="prioridade">Maior prioridade</option>
        </select>

        <p>
          Escolha como as tarefas serão organizadas
          ao abrir a página Minhas tarefas.
        </p>
      </div>
    </div>
    <div class="settings-card settings-danger">
        <h2>Zona de perigo</h2>

        <p>
            Exclua todas as tarefas cadastradas no TaskFlow.
            Essa ação não pode ser desfeita.
        </p>

        <button
            type="button"
            class="settings-danger-button"
            @click="confirmarLimpeza"
        >
            Limpar todas as tarefas
        </button>
    </div>
  </section>
</template>

<style scoped>
.settings-page {
  padding: 24px;
  color: #f1f0f5;
}

.settings-header {
  margin-bottom: 24px;
}

.settings-header h1 {
  margin-bottom: 8px;
  font-size: 28px;
}

.settings-header p {
  color: #a5a1b5;
}

.settings-card {
  padding: 24px;
  border: 1px solid #302b40;
  border-radius: 12px;
  background: #191622;
}

.settings-card h2 {
  margin-bottom: 20px;
  font-size: 20px;
}

.settings-option {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.settings-option label {
  color: #c5c3ce;
  font-size: 14px;
}

.settings-option select {
  padding: 11px 12px;
  border: 1px solid #383542;
  border-radius: 8px;
  background: #211f28;
  color: #f0eef5;
}

.settings-option p {
  color: #9999a5;
  font-size: 13px;
}

.settings-danger {
  margin-top: 20px;
  border-color: #48262b;
}

.settings-danger p {
  margin-bottom: 16px;
  color: #a5a1b5;
  font-size: 14px;
}

.settings-danger-button {
  padding: 10px 16px;
  border: 1px solid #7f2935;
  border-radius: 8px;
  background: #48262b;
  color: #ffabb3;
  cursor: pointer;
}

.settings-danger-button:hover {
  background: #5a2c33;
}
</style>
