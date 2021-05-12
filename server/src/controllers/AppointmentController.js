const {Appointment} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      var appointment
      const userId = req.user.id
      const userType = req.user.type
      if (userType === 'patient') {
        appointment = await Appointment.findAll({
          where: {
            userid: userId
          }
        })
      } else if (userType === 'supervisor') {
        appointment = await Appointment.findAll({
          where: {
            supervisorId: userId
          }
        })
      }
      res.send(appointment)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient informations'
      })
    }
  },
  async show (req, res) {
    try {
      const appointment = await Appointment.findAll()
      res.send(appointment)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient informations'
      })
    }
  },
  async post (req, res) {
    try {
      const appointment = await Appointment.create(req.body)
      res.send(appointment)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create this report'
      })
    }
  }
}
