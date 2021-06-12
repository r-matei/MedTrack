import Api from '@/services/Api'

export default {
  // show looged user info
  show () {
    return Api().get('userInfo')
  },
  // update logged user info
  put (user) {
    return Api().put('userInfo', user)
  },
  // get all patients
  showPatients () {
    return Api().get('patients')
  },
  // get all supervisors
  showSupervisors () {
    return Api().get('supervisors')
  },
  // show id user
  showUser (userId) {
    return Api().get(`user/${userId}`)
  },

  // show patients for reports
  patientsForReports () {
    return Api().get('patientsForReports')
  },

  // delete patient by id
  delete (patientId) {
    return Api().delete(`deletePatient/${patientId}`)
  }
}
