import PouchDB from 'pouchdb-react-native'
import { simplecryptor, transform } from 'simple-cryptor-pouch'
// import { transform } from 'transform-pouch'

PouchDB.plugin({
  transform,
  simplecryptor,
})

class Database {
  static db = new PouchDB('localdb')
  // static remote = new PouchDB('http://127.0.0.1:5984/envelope')

  // not used yet
  static setPassword (password) {
    this.remote.simplecryptor(password, {ignore: ['madeBy', '_revisions']})
  }

  // not used yet
  static sync () {
    PouchDB.sync(this.db, this.remote, { live: true, retry: true })
  }
}

export default Database
