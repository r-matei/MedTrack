const {Report} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const reports = await Report.findAll({
        where: {
          userId: userId
        }
      })
      res.send(reports)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient reports'
      })
    }
  },
  async post (req, res) {
    try {
      const report = await Report.create(req.body)
      res.send(report)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create this report'
      })
    }
  }
}
