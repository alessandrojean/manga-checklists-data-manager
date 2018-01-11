<template>
  <div class="h-100">
    <app-header title="Exportar"></app-header>
    <main role="main" class="centered gradient d-flex">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import AppHeader from './AppHeader'

  export default {
    name: 'export',
    components: { AppHeader }
  }
</script>

<style>
  main.centered {
    align-items: center;
    justify-content: center;
  }

  main.gradient {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
  }

  /* Style from Bootstrap 3 */
  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
