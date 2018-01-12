import cheerio from 'cheerio'

export default {
  parseManga (manga, documentStr, callback) {
    const $ = cheerio.load(documentStr)
    // Checks if it's a new page template.
    if (!this.isAbleToParse($)) {
      callback(new Error("Can't parse."))
      return
    }

    manga.name = $('h1.text-center[itemprop="name"]').text().replace(/ #(\d+)/, '')
    manga.subtitle = $('em.text-center.excerpt').text()
    manga.synopsis = this.decodeEntities($('div.mb30[itemprop="description"]').html())

    this.parseEditionData($, manga)
    this.parsePaperEdition($, manga)
    this.parseDigitalEdition($, manga)
    // Get the cover url.
    manga.cover_url = manga.header_url = $('img.center-block.mb20').attr('src')
    // Check if have header.
    if ($('img.colectionHeader.mb10').length) {
      manga.header_url = $('img.colectionHeader.mb10').attr('src')
    }

    callback(null, manga)
  },
  decodeEntities (encodedString) {
    var textArea = document.createElement('textarea')
    textArea.innerHTML = encodedString
    return textArea.value
  },
  haveDigitalEdition ($) {
    return $('div.extra-info-col-half').length > 0
  },
  isAbleToParse ($) {
    return $('div.extra-info-container').length > 0
  },
  parseDigitalEdition ($, manga) {
    if (!this.haveDigitalEdition($)) {
      return
    }
    const digitalEdition = $('div.extra-info-col-half:nth-child(3) div.extra-info-col-content ul.extra-info li span')
    // Create the digital edition.
    manga.digital_edition = {}
    // Parse the format.
    manga.digital_edition.format = digitalEdition.eq(0).text()
    // Parse the price.
    const digitalEditionPrice = digitalEdition.eq(1).text()
    manga.digital_edition.price = parseFloat(digitalEditionPrice.replace(/R\$ (\d+)(,|\.)(\d+)/, '$1.$3'))
    // Parse the available at.
    manga.digital_edition.available_at = digitalEdition.eq(2).text().replace(' e ', ', ')
    // Parse the ISBN [.epub]
    manga.digital_edition.isbn_epub = digitalEdition.eq(3).text().replace(/-/g, '')
    // Parse the ISBN [.mobi]
    manga.digital_edition.isbn_mobi = digitalEdition.eq(4).text().replace(/-/g, '')
  },
  parseEditionData ($, manga) {
    const editionData = $('div.extra-info-container div.extra-info-col-full:first-of-type ul.extra-info li span')
    // Parse the volume.
    const mangaVolume = editionData.eq(0).text()
    manga.volume = mangaVolume === 'Único' ? -1 : parseInt(mangaVolume.replace(/#(\d+)/, '$1'))
    // Parse the authors.
    manga.authors = editionData.eq(1).text().replace(' e ', ', ')
    // Parse the page number.
    const mangaPageNumber = editionData.eq(2).text()
    manga.page_number = parseInt(mangaPageNumber.replace(/(\d+)/, '$1'))
    // Parse the age rating.
    manga.age_rating = editionData.eq(3).text()
  },
  parsePaperEdition ($, manga) {
    const initialSelector = this.haveDigitalEdition($)
      ? 'div.extra-info-col-half div.extra-info-col-content:first-of-type '
      : 'div.extra-info-col-full:nth-child(2) div.extra-info-col-content '

    const paperEdition = $(initialSelector + 'ul.extra-info li span')
    // Parse the format.
    manga.paper_edition.format = paperEdition.eq(0).text()
    // Parse the price.
    const paperEditionPrice = paperEdition.eq(1).text()
    manga.paper_edition.price = parseFloat(paperEditionPrice.replace(/R\$ (\d+)(,|\.)(\d+)/, '$1.$3'))
    // Parse the ISBN.
    manga.paper_edition.isbn = paperEdition.eq(2).text().replace(/-/g, '')
  }
}
