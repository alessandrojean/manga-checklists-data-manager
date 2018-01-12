<template>
  <div class="wrapper">
    <b-table striped hover small :items="checklist.mangas"
       :fields="fields" @row-clicked="rowClicked" class="clickable"
       show-empty empty-text="Nenhum item cadastrado.">
      <template slot="publisher" slot-scope="data">
        {{ data.value.name }}
      </template>
      <template slot="label" slot-scope="data">
        {{ data.item.publisher.label }}
      </template>
      <template slot="name" slot-scope="data">
        {{ data.value }} {{ data.item.volume === -1 ? '' : '#' + data.item.volume }}
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    name: 'manga-list',
    created () {
      // Get the specified checklist from the database.
      this.fetchData()
    },
    data () {
      return {
        checklist: {
          mangas: []
        },
        fields: [
          {
            key: 'name',
            label: 'Mangá'
          },
          {
            key: 'publisher',
            label: 'Editora'
          },
          {
            key: 'label',
            label: 'Selo'
          },
          {
            key: 'date',
            label: 'Data'
          }
        ]
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
      rowClicked (item, index, event) {
        this.$router.push({ name: 'MangaFormEdit', params: { dateShort: this.$route.params.dateShort, id: item.id } })
      }
    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>

<style>
  main .table {
    margin: -1rem;
    width: calc(100% + 2rem);
    max-width: calc(100% + 2rem);
  }

  main .table.clickable tr {
    cursor: pointer;
  }

  main .table.clickable tr.b-table-empty-row,
  main .table.clickable thead tr {
    cursor: default;
  }
</style>
