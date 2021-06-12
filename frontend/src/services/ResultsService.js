import Api from '@/services/Api'

export default {
  // get logged patient's results
  index () {
    return Api().get('patientResults')
  },

  // get all results
  show () {
    return Api().get('allResults')
  },

  // add results
  post (results) {
    return Api().post('addResults', results)
  }
}
