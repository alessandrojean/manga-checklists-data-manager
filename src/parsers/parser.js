import jbcParser from './jbc-parser'

export default {
  parse (manga, documentStr, callback) {
    if (/mangasjbc\.com\.br/.test(manga.url)) {
      jbcParser.parseManga(manga, documentStr, callback)
    } else {
      callback(new Error('Parser doesn\'t exist.'))
    }
  },
  isAvailable (url) {
    return /(mangasjbc)\.com\.br/.test(url)
  }
}
