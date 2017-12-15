import PouchDB from 'pouchdb-react-native'
import { simplecryptor, transform } from 'simple-cryptor-pouch'
// import { transform } from 'transform-pouch'

PouchDB.plugin({
  transform,
  simplecryptor,
  // sayHello: function () {
  //   const db = this
  //   // console.log('Hello!')
  //   db.put({_id: 'hello', title: 'Hello World'})
  // },
})

class Database {
  static db = new PouchDB('localdb')
  static remote = new PouchDB('http://127.0.0.1:5984/envelope')

  static setPassword (password) {
    this.remote.simplecryptor('password', {ignore: ['madeBy', '_revisions']})
  }

  static sync () {
    // this.db.sync('http://127.0.0.1:5984/envelope', { live: true, retry: true })
    PouchDB.sync(this.db, this.remote, { live: true, retry: true })
  }
}

export default Database
