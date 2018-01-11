<template>
  <div class="h-100">
    <app-header title="Mangás">
      <b-btn variant="primary" v-b-modal.manga-form>Novo</b-btn>
    </app-header>
    <main role="main">
      <manga-list :mangas="checklist.mangas" @row-clicked="rowClicked"></manga-list>
    </main>

    <manga-form 
       @submit-new="handleSubmitNew" 
       @submit-update="handleSubmitUpdate" 
       @submit-delete="handleSubmitDelete"
       :edit="editing"
       ref="mangaForm"
       >
    </manga-form>
    
  </div>
</template>

<script>
  import checklistHelper from '../checklist-helper'
  import AppHeader from './AppHeader'
  import MangaList from './Manga/MangaList'
  import MangaForm from './Manga/MangaForm'

  export default {
    name: 'manga',
    components: { AppHeader, MangaList, MangaForm },
    created () {
      // Get the specified checklist from the database.
      this.fetchData()
    },
    data () {
      return {
        editing: false,
        mangaEditing: null,
        indexEditing: -1,
        checklist: {
          mangas: []
        }
      }
    },
    methods: {
      fetchData () {
        // Trick to reactivity work properly.
        this.checklist = {}
        // Get the specified checklist.
        this.checklist = this.$database.db
          .get('checklists')
          .find({ dateShort: this.$route.params.dateShort })
          .value()
        // If checklist doesn't exist, redirect.
        if (!this.checklist) {
          this.$router.push({ name: 'Checklists' })
        }
      },
      handleSubmitNew (manga) {
        // Add to the end of the array.
        this.checklist.mangas.push(manga)
        // Insert in the database.
        this.$database.db
          .find({ dateShort: this.checklist.dateShort })
          .assign(this.checklist)
          .write()
        // Sort the mangas by the date ascending.
        this.sortMangas()
        // Set the actual date time.
        this.notifyUpdated()
        // Refreshes the data.
        this.fetchData()
      },
      handleSubmitUpdate (manga) {
        // Update the manga in the database.
        this.$database.db
          .get('checklists')
          .find({ dateShort: this.checklist.dateShort })
          .get('mangas')
          .find({ id: manga.id })
          .assign(manga)
          .write()
        // Remove the digital edition if necessary.
        if (!manga.digital_edition) {
          this.$database.db
            .get('checklists')
            .find({ dateShort: this.checklist.dateShort })
            .get('mangas')
            .find({ id: manga.id })
            .unset('digital_edition')
            .write()
        }
        // Sort the mangas by the date ascending.
        this.sortMangas()
        // Set the actual date time.
        this.notifyUpdated()
        // Refreshes the data.
        this.fetchData()
      },
      handleSubmitDelete (manga) {
        // Removes the manga in the database.
        this.$database.db
          .get('checklists')
          .find({ dateShort: this.checklist.dateShort })
          .get('mangas')
          .remove({ id: manga.id })
          .write()
        // Sort the mangas by the date ascending.
        this.sortMangas()
        // Set the actual date time.
        this.notifyUpdated()
        // Refreshes the data.
        this.fetchData()
      },
      notifyUpdated () {
        this.$database.db
          .get('checklists')
          .find({ dateShort: this.checklist.dateShort })
          .set('updated_at', checklistHelper.getActualDateForUpdatedAt())
          .write()
      },
      rowClicked (item, index, event) {
        this.editing = true
        this.$refs.mangaForm.show(item)
      },
      sortMangas () {
        const datePattern = /(\d{2})\/(\d{2})\/(\d{4})/
        // Get the items from the database
        const mangasSorted = this.$database.db
          .get('checklists')
          .find({ dateShort: this.checklist.dateShort })
          .get('mangas')
          .sortBy([
            function (item) {
              return item.date
                ? new Date(item.date.replace(datePattern, '$3-$2-$1'))
                : null
            },
            function (item) { return item.name }
          ])
          .value()
        // Save the sorted checklist in the database.
        this.$database.db
          .get('checklists')
          .find({ dateShort: this.checklist.dateShort })
          .set('mangas', mangasSorted)
          .write()
      }
    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>

<style>

</style>
