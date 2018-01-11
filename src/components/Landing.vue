<template>
  <div class="h-100">
    <app-header title="Início"></app-header>
    <main role="main">
      <b-container>
        <h4 class="dashboard">Sobre</h4>
        <p class="card-text text-justify">
          Inicialmente, o aplicativo retirava todas as informações
          disponíveis nos sites das editoras, e isso demandava muito
          trabalho e manutenção, por ser um cadastro humano,
          e não terem um padrão, na maioria dos casos. Portanto, o 
          aplicativo está passando por um progresso de migração nos dados, 
          ou seja, parará de pegar as informações dos sites das editoras e 
          pegará de um "banco de dados" próprio.
        </p>
        <p class="card-text text-justify">
          Isto permitirá que o aplicativo tenha dados mais concisos e precisos, 
          além de poder ter mangás de outras editoras que não disponibilizam
          os checklists em seus sites. Com essa mudança, checklists de editoras
          como a Panini, em que os mangás só são adicionados ao site quando começam
          a serem vendidos, poderão estar no aplicativo completos assim que
          forem disponibilizados.
        </p>
        <p class="card-text text-justify">
          Infelizmente, este processo é demorado no início, visto que
          são muitos mangás para serem cadastrados. No entanto, assim que as
          informações antigas forem cadastradas, este cadastro só precisará ser
          feito uma vez por mês, para os checklists novos. Portanto, precisamos
          de sua ajuda para o aplicativo.
        </p>
        <p class="card-text text-justify">
          Esta página tem o intuito de ajudar você a colaborar com a migração,
          através do cadastro dos mangás ainda não disponíveis em nosso "banco
          de dados". Após o processo, você gerará um arquivo na parte 
          <b-link to="/export">Exportar</b-link> e, seguindo as instruções daquela
          sessão, enviar os dados corretamente para os administradores.
        </p>
        <h4 class="dashboard">Sessões</h4>
        <p class="card-text text-justify">
          Esta página é composta de três sessões inicialmente.
        </p>
        <h5>Checklists</h5>
        <p class="card-text text-justify">
          Aqui os checklists e, consequentemente, seus mangás, são criados.
          Todo o cadastro é manual, ou seja, você precisa ir nos 
          <a href="https://alessandrojean.github.io/manga-checklists-data/informacoes.html" target="_blank">sites recomendados</a>
          e digitar, ou copiar, as informações, uma a uma, nos campos. Porém, 
          essa sessão será automatizada futuramente.
        </p>
        <h5>Comparador</h5>
        <p class="card-text text-justify">
          Aqui você pode comparar as informações de um arquivo já gerado
          com os já cadastrados no banco de dados do aplicativo.
        </p>
        <h5>Exportar</h5>
        <p class="card-text text-justify">
          Aqui você exportará os dados criados para um arquivo que deverá
          ser enviado ao e-mail especificado na página, como está detalhadamente
          explicado na mesma.
        </p>
      </b-container>
    </main>
  </div>
</template>

<script>
  import AppHeader from './AppHeader'

  export default {
    name: 'landing',
    components: { AppHeader }
  }
</script>

<style>

</style>
