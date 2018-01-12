<template>
  <b-card-group class="m-auto w-75">
  <b-card title="Sobre">
    <p class="card-text text-justify">
      Todos os checklists criados serão exportados.
    </p>
    <p class="card-text text-justify">
      Se você enviar um item que já está presente no banco de dados
      somente os campos diferentes serão avaliados e, caso aplicável,
      alterados.
    </p>
    <p class="card-text text-justify">
      Informações disconexas ou duvidosas serão completamente descartadas,
      portanto, verifique antes se o que você cadastrou é verídico segundo
      os sites recomendados.
    </p>
  </b-card>
  <b-card title="Informações">
    <b-form @submit="onSubmit" autocomplete="off">
      <b-form-checkbox id="export-citation"  v-model="exportation.citation" class="mb-3">Quero ser citado pela colaboração.</b-form-checkbox>
      <b-collapse id="export-profile" v-model="exportation.citation">
        <b-form-group id="field-set-export-name" label="Nome" label-for="export-name" 
            description="Como gostaria de ser citado, fique a vontade para usar apelidos.">
          <b-form-input id="export-name" v-model.trim="exportation.name" :required="exportation.citation" type="text"></b-form-input>
        </b-form-group>
        <b-form-group id="field-set-export-email" label="E-mail" label-for="export-email" 
            description="Seu e-mail não será compartilhado com terceiros.">
          <b-form-input id="export-email" v-model.trim="exportation.email" :required="exportation.citation" type="email"></b-form-input>
        </b-form-group>
      </b-collapse>
      <b-form-group id="field-set-export-report" label="Alterações" label-for="export-report"
        description="Explique, sucintamente, quais alterações você fez.">
        <b-form-textarea id="export-report" v-model="exportation.report" rows="3" max-rows="3" required no-resize></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary" class="w-100 mt-3">Exportar</b-button>
    </b-form>
  </b-card>
  </b-card-group>
</template>

<script>
  import JSZip from 'jszip'
  import FileSaver from 'file-saver'
  import shortid from 'shortid'
  import checklistHelper from '../../checklist-helper'

  export default {
    name: 'export-form',
    data () {
      return {
        exportation: {
          citation: true,
          name: '',
          email: '',
          report: '',
          created: ''
        }
      }
    },
    methods: {
      createZip () {
        // Set actual date.
        this.exportation.created = checklistHelper.getActualDateForUpdatedAt()
        // Create a file.
        const zip = new JSZip()
        // Add the information from the sender.
        zip.file('info.json', JSON.stringify(this.exportation))
        // Get all the checklists from the database.
        const checklists = this.$database.db
          .get('checklists')
          .value()
        // Add each checklist to the zip.
        for (var i = 0; i < checklists.length; i++) {
          const checklist = checklists[i]
          // File name of the checklist in the zip.
          const fileName = checklist.dateShort + '.json'
          // Add file to the zip.
          zip.file('checklists/' + fileName, JSON.stringify(checklist))
        }
        // Name of the person, if available.
        const colaboratorName = this.exportation.name
          ? this.exportation.name.replace(' ', '-').toLowerCase()
          : 'anonymous'
        // File name of the output zip.
        const fileName = colaboratorName + '-' + shortid.generate() + '.zip'
        // Reference to this.
        const self = this
        // Generate file.
        zip.generateAsync({ type: 'blob' })
          .then(function (blob) {
            // Save the file.
            FileSaver.saveAs(blob, fileName)
            // Clear the database.
            self.$database.clearDatabase()
            // Redirect to success page.
            self.$router.push({ name: 'ExportSuccess' })
          })
      },
      onSubmit (event) {
        event.preventDefault()
        // Create the zip and prompt to download.
        this.createZip()
      }
    }
  }
</script>

<style>

</style>
