
<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();

const dataAtual = ref(new Date());

const mesAtual = computed(() => dataAtual.value.getMonth());
const anoAtual = computed(() => dataAtual.value.getFullYear());

const nomeMes = computed(() => {
  return dataAtual.value.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  });
});

const diasDoMes = computed(() => {
  const primeiroDia = new Date(
    anoAtual.value,
    mesAtual.value,
    1
  ).getDay();

  const quantidadeDias = new Date(
    anoAtual.value,
    mesAtual.value + 1,
    0
  ).getDate();

  const dias = [];

  for (let i = 0; i < primeiroDia; i++) {
    dias.push(null);
  }

  for (let dia = 1; dia <= quantidadeDias; dia++) {
    dias.push(dia);
  }

  return dias;
});

function formatarData(dia) {
  if (!dia) return '';

  const mes = String(mesAtual.value + 1).padStart(2, '0');
  const diaFormatado = String(dia).padStart(2, '0');

  return `${anoAtual.value}-${mes}-${diaFormatado}`;
}

function tarefasDoDia(dia) {
  const data = formatarData(dia);

  return taskStore.tarefas.filter(
    tarefa => tarefa.data === data
  );
}

function mudarMes(direcao) {
  dataAtual.value = new Date(
    anoAtual.value,
    mesAtual.value + direcao,
    1
  );
}

function voltarParaHoje() {
  dataAtual.value = new Date();
}

const totalTarefasDoMes = computed(() => {
  return taskStore.tarefas.filter(tarefa => {
    if (!tarefa.data) return false;

    const [ano, mes] = tarefa.data.split('-').map(Number);

    return ano === anoAtual.value &&
      mes === mesAtual.value + 1;
  }).length;
});
</script>

<template>
  <div class="calendar-page">

    <section class="calendar-heading">
      <div>
        <h2>Calendário</h2>
        <p>Visualize suas tarefas e datas de vencimento.</p>
      </div>

      <span class="calendar-total">
        {{ totalTarefasDoMes }} tarefas neste mês
      </span>
    </section>

    <section class="calendar-container">

      <div class="calendar-toolbar">
        <h3>{{ nomeMes }}</h3>

        <div class="calendar-actions">
          <button type="button" @click="voltarParaHoje">
            Hoje
          </button>

          <button
            type="button"
            aria-label="Mês anterior"
            @click="mudarMes(-1)"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Próximo mês"
            @click="mudarMes(1)"
          >
            ›
          </button>
        </div>
      </div>

      <div class="calendar-grid">

        <div
          v-for="dia in ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']"
          :key="dia"
          class="calendar-weekday"
        >
          {{ dia }}
        </div>

        <div
          v-for="(dia, indice) in diasDoMes"
          :key="indice"
          class="calendar-day"
          :class="{ 'calendar-empty': !dia }"
        >
          <template v-if="dia">
            <span class="calendar-day-number">
              {{ dia }}
            </span>

            <div class="calendar-events">
              <div
                v-for="tarefa in tarefasDoDia(dia)"
                :key="tarefa.id"
                class="calendar-event"
                :class="{
                  'event-completed': tarefa.status === 'Concluída',
                  'event-progress': tarefa.status === 'Em andamento'
                }"
                :title="tarefa.titulo"
              >
                {{ tarefa.titulo }}
              </div>
            </div>
          </template>
        </div>

      </div>

      <p
        v-if="totalTarefasDoMes === 0"
        class="calendar-empty-message"
      >
        Nenhuma tarefa com data de vencimento neste mês.
      </p>

    </section>

  </div>
</template>

<style scoped>
.calendar-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.calendar-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.calendar-heading h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.calendar-heading p {
  margin: 0;
  color: #9999a5;
  font-size: 14px;
}

.calendar-total {
  padding: 9px 14px;
  border-radius: 10px;
  background: #29233e;
  color: #c5aaff;
  font-size: 13px;
}

.calendar-container {
  padding: 24px;
  border: 1px solid #302e3a;
  border-radius: 14px;
  background: #19181f;
}

.calendar-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.calendar-toolbar h3 {
  margin: 0;
  text-transform: capitalize;
}

.calendar-actions {
  display: flex;
  gap: 8px;
}

.calendar-actions button {
  padding: 9px 13px;
  border: 1px solid #383542;
  border-radius: 8px;
  background: #211f28;
  color: #eee;
  cursor: pointer;
}

.calendar-actions button:hover {
  border-color: #9270dc;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border-top: 1px solid #35313f;
  border-left: 1px solid #35313f;
}

.calendar-weekday {
  padding: 12px 5px;
  text-align: center;
  color: #aaa7b5;
  font-size: 12px;
  border-right: 1px solid #35313f;
  border-bottom: 1px solid #35313f;
}

.calendar-day {
  min-width: 0;
  min-height: 115px;
  padding: 9px;
  border-right: 1px solid #35313f;
  border-bottom: 1px solid #35313f;
}

.calendar-empty {
  background: #17161c;
}

.calendar-day-number {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
}

.calendar-events {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.calendar-event {
  padding: 5px 6px;
  overflow: hidden;
  border-radius: 5px;
  background: #493b65;
  color: #e2d5ff;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-completed {
  background: #244a37;
  color: #a2e6b9;
}

.event-progress {
  background: #493b22;
  color: #f5cb79;
}

.calendar-empty-message {
  margin-top: 18px;
  color: #9999a5;
  font-size: 13px;
  text-align: center;
}

@media (max-width: 650px) {
  .calendar-container {
    padding: 10px;
    overflow-x: auto;
  }

  .calendar-grid {
    min-width: 520px;
  }

  .calendar-day {
    min-height: 90px;
    padding: 6px;
  }

  .calendar-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .calendar-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
