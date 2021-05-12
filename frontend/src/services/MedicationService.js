import Api from '@/services/Api'

export default {
  // get logged patient's medication
  index () {
    return Api().get('patientMedication')
  }
}
