<template>
  <div class="wrapper">
    <b-table striped hover small :items="mangas"
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
    data () {
      return {
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
      rowClicked (item, index, event) {
        this.$emit('row-clicked', JSON.parse(JSON.stringify(item)), index, event)
      }
    },
    props: {
      mangas: {
        type: Array,
        default () {
          return []
        }
      }
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
</style>
