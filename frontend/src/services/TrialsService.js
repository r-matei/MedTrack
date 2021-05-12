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
  }
}
