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
      const trial = await ClinicalTrial.findAll({
        where: {
          status: 'active'
        }
      })
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
  },
  async delete (req, res) {
    try {
      const trial = await ClinicalTrial.findByPk(req.params.trialId)
      await trial.destroy()
      res.send(trial)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete this appointment'
      })
    }
  },
  async post (req, res) {
    try {
      const trial = await ClinicalTrial.create(req.body)
      res.send(trial)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create this appointment'
      })
    }
  }
}
