<template>
  <b-form @submit="handleSubmit" autocomplete="off">
    <b-modal id="manga-form" size="lg" :title="title" ref="mangaForm" @hidden="onHidden">
      <b-form-row>
        <b-col md="6">
          <b-form-group id="field-set-manga-publisher" label="Editora" label-for="manga-publisher">
            <b-form-select id="manga-publisher" :options="publishers" required v-model="mangaData.publisher.code"
              text-field="name" value-field="code" @change="onChange">
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group id="field-set-manga-label" label="Selo editorial" label-for="manga-label">
            <b-form-select id="manga-label" :options="labels" required v-model="mangaData.publisher.label">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group id="field-set-manga-name" label="Nome" label-for="manga-name" description="Utilize sempre o nome localizado.">
            <b-form-input id="manga-name" v-model.trim="mangaData.name" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="8">
          <b-form-group id="field-set-manga-subtitle" label="Subtítulo" label-for="manga-subtitle"
            description="Utilize o subtítulo do volume, se aplicável.">
            <b-form-input id="manga-subtitle" v-model="mangaData.subtitle"></b-form-input>
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
            <b-form-textarea id="manga-synopsis" v-model="mangaData.synopsis" rows="5"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-collapse id="manga-synopsis" :visible="haveSynopsis" class="mb-3">
        <b-card sub-title="Prévia">
          <div class="card-text text-justify" v-html="mangaData.synopsis"></div>
        </b-card>
      </b-collapse>

      <h5 class="dashboard">Dados da edição</h5>
      <b-form-row>
        <b-col md="12">
          <b-form-group id="field-set-manga-authors" label="Autor(es)" label-for="manga-authors"
            description="Para múltiplos autores, separe-os por vírgula e espaço.">
            <b-form-input id="manga-authors" v-model="mangaData.authors" type="text" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="4">
          <b-form-group id="field-set-manga-volume" label="Volume" label-for="manga-volume">
            <b-form-input id="manga-volume" v-model="mangaData.volume" type="number"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group id="field-set-manga-page-number" label="Número de páginas" label-for="manga-page-number">
            <b-form-input id="manga-page-number" v-model="mangaData.page_number" type="number"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group id="field-set-manga-age-rating" label="Classificação indicativa" label-for="manga-age-rating">
            <b-form-select id="manga-age-rating" :options="ageRatings" required v-model="mangaData.age_rating">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-checkbox id="settings-profile-citation" v-model="haveDigitalEdition">
        Este mangá possui edição digital.
      </b-form-checkbox>

      <b-collapse id="manga-digital-edition" v-model="haveDigitalEdition" class="pt-1">
        <h5 class="dashboard">Edição digital</h5>
        <b-form-row>
          <b-col md="4">
            <b-form-group id="field-set-manga-digital-format" label="Formato" label-for="manga-digital-format">
              <b-form-input id="manga-digital-format" v-model="digitalEdition.format" type="text" 
                 :required="haveDigitalEdition"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="8">
            <b-form-group id="field-set-manga-digital-available-at" label="Disponível nas lojas" label-for="manga-digital-available-at">
              <b-form-input id="manga-digital-available-at" v-model="digitalEdition.available_at" type="text" 
                 :required="haveDigitalEdition"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="4">
            <b-form-group id="field-set-manga-digital-price" label="Preço" label-for="manga-digital-price">
              <b-form-input id="manga-digital-price" v-model="digitalEdition.price" type="number" step="0.1" 
                 :required="haveDigitalEdition"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group id="field-set-manga-digital-isbn-epub" label="ISBN [.epub]" label-for="manga-digital-isbn-epub">
              <b-form-input id="manga-digital-isbn-epub" v-model="digitalEdition.isbn_epub" type="text"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group id="field-set-manga-digital-isbn-mobi" label="ISBN [.mobi]" label-for="manga-digital-isbn-mobi">
              <b-form-input id="manga-digital-isbn-mobi" v-model="digitalEdition.isbn_mobi" type="text"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-collapse>

      <h5 class="dashboard">Imagens e outros</h5>
      <b-form-row>
        <b-col md="6">
          <b-form-group id="field-set-manga-cover" label="Capa" label-for="manga-cover"
            description="Utilize imagens com pelo menos 400px de altura.">
            <b-form-input id="manga-cover" v-model="mangaData.cover_url" type="url"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group id="field-set-manga-header" label="Cabeçalho" label-for="manga-header">
            <b-form-input id="manga-header" v-model="mangaData.header_url" type="url"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group id="field-set-manga-url" label="URL" label-for="manga-url"
            description="Utilize apenas links para o site ou loja oficial da editora, caso aplicável.">
            <b-form-input id="manga-url" v-model="mangaData.url" type="url"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <div slot="modal-footer">
        <b-button @click="closeModal">Cancelar</b-button>
        <b-button variant="danger" @click="deleteManga" v-if="edit">Deletar</b-button>
        <b-button type="submit" variant="primary">Salvar</b-button>
      </div>
    </b-modal>
  </b-form>
