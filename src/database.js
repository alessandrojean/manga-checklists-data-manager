import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

export default {
  db: null,
  createDatabase () {
    const adapter = new LocalStorage('db')
    this.db = low(adapter)

    this.db.defaults({ checklists: [] })
           .write()
  },
  clearDatabase () {
    const newState = { checklists: [] }
    this.db.setState(newState)
    this.db.write()
  }
}
