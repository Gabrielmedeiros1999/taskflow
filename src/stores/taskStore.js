import { defineStore } from 'pinia';

// Tarefas iniciais para quando o usuário abrir o projeto pela primeira vez
const tarefasIniciais = [
  {
    id: 1,
    titulo: 'Estudar fundamentos do Vue.js',
    projeto: 'Estudos',
    prioridade: 'Alta',
    status: 'Em andamento'
  },
  {
    id: 2,
    titulo: 'Organizar tarefas da semana',
    projeto: 'Pessoal',
    prioridade: 'Média',
    status: 'Pendente'
  },
  {
    id: 3,
    titulo: 'Finalizar documentação',
    projeto: 'TaskFlow',
    prioridade: 'Baixa',
    status: 'Concluída'
  },
  {
    id: 4,
    titulo: 'Praticar JavaScript',
    projeto: 'Estudos',
    prioridade: 'Alta',
    status: 'Pendente'
  }
];

// Recupera as tarefas salvas no navegador
function carregarTarefas() {
  try {
    const dadosSalvos = localStorage.getItem('taskflow-tarefas');

    if (dadosSalvos !== null) {
      const tarefas = JSON.parse(dadosSalvos);

      if (Array.isArray(tarefas)) {
        return tarefas;
      }
    }
  } catch (erro) {
    console.error('Erro ao carregar tarefas:', erro);
  }

  return tarefasIniciais.map(tarefa => ({ ...tarefa }));
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tarefas: carregarTarefas()
  }),

  actions: {
        adicionarTarefa(titulo, projeto, prioridade, data = '') {
        const novaTarefa = {
          id: Date.now(),
          titulo: titulo.trim(),
          projeto: projeto.trim() || 'Geral',
          prioridade,
          status: 'Pendente',
          data
        };

        this.tarefas.unshift(novaTarefa);
      },

    editarTarefa(id, titulo, projeto, prioridade, data) {
      const tarefa = this.tarefas.find(
        tarefa => tarefa.id === id
      );

      if (tarefa) {
        tarefa.titulo = titulo.trim();
        tarefa.projeto = projeto.trim() || 'Geral';
        tarefa.prioridade = prioridade;
        tarefa.data = data;
      }
    },

    excluirTarefa(id) {
      this.tarefas = this.tarefas.filter(
        tarefa => tarefa.id !== id
      );
    },

    limparTarefas() {
      this.tarefas = [];
    },

    alterarStatus(id, novoStatus) {
      const tarefa = this.tarefas.find(
        tarefa => tarefa.id === id
      );

      if (tarefa) {
        tarefa.status = novoStatus;
      }
    }
  }
});