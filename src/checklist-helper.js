export default {
  options: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  },
  months: [
    { value: 1, text: 'Janeiro', disabled: false },
    { value: 2, text: 'Fevereiro', disabled: false },
    { value: 3, text: 'Março', disabled: false },
    { value: 4, text: 'Abril', disabled: false },
    { value: 5, text: 'Maio', disabled: false },
    { value: 6, text: 'Junho', disabled: false },
    { value: 7, text: 'Julho', disabled: false },
    { value: 8, text: 'Agosto', disabled: false },
    { value: 9, text: 'Setembro', disabled: false },
    { value: 10, text: 'Outubro', disabled: false },
    { value: 11, text: 'Novembro', disabled: false },
    { value: 12, text: 'Dezembro', disabled: false }
  ],
  getFormattedDate (month, year) {
    return this.months[month - 1].text + '/' + year
  },
  getShortDate (month, year) {
    const needPadding = month < 10
    return year + '-' + (needPadding ? '0' : '') + month
  },
  getActualDateForUpdatedAt () {
    return new Intl.DateTimeFormat('pt-BR', this.options).format(new Date())
  },
  isDigitalEditionValid (digitalEdition) {
    if (digitalEdition !== undefined) {
      const isValid = (
        digitalEdition.format !== '' ||
        digitalEdition.price !== 0 ||
        digitalEdition.available_at !== '' ||
        digitalEdition.isbn_epub !== '' ||
        digitalEdition.isbn_mobi !== ''
      )

      return isValid
    }

    return false
  },
  defaultManga: {
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
