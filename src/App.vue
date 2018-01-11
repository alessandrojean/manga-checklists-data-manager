<template>
  <div id="app">
    <app-sidebar>
      <router-view></router-view>
    </app-sidebar>
  </div>
</template>

<script>
  import AppSidebar from './components/AppSidebar'

  export default {
    name: 'app',
    components: { AppSidebar }
  }
</script>

<style>
  html {
    height: 100%;
  }

  #app {
    height: 100%;
  }

  h4.dashboard, h5.dashboard {
    padding-bottom: 9px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
</style>
