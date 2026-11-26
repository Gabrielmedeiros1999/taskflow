# TaskFlow — Gerenciador de Tarefas

Aplicação web de gerenciamento de tarefas desenvolvida com Vue.js, com foco em organização, produtividade e experiência do usuário.

O TaskFlow permite organizar atividades, acompanhar o progresso de tarefas e visualizar informações importantes em um dashboard, utilizando armazenamento local para manter os dados no navegador.

## Funcionalidades

- **Dashboard:** visualização geral das tarefas e indicadores de progresso.
- **Gerenciamento de tarefas:** criação, edição, exclusão e alteração de status.
- **Organização por projetos:** agrupamento de tarefas por projeto.
- **Visualização Kanban:** organização das tarefas por status, com suporte a movimentação entre colunas.
- **Calendário:** visualização de tarefas com datas de entrega e navegação entre meses.
- **Busca e filtros:** pesquisa por tarefas e filtragem por status e prioridade.
- **Ordenação:** organização das tarefas por prioridade.
- **Configurações:** personalização da ordenação padrão e opção para limpar todas as tarefas.
- **Notificações:** mensagens de confirmação para ações realizadas.
- **Persistência local:** armazenamento das tarefas e preferências utilizando LocalStorage.
- **Interface responsiva:** adaptação da interface para diferentes tamanhos de tela.

## Tecnologias utilizadas

- Vue.js 3
- JavaScript
- Vite
- Pinia
- Vue Router
- Vitest
- HTML5
- CSS3
- LocalStorage

## Executando o projeto

### Pré-requisitos

- Node.js
- npm

### Instalação

Clone o repositório:

```bash
git clone https://github.com/Gabrielmedeiros1999/taskflow.git
```

Entre na pasta do projeto:

```bash
cd taskflow
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá o endereço local para acessar a aplicação no navegador.

## Testes

Para executar os testes automatizados:

```bash
npm run test
```

Os testes utilizam Vitest para verificar funcionalidades do gerenciamento de tarefas.

## Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `dist`.

Para visualizar a versão compilada localmente:

```bash
npm run preview
```

## Armazenamento de dados

O TaskFlow utiliza LocalStorage para armazenar tarefas e preferências do usuário diretamente no navegador.

Por ser uma aplicação frontend, não utiliza banco de dados ou backend próprio. Os dados ficam vinculados ao navegador utilizado.

## Objetivo do projeto

O TaskFlow foi desenvolvido como projeto de portfólio para praticar e consolidar conhecimentos em desenvolvimento frontend, componentização, gerenciamento de estado, navegação entre páginas, persistência de dados e testes automatizados.

## Autor

**Gabriel Caldeira Medeiros**

Estudante de Análise e Desenvolvimento de Sistemas — UniSenac Pelotas.

[GitHub](https://github.com/Gabrielmedeiros1999)

[Portfólio](https://portfolio-weld-omega-83.vercel.app/)