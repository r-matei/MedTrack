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
  // show id patient
  showPatient (patientId) {
    return Api().get(`patient/${patientId}`)
  }
}
