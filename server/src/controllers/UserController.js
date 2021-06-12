const {User} = require('../models')

module.exports = {
  async show (req, res) {
    try {
      const userId = req.user.id
      const user = await User.findOne({
        where: {
          id: userId
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient informations'
      })
    }
  },
  async put (req, res) {
    try {
      const userId = req.user.id
      await User.update(req.body, {
        where: {
          id: userId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the patient data'
      })
    }
  },
  async showPatients (req, res) {
    try {
      const user = await User.findAll({
        where: {
          type: 'patient'
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patients'
      })
    }
  },
  async showSupervisors (req, res) {
    try {
      const user = await User.findAll({
        where: {
          type: 'supervisor'
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the supervisors'
      })
    }
  },
  async showUser (req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the patient'
      })
    }
  },
  async delete (req, res) {
    try {
      const user = await User.findByPk(req.params.patientId)
      await user.destroy()
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete this appointment'
      })
    }
  }
}
