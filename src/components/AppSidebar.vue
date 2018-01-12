<template>
  <b-container fluid>
    <b-row>
      <b-col sm="3" md="2" class="d-none d-sm-block bg-light sidebar">
        <router-link class="logo-spacer bg-dark" to="/">
          <img src="../assets/logo-app.png" alt="logo-app">
        </router-link>
        <div class="nav-wrapper">
          <b-nav pills class="flex-column">
            <b-nav-item to="/checklists">Checklists</b-nav-item>
            <b-nav-item to="/export">Exportar</b-nav-item>
          </b-nav>
          
        </div>
      </b-col>
      <b-col sm="9" md="10" class="ml-sm-auto no-padding">
        <slot>
          Conteúdo principal do app.
        </slot>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'app-sidebar'
  }
</script>

<style>
  /* Move down content because we have a fixed navbar that is 3.5rem tall */
  body {
    height: 100%;
    overflow: hidden;
  }

  .logo-spacer {
    height: 3.5rem;
    text-align: center;
    display: block;
  }

  .logo-spacer.router-link-exact-active {
    background-color: #1d2124 !important;
  }

  .logo-spacer img {
    height: 100%;
    display: inline-block;
    margin: 0 auto;
  }

  .container-fluid, .container-fluid .row {
    height: 100%;
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    padding: 0 0 20px 0;
  }

  .sidebar .nav-wrapper {
    border-right: 1px solid #eee;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
  }

  .sidebar .nav-item {
    width: 100%;
  }

  .sidebar .nav-item + .nav-item {
    margin-left: 0;
  }

  .sidebar .nav-link {
    border-radius: 0;
  }

  .no-padding {
    padding-left: 0;
    padding-right: 0;
  }

  main {
    width: 100%;
    height: calc(100% - 3.5rem);
    padding: 1rem;
    overflow-y: auto;
  }

  .wrapper {
    width: 100%;
  }
</style>
