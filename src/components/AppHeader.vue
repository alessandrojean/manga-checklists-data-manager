<template>
  <header>
    <b-navbar toggleable="sm" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand>{{ title }}</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav class="d-block d-sm-none">
          <b-nav-item to="/" active-class="">Início</b-nav-item>
          <b-nav-item to="/checklists">Checklists</b-nav-item>
          <b-nav-item>Comparador</b-nav-item>
          <b-nav-item to="/export">Exportar</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <slot></slot>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
  export default {
    name: 'app-header',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>