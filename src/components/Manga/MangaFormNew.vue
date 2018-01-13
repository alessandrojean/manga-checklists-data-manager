<template>
  <b-container class="p-0">
    <h5 class="dashboard">Informações</h5>
    <b-form @submit="onSubmit" autocomplete="off">
      <b-form-row>
        <b-col md="6">
          <b-form-group id="field-set-manga-publisher" label="Editora" label-for="manga-publisher">
            <b-form-select id="manga-publisher" :options="publishers" required v-model="manga.publisher.code"
              text-field="name" value-field="code" @change="onChange">
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group id="field-set-manga-label" label="Selo editorial" label-for="manga-label">
            <b-form-select id="manga-label" :options="labels" required v-model="manga.publisher.label">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group id="field-set-manga-name" label="Nome" label-for="manga-name" description="Utilize sempre o nome localizado.">
            <b-form-input id="manga-name" v-model.trim="manga.name" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="8">
          <b-form-group id="field-set-manga-subtitle" label="Subtítulo" label-for="manga-subtitle"
            description="Utilize o subtítulo do volume, se aplicável.">
            <b-form-input id="manga-subtitle" v-model.trim="manga.subtitle"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group id="field-set-manga-date" label="Data" label-for="manga-date">
            <b-form-input id="manga-date" v-model="correctDate" type="date"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group id="field-set-manga-synopsis" label="Sinopse" label-for="manga-synopsis"
            description="Lembre-se de formatar corretamente.">
            <b-form-textarea id="manga-synopsis" v-model.trim="manga.synopsis" rows="5"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-collapse id="manga-synopsis" :visible="haveSynopsis" class="mb-3">
        <b-card sub-title="Prévia">
          <div class="card-text text-justify" v-html="manga.synopsis"></div>
        </b-card>
      </b-collapse>

      <h5 class="dashboard">Dados da edição</h5>
      <b-form-row>
        <b-col md="12">
          <b-form-group id="field-set-manga-authors" label="Autor(es)" label-for="manga-authors"
            description="Para múltiplos autores, separe-os por vírgula e espaço.">
            <b-form-input id="manga-authors" v-model.trim="manga.authors" type="text" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="4">
          <b-form-group id="field-set-manga-volume" label="Volume" label-for="manga-volume">
            <b-form-input id="manga-volume" v-model.number="manga.volume" type="number"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group id="field-set-manga-page-number" label="Número de páginas" label-for="manga-page-number">
            <b-form-input id="manga-page-number" v-model.number="manga.page_number" type="number"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group id="field-set-manga-age-rating" label="Classificação indicativa" label-for="manga-age-rating">
            <b-form-select id="manga-age-rating" :options="ageRatings" required v-model="manga.age_rating">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-checkbox id="have-digital-edition" v-model="haveDigitalEdition" class="mb-3">
        Este mangá possui edição digital.
      </b-form-checkbox>

      <h5 class="dashboard">Edição impressa</h5>
      <b-form-row>
        <b-col md="4">
          <b-form-group id="field-set-manga-paper-format" label="Formato" label-for="manga-paper-format">
            <b-form-input id="manga-paper-format" v-model.trim="manga.paper_edition.format" type="text" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group id="field-set-manga-paper-price" label="Preço" label-for="manga-paper-price"
            description="Utilize sempre o preço de capa.">
            <b-form-input id="manga-paper-price" v-model.number="manga.paper_edition.price" type="number" step="0.1" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group id="field-set-manga-paper-isbn" label="ISBN" label-for="manga-paper-isbn"
            description="Utilize o código de barras caso não se aplique.">
            <b-form-input id="manga-paper-isbn" v-model.trim="manga.paper_edition.isbn" type="text"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-collapse id="manga-digital-edition" v-model="haveDigitalEdition">
        <h5 class="dashboard">Edição digital</h5>
        <b-form-row>
          <b-col md="4">
            <b-form-group id="field-set-manga-digital-format" label="Formato" label-for="manga-digital-format">
              <b-form-input id="manga-digital-format" v-model.trim="digitalEdition.format" type="text" 
                 :required="haveDigitalEdition"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="8">
            <b-form-group id="field-set-manga-digital-available-at" label="Disponível nas lojas" label-for="manga-digital-available-at">
              <b-form-input id="manga-digital-available-at" v-model.trim="digitalEdition.available_at" type="text" 
                 :required="haveDigitalEdition"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="4">
            <b-form-group id="field-set-manga-digital-price" label="Preço" label-for="manga-digital-price">
              <b-form-input id="manga-digital-price" v-model.number="digitalEdition.price" type="number" step="0.1" 
                 :required="haveDigitalEdition"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group id="field-set-manga-digital-isbn-epub" label="ISBN [.epub]" label-for="manga-digital-isbn-epub">
              <b-form-input id="manga-digital-isbn-epub" v-model.trim="digitalEdition.isbn_epub" type="text"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group id="field-set-manga-digital-isbn-mobi" label="ISBN [.mobi]" label-for="manga-digital-isbn-mobi">
              <b-form-input id="manga-digital-isbn-mobi" v-model.trim="digitalEdition.isbn_mobi" type="text"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-collapse>

      <h5 class="dashboard">Imagens e outros</h5>
      <b-form-row>
        <b-col md="6">
          <b-form-group id="field-set-manga-cover" label="Capa" label-for="manga-cover"
            description="Utilize imagens com pelo menos 400px de altura.">
            <b-form-input id="manga-cover" v-model.trim="manga.cover_url" type="url"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group id="field-set-manga-header" label="Cabeçalho" label-for="manga-header">
            <b-form-input id="manga-header" v-model.trim="manga.header_url" type="url"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group id="field-set-manga-url" label="URL" label-for="manga-url"
            description="Utilize apenas links para o site ou loja oficial da editora, caso aplicável.">
            <b-input-group>
              <b-form-input id="manga-url" v-model.trim="manga.url" type="url"></b-form-input>
              <b-input-group-button>
                <b-button @click="getInformation" :disabled="loading || !isAvailable">Pegar informações</b-button>
              </b-input-group-button>
              
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-form-row>

      <div class="d-flex w-100 justify-content-between">
        <div>
          <b-button v-if="$route.params.id" variant="danger" @click="onDelete" :disabled="loading">Deletar</b-button>
        </div>
        <div>
          <b-button :to="{ name: 'Manga', params: { dateShort: this.$route.params.dateShort } }"
            active-class="">
            Cancelar
          </b-button>
          <b-button type="submit" variant="primary" :disabled="loading">Salvar</b-button>
        </div>
      </div>
    </b-form>
  </b-container>
