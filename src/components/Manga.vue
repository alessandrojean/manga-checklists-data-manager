<template>
  <div class="h-100">
    <app-header title="Mangás">
      <b-btn variant="primary" :to="{ name: 'MangaFormNew', params: { dateShort: this.$route.params.dateShort } }"
         active-class="" v-if="this.$route.name == 'Manga'" size="sm">Novo</b-btn>
    </app-header>
    <main role="main">
      <router-view></router-view>
    </main>    
  </div>
</template>

<script>
  import AppHeader from './AppHeader'

  export default {
    name: 'manga',
    components: { AppHeader }
  }
</script>

<style>

</style>
