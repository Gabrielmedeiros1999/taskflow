# TaskFlow — Gerenciador de Tarefas

Uma aplicação web para organização e gerenciamento de tarefas, desenvolvida com Vue 3 e JavaScript.

O TaskFlow permite organizar atividades, acompanhar seu progresso e visualizar informações por meio de um painel com estatísticas.

## Funcionalidades

- **Gerenciamento de tarefas:** criar, concluir, reabrir e excluir tarefas.
- **Filtros e pesquisa:** localizar tarefas por título, status e prioridade.
- **Organização Kanban:** visualizar e movimentar tarefas entre diferentes etapas.
- **Dashboard:** acompanhar estatísticas, progresso e distribuição das tarefas.
- **Persistência local:** manter as tarefas salvas no navegador utilizando LocalStorage.
- **Interface responsiva:** utilizar a aplicação em computadores e dispositivos móveis.

## Tecnologias utilizadas

- JavaScript
- Vue 3
- Vite
- Pinia
- Vue Router
- CSS
- LocalStorage
- Vitest

## Testes

O projeto utiliza Vitest para realizar testes automatizados das funcionalidades da store de tarefas.

Para executar os testes:

```bash
npm run test
```

Para executar os testes em modo de observação:

```bash
npm run test:watch
```

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm

### Instalação

1. Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

2. Entre na pasta do projeto:

```bash
cd taskflow
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse o endereço disponibilizado pelo Vite no terminal.

## Build para produção

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar a versão gerada:

```bash
npm run preview
```

## Estrutura do projeto

```text
src/
├── components/
├── stores/
│   ├── taskStore.js
│   └── taskStore.test.js
├── views/
├── App.vue
├── main.js
└── style.css
```

## Observações

O TaskFlow é um projeto frontend. Os dados das tarefas são armazenados localmente no navegador por meio do LocalStorage. Portanto, não existe sincronização entre diferentes dispositivos ou usuários.

## Autor

Desenvolvido por **Gabriel Caldeira Medeiros**.

- GitHub: https://github.com/Gabrielmedeiros1999