</template>

<script>
  import shortid from 'shortid'
  import checklistHelper from '../../checklist-helper'
  import parser from '../../parsers/parser'

  export default {
    name: 'MangaFormNew',
    computed: {
      correctDate: {
        get () {
          const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
          return this.manga.date.replace(pattern, '$3-$2-$1')
        },
        set (newValue) {
          const pattern = /(\d{4})-(\d{2})-(\d{2})/
          this.manga.date = newValue.replace(pattern, '$3/$2/$1')
        }
      },
      haveSynopsis () {
        return this.manga.synopsis !== ''
      },
      isAvailable () {
        return parser.isAvailable(this.manga.url)
      }
    },
    created () {
      // Get available publishers.
      this.fetchPublishers()
      // Check if it's updating a manga.
      if (this.$route.params.id) {
        this.fetchData()
      }
    },
    data () {
      return {
        loading: false,
        haveDigitalEdition: false,
        digitalEdition: {
          format: '',
          price: 0,
          available_at: '',
          isbn_epub: '',
          isbn_mobi: ''
        },
        manga: checklistHelper.defaultManga(),
        publishers: [],
        labels: [],
        ageRatings: [
          'Livre',
          '10 anos',
          '12 anos',
          '14 anos',
          '16 anos',
          '18 anos'
        ]
      }
    },
    methods: {
      fetchData () {
        const manga = this.$database.db
          .get('checklists')
          .find({ dateShort: this.$route.params.dateShort })
          .get('mangas')
          .find({ id: this.$route.params.id })
          .value()
        // If found.
        if (manga) {
          // Trick to force the reactivity.
          this.manga = {}
          // Parse manga from database to data.
          this.manga = manga
          // If have digital edition.
          if (this.manga.digital_edition) {
            this.digitalEdition = {}
            // Parse digital edition.
            this.digitalEdition = this.manga.digital_edition
            // Enable digital edition.
            this.haveDigitalEdition = true
          }
        } else {
          // Redirect to manga list.
          this.$router.push({ name: 'Manga', params: { dateShort: this.$route.params.dateShort } })
        }
      },
      fetchPublishers () {
        this.$http.get('https://alessandrojean.github.io/manga-checklists-data/publishers/publishers.json')
          .then(response => {
            this.publishers = response.data.br
            this.labels = this.publishers[this.manga.publisher.code - 1].publishing_labels
          })
          .catch(e => console.error(e))
      },
      getInformation () {
        const self = this
        self.loading = true

        this.$http.get(this.manga.url)
          .then(response => {
            parser.parse(self.manga, response.data, function (err) {
              if (err) console.log(err)
              // Disable loading state.
              self.loading = false
              // If have digital edition.
              if (self.manga.digital_edition) {
                self.digitalEdition = self.manga.digital_edition
                self.haveDigitalEdition = true
                // Remove from manga to avoid conflict.
                delete self.manga.digital_edition
              }
            })
          })
          .catch(e => {
            console.error(e)
            self.loading = false
          })
      },
      insertManga () {
        // Insert in the database.
        this.$database.db
          .get('checklists')
          .find({ dateShort: this.$route.params.dateShort })
          .get('mangas')
          .push(this.manga)
          .write()
        // Sort the mangas by the date ascending.
        this.sortMangas()
        // Set the actual date time.
        this.notifyUpdated()
      },
      notifyUpdated () {
        this.$database.db
          .get('checklists')
          .find({ dateShort: this.$route.params.dateShort })
          .set('updatedAt', checklistHelper.getActualDateForUpdatedAt())
          .write()
      },
      onChange (value) {
        this.manga.publisher.name = this.publishers[value - 1].name
        this.labels = this.publishers[value - 1].publishing_labels

        // Clear old label.
        this.manga.publisher.label = ''

        // If have only one label, select it.
        if (this.labels.length === 1) {
          this.manga.publisher.label = this.labels[0]
        }
      },
      onDelete () {
        // Removes the manga in the database.
        this.$database.db
          .get('checklists')
          .find({ dateShort: this.$route.params.dateShort })
          .get('mangas')
          .remove({ id: this.manga.id })
          .write()
        // Sort the mangas by the date ascending.
        this.sortMangas()
        // Set the actual date time.
        this.notifyUpdated()
        // Redirect to manga list.
        this.$router.push({ name: 'Manga', params: { dateShort: this.$route.params.dateShort } })
      },
      onSubmit (event) {
        console.log(this.manga)
        event.preventDefault()
        // Check if needs to remove digital edition.
        if (this.haveDigitalEdition && checklistHelper.isDigitalEditionValid(this.digitalEdition)) {
          this.manga.digital_edition = this.digitalEdition
          // Remove the - from the isbn.
          this.manga.digital_edition.isbn_epub = this.manga.digital_edition.isbn_epub.replace(/-/g, '')
          this.manga.digital_edition.isbn_mobi = this.manga.digital_edition.isbn_mobi.replace(/-/g, '')
        } else {
          delete this.manga.digital_edition
        }
        // Remove the - from isbn.
        this.manga.paper_edition.isbn = this.manga.paper_edition.isbn.replace(/-/g, '')
        // If manga doesn't have header, fill with the cover.
        if (!this.manga.header_url) {
          this.manga.header_url = this.manga.cover_url
        }
        // Generate the id if it's a new manga.
        if (!this.manga.id) {
          this.manga.id = shortid.generate()
          // Insert the manga in the database.
          this.insertManga()
        } else {
          this.updateManga()
        }
        // Redirect to manga list.
        this.$router.push({ name: 'Manga', params: { dateShort: this.$route.params.dateShort } })
      },
      sortMangas () {
        const datePattern = /(\d{2})\/(\d{2})\/(\d{4})/
        // Get the items from the database
        const mangasSorted = this.$database.db
          .get('checklists')
          .find({ dateShort: this.$route.params.dateShort })
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
          .find({ dateShort: this.$route.params.dateShort })
          .set('mangas', mangasSorted)
          .write()
      },
      updateManga () {
        // Update the manga in the database.
        this.$database.db
          .get('checklists')
          .find({ dateShort: this.$route.params.dateShort })
          .get('mangas')
          .find({ id: this.manga.id })
          .assign(this.manga)
          .write()
        // Remove the digital edition if necessary.
        if (!this.manga.digital_edition) {
          this.$database.db
            .get('checklists')
            .find({ dateShort: this.$route.params.dateShort })
            .get('mangas')
            .find({ id: this.manga.id })
            .unset('digital_edition')
            .write()
        }
        // Sort the mangas by the date ascending.
        this.sortMangas()
        // Set the actual date time.
        this.notifyUpdated()
      }
    }
  }
</script>

<style>
  .card-text p:last-of-type {
    margin-bottom: 0;
  }
</style>

