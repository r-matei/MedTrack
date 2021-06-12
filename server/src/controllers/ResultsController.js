const {Result} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const results = await Result.findAll({
        where: {
          userId: userId
        }
      })
      res.send(results)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient informations'
      })
    }
  },
  async post (req, res) {
    try {
      const result = await Result.create(req.body)
      res.send(result)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create this report'
      })
    }
  },
  async show (req, res) {
    try {
      const results = await Result.findAll()
      res.send(results)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show results'
      })
    }
  },
}
