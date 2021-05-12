const {Medication} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const trialId = req.user.clinicalTrialId
      const medication = await Medication.findAll({
        where: {
          clinicalTrialId: trialId
        }
      })
      res.send(medication)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient informations'
      })
    }
  }
}
