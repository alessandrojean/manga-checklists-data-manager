<template>
  <b-card-group class="w-75">
    <b-card title="Instruções">
      <p class="card-text text-justify">
        Se você optou por ser citado, você terá seu nome incluido
        na lista de colaboradores assim que suas alterações forem aceitas.
      </p>
      <p class="card-text text-justify">
        Fique de olho no seu e-mail, pode ser que entremos em contato
        com você para averiguar alguma informação provida nas alterações.
      </p>
      <p class="card-text text-justify">
        Lembrando que após cada exportação, o banco de dados local é limpado
        para evitar envios duplicados futuramente.
      </p>
      <p class="card-text text-justify">
        Agradecemos seu tempo e disposição para colaborar com o projeto.
      </p>
    </b-card>
    <b-card title="Envio">
      <p class="card-text text-justify">
        Lembre-se de enviar um e-mail com o arquivo gerado em anexo
        para o destinatário
      </p>
      <pre class="text-center">manga.checklists@gmail.com</pre>
      <p class="card-text text-justify">
        com o assunto <code>[BD] Colaboração</code>.
      </p>
      <p class="card-text text-justify">
        Qualquer observação adicional deve ser enviada juntamente
        ao corpo do e-mail.
      </p>
      <p class="card-text text-justify">
        Pedimos que <em>não</em> renomeie e nem altere com programas externos
        o arquivo gerado.
      </p>
    </b-card>
  </b-card-group>
</template>

<script>
  export default {
    name: 'export-success'
  }
</script>

<style>

</style>
