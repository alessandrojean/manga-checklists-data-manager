<template>
  <div class="h-100">
    <app-header title="Checklists">
      <b-navbar-nav>
        <b-btn variant="primary" v-b-modal.modal-date>Novo</b-btn>
      </b-navbar-nav>
    </app-header>
    <main role="main">
      <div class="wrapper">
        <b-list-group>
          <b-list-group-item v-for="(checklist, index) in checklists" :key="index" 
             class="d-flex justify-content-between align-items-center"
             :to="{ name: 'Manga', params: { dateShort: checklist.dateShort } }"
             active-class="">
            {{ checklist.dateFormatted }}
            <b-button size="sm" variant="outline-danger" @click.prevent="onDeleteClicked(checklist)">Deletar</b-button>
          </b-list-group-item>
        </b-list-group>
        <b-card class="text-center" v-if="checklists.length == 0">Nenhum checklist criado.</b-card>
      </div>
    </main>

    <b-modal id="modal-date" ref="modalDate" title="Novo checklist"
       @ok="handleOk" ok-only>
      <form @submit.stop.prevent="handleSubmit">
        <b-form-row>
          <b-col md="6">
            <b-form-group id="field-set-month" label="Mês" label-for="month">
              <b-form-select v-model="monthSelected" :options="monthOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="field-set-year" label="Ano" label-for="year">
              <b-form-input v-model="yearSelected" type="number" required @change="onYearChange"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import checklistHelper from '../checklist-helper'
  import AppHeader from './AppHeader'

  const actualDate = new Date()
  const actualMonth = actualDate.getMonth() + 1

  export default {
    name: 'checklists',
    components: { AppHeader },
    created () {
      // Get the checklists from the database.
      this.fetchData()
      // Simulate the change event to disable the possible months.
      this.onYearChange(actualDate.getFullYear())
    },
    data () {
      return {
        monthSelected: actualMonth,
        monthOptions: checklistHelper.months,
        yearSelected: actualDate.getFullYear(),
        checklists: []
      }
    },
    methods: {
      handleOk (event) {
        // Prevent modal from closing.
        event.preventDefault()
        // Check if year is valid.
        if (this.yearSelected) {
          this.handleSubmit()
        }
      },
      handleSubmit () {
        const dateShort = checklistHelper.getShortDate(this.monthSelected, this.yearSelected)
        const dateFormatted = checklistHelper.getFormattedDate(this.monthSelected, this.yearSelected)
        // Checks if checklist exists.
        const filtered = this.checklists.filter((value) => value.dateShort === dateShort)

        if (filtered.length === 0) {
          // Add the new checklist to the array.
          this.$database.db.get('checklists')
            .push({
              year: this.yearSelected,
              month: this.monthSelected,
              dateFormatted: dateFormatted,
              dateShort: dateShort,
              mangas: [
                {
                  'publisher': {
                    'code': 2,
                    'name': 'Panini',
                    'label': 'Planet Mangá'
                  },
                  'name': 'Pluto',
                  'date': '01/12/2017',
                  'subtitle': '',
                  'synopsis': '<p>Em um mundo onde humanos e robôs coexistem, o poderoso robô Mont Blanc foi destruído. Ao mesmo tempo, um importante ativista protetor dos direitos dos robôs é assassinado. Os dois incidentes apresentam algo em comum nos locais dos crimes: chifres colocados nas cabeças das vítimas. Gesicht, um competente investigador da Europol, está prestes a enfrentar o mais tenso e complexo trabalho de sua carreira, no qual ele também é uma vítima em potencial: um dos robôs mais poderosos do mundo!</p>',
                  'volume': 1,
                  'authors': 'Naoki Urasawa, Osamu Tezuka',
                  'page_number': 200,
                  'age_rating': '18 anos',
                  'paper_edition': {
                    'format': '13,7 x 20 cm',
                    'price': 18.9,
                    'isbn': '9788542608793'
                  },
                  'cover_url': 'https://img.assinaja.com/assets/tZ/004/img/82987_520x520.jpg',
                  'header_url': 'https://img.assinaja.com/assets/tZ/004/img/82987_520x520.jpg',
                  'url': 'https://loja.panini.com.br/panini/produto/Manga-Pluto-Edicao-1.aspx',
                  'id': 'ryhEvH-NM'
                }
              ],
              updated_at: checklistHelper.getActualDateForUpdatedAt()
            })
            .write()
          this.fetchData()
        }

        // Close modal.
        this.$refs.modalDate.hide()
      },
      fetchData () {
        // Trick to reactivity work properly.
        this.checklists = []
        // Get the data from the database.
        this.checklists = this.$database.db.get('checklists').value()
      },
      onDeleteClicked (checklist) {
        this.$database.db.get(`checklists`)
                         .remove({ dateShort: checklist.dateShort })
                         .write()

        this.fetchData()
      },
      onYearChange (value) {
        const isActualYear = parseInt(value) === actualDate.getFullYear()

        // Disable, or enable, every month based on the actual Year.
        Array.prototype.forEach.call(this.monthOptions, (option, index) => {
          option.disabled = isActualYear ? actualMonth < index + 1 : false
        })

        // If old month selected is higher than the actual month,
        // selects the actual month instead.
        if (isActualYear && this.monthSelected > actualMonth) {
          this.monthSelected = actualMonth
        }
      }
    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>
