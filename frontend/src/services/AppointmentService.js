import Api from '@/services/Api'

export default {
  // get logged patient's appointments
  index () {
    return Api().get('patientAppointment')
  },

  // get all appointments
  show () {
    return Api().get('appointments')
  },

  // add a new appointment
  post (appointment) {
    return Api().post('addAppointment', appointment)
  },

  // delete appointment
  delete (appointmentId) {
    return Api().delete(`deleteAppointment/${appointmentId}`)
  }
}
