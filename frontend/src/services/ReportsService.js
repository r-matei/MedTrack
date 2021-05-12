import Api from '@/services/Api'

export default {
  // get logged patient's reports
  index () {
    return Api().get('patientReports')
  },

  post (report) {
    return Api().post('addReport', report)
  }
}
