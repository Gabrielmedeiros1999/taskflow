<template>
  <aside class="sidebar">

    <div class="logo">
      <span class="logo-icon">✓</span>
      <h2>TaskFlow</h2>
    </div>

    <div class="menu-section">
      <span class="menu-label">MENU PRINCIPAL</span>

      <nav class="menu">
        <RouterLink
          to="/"
          class="menu-item"
          exact-active-class="active"
        >
          <span>▦</span>
          Dashboard
        </RouterLink>

        <RouterLink
          to="/tarefas"
          class="menu-item"
          exact-active-class="active"
        >
          <span>☷</span>
          Minhas tarefas
        </RouterLink>

        <RouterLink
          to="/projetos"
          class="menu-item"
          exact-active-class="active"
        >
          <span>▤</span>
          Projetos
        </RouterLink>

        <RouterLink
          to="/calendario"
          class="menu-item"
          exact-active-class="active"
        >
          <span>▦</span>
          Calendário
        </RouterLink>
      </nav>
    </div>

    <div class="sidebar-footer">
      <div class="avatar">GM</div>

      <div>
        <strong>Gabriel Medeiros</strong>
        <span>Minha conta</span>
      </div>
    </div>

  </aside>
</template>