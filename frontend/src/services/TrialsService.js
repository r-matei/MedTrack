import Api from '@/services/Api'

export default {
  // get logged patient's trial
  index () {
    return Api().get('patientTrial')
  },

  // get all trials
  show () {
    return Api().get('showTrials')
  },
  // show id trial
  showTrial (trialId) {
    return Api().get(`trial/${trialId}`)
  },

  // show trials for reports
  trialsForReports () {
    return Api().get('trialsForReports')
  },

  // delete a trial by id
  delete (trialId) {
    return Api().delete(`deleteTrial/${trialId}`)
  },

  // add a new trial
  post (trial) {
    return Api().post('addTrial', trial)
  }
}
