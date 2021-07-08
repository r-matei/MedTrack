import Api from '@/services/Api'

export default {
  // api pentru înregistrarea unui utilizator nou
  register (credentials) {
    return Api().post('register', credentials)
  },

  // api pentru logarea unui utilizator
  login (credentials) {
    return Api().post('login', credentials)
  }
}
