import Api from '@/services/Api'

export default {
  // get logged patient's results
  index () {
    return Api().get('patientResults')
  },

  post (results) {
    return Api().post('addResults', results)
  }
}