</template>

<script>
  import shortid from 'shortid'

  export default {
    name: 'manga-form',
    computed: {
      haveSynopsis () {
        return this.mangaData.synopsis !== ''
      },
      correctDate: {
        get () {
          const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
          return this.mangaData.date.replace(pattern, '$3-$2-$1')
        },
        set (newValue) {
          const pattern = /(\d{4})-(\d{2})-(\d{2})/
          this.mangaData.date = newValue.replace(pattern, '$3/$2/$1')
        }
      },
      digitalEditionValid () {
        if (this.digitalEdition !== undefined) {
          const digital = this.digitalEdition

          const isValid = (
            digital.format !== '' ||
            digital.price !== 0 ||
            digital.available_at !== '' ||
            digital.isbn_epub !== '' ||
            digital.isbn_mobi !== ''
          )

          return isValid
        }

        return false
      },
      title () {
        return (this.edit ? 'Editando' : 'Novo') + ' mangá'
      }
    },
    created () {
      // Get available publishers.
      this.fetchPublishers()
      // Check if have digital edition from manga.
      if (this.mangaData.digital_edition) {
        this.digitalEdition = this.mangaData.digital_edition
      }
      // Check if digital edition is valid.
      this.haveDigitalEdition = this.digitalEditionValid
    },
    data () {
      return {
        haveDigitalEdition: false,
        digitalEdition: {
          format: '',
          price: 0,
          available_at: '',
          isbn_epub: '',
          isbn_mobi: ''
        },
        publishers: [],
        labels: [],
        ageRatings: [
          'Livre',
          '10 anos',
          '12 anos',
          '14 anos',
          '16 anos',
          '18 anos'
        ],
        mangaData: this.manga
      }
    },
    methods: {
      clearFields () {
        this.mangaData = {
          id: '',
          publisher: {
            code: 1,
            name: 'Editora JBC',
            label: ''
          },
          name: '',
          date: '',
          subtitle: '',
          synopsis: '',
          volume: -1,
          authors: '',
          page_number: 0,
          age_rating: 'Livre',
          paper_edition: {
            format: '',
            price: 0,
            isbn: ''
          },
          cover_url: '',
          header_url: '',
          url: ''
        }
        this.haveDigitalEdition = false
        this.digitalEdition = {
          format: '',
          price: 0,
          available_at: '',
          isbn_epub: '',
          isbn_mobi: ''
        }
      },
      closeModal () {
        this.$refs.mangaForm.hide()
      },
      deleteManga () {
        this.$emit('submit-delete', this.mangaData)
        this.closeModal()
      },
      fetchPublishers () {
        this.$http.get('https://alessandrojean.github.io/manga-checklists-data/publishers/publishers.json')
          .then(response => {
            this.publishers = response.data.br
            this.labels = this.publishers[0].publishing_labels
          })
          .catch(e => console.error(e))
      },
      onChange (value) {
        this.mangaData.publisher.name = this.publishers[value - 1].name
        this.labels = this.publishers[value - 1].publishing_labels

        // Clear old label.
        this.mangaData.publisher.label = ''

        // If have only one label, select it.
        if (this.labels.length === 1) {
          this.mangaData.publisher.label = this.labels[0]
        }
      },
      handleSubmit (event) {
        event.preventDefault()

        if (this.haveDigitalEdition && this.digitalEditionValid) {
          this.mangaData.digital_edition = this.digitalEdition
        } else {
          delete this.mangaData.digital_edition
        }
        // Generate the id if it's a new manga.
        if (!this.edit) {
          this.mangaData.id = shortid.generate()
        }
        // Hide the modal.
        this.$refs.mangaForm.hide()
        // Call callback.
        this.$emit(this.edit ? 'submit-update' : 'submit-new', this.mangaData)
      },
      onHidden (bvEvt) {
        // Clear all the fields.
        this.clearFields()
      },
      show (manga) {
        // Set the manga.
        this.mangaData = manga
        // Update the manga label.
        this.labels = this.publishers[manga.publisher.code - 1].publishing_labels
        // Check if have digital edition.
        if (manga.digital_edition) {
          this.digitalEdition = manga.digital_edition
          this.haveDigitalEdition = true
        }
        // Show the modal.
        this.$refs.mangaForm.show()
      }
    },
    props: {
      manga: {
        type: Object,
        default () {
          return {
            id: '',
            publisher: {
              code: 1,
              name: 'Editora JBC',
              label: ''
            },
            name: '',
            date: '',
            subtitle: '',
            synopsis: '',
            volume: -1,
            authors: '',
            page_number: 0,
            age_rating: 'Livre',
            paper_edition: {
              format: '',
              price: 0,
              isbn: ''
            },
            cover_url: '',
            header_url: '',
            url: ''
          }
        }
      },
      edit: {
        type: Boolean,
        default () {
          return false
        }
      }
    }
  }
</script>

<style>
  .card-text p:last-of-type {
    margin-bottom: 0;
  }
</style>
