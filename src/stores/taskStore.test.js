
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi
} from 'vitest';

import { createPinia, setActivePinia } from 'pinia';
import { useTaskStore } from './taskStore';

let pinia;

// Simula o LocalStorage do navegador
function criarLocalStorageMock(dadosIniciais = null) {
  const dados = new Map();

  if (dadosIniciais !== null) {
    dados.set('taskflow-tarefas', dadosIniciais);
  }

  return {
    getItem: vi.fn(chave => dados.get(chave) ?? null),

    setItem: vi.fn((chave, valor) => {
      dados.set(chave, String(valor));
    }),

    removeItem: vi.fn(chave => dados.delete(chave)),

    clear: vi.fn(() => dados.clear())
  };
}

// Preparação antes de cada teste
beforeEach(() => {
  vi.stubGlobal('localStorage', criarLocalStorageMock());

  pinia = createPinia();
  setActivePinia(pinia);
});

// Limpeza depois de cada teste
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Task Store', () => {

  it('deve carregar as tarefas iniciais', () => {
    const store = useTaskStore(pinia);

    expect(store.tarefas).toHaveLength(4);
    expect(store.tarefas[0].titulo)
      .toBe('Estudar fundamentos do Vue.js');
  });

  it('deve adicionar uma nova tarefa', () => {
    const store = useTaskStore(pinia);

    vi.spyOn(Date, 'now').mockReturnValue(123);

    store.adicionarTarefa(
      'Estudar Vitest',
      'TaskFlow',
      'Alta'
    );

    expect(store.tarefas[0]).toEqual({
      id: 123,
      titulo: 'Estudar Vitest',
      projeto: 'TaskFlow',
      prioridade: 'Alta',
      status: 'Pendente'
    });
  });

  it('deve remover espaços extras do título e projeto', () => {
    const store = useTaskStore(pinia);

    store.adicionarTarefa(
      '  Aprender JavaScript  ',
      '  Estudos  ',
      'Média'
    );

    expect(store.tarefas[0].titulo)
      .toBe('Aprender JavaScript');

    expect(store.tarefas[0].projeto)
      .toBe('Estudos');
  });

  it('deve utilizar Geral quando o projeto estiver vazio', () => {
    const store = useTaskStore(pinia);

    store.adicionarTarefa(
      'Estudar CSS',
      '   ',
      'Baixa'
    );

    expect(store.tarefas[0].projeto).toBe('Geral');
  });

it('deve excluir uma tarefa', () => {
  const store = useTaskStore(pinia);

  expect(store.tarefas).toHaveLength(4);

  store.excluirTarefa(1);

  expect(store.tarefas).toHaveLength(3);

  expect(
    store.tarefas.find(tarefa => tarefa.id === 1)
  ).toBeUndefined();
});

  it('não deve alterar uma tarefa que não existe', () => {
    const store = useTaskStore(pinia);

    const quantidadeInicial = store.tarefas.length;

    store.alterarStatus(999, 'Concluída');

    expect(store.tarefas).toHaveLength(quantidadeInicial);
  });

  it('deve recuperar tarefas salvas no LocalStorage', () => {
    const tarefasSalvas = [
      {
        id: 10,
        titulo: 'Tarefa salva',
        projeto: 'Estudos',
        prioridade: 'Alta',
        status: 'Pendente'
      }
    ];

    vi.stubGlobal(
      'localStorage',
      criarLocalStorageMock(JSON.stringify(tarefasSalvas))
    );

    const store = useTaskStore(pinia);

    expect(store.tarefas).toEqual(tarefasSalvas);
  });

  it('deve alterar o status de uma tarefa', () => {
  const store = useTaskStore(pinia);

  store.alterarStatus(2, 'Em andamento');

  const tarefa = store.tarefas.find(
    tarefa => tarefa.id === 2
  );

  expect(tarefa.status).toBe('Em andamento');
});

});
