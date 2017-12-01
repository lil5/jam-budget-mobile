import PouchDB from 'pouchdb-react-native'

class Database {
  static db = new PouchDB('localdb')

  static sync () {
    this.db.sync('http://127.0.0.1:5984/envelope', { live: true, retry: true })
  }
}

export default Database
