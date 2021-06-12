const { Message } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.params.userId
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            {
              userId: userId
            },
            {
              to: userId
            }
          ]
        }
      })
      res.send(messages)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the messages'
      })
    }
  }
}