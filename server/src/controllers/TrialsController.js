const {ClinicalTrial} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const trialId = req.user.clinicalTrialId
      const trial = await ClinicalTrial.findOne({
        where: {
          id: trialId
        }
      })
      res.send(trial)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient informations'
      })
    }
  },
  async show (req, res) {
    try {
      const trial = await ClinicalTrial.findAll()
      res.send(trial)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient informations'
      })
    }
  },
  async showTrial (req, res) {
    try {
      const trial = await ClinicalTrial.findByPk(req.params.trialId)
      res.send(trial)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patients'
      })
    }
  }
}
