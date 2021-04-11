const {Patient} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignPatient (patient) {
  const ONE_WEEK = 60 * 60 * 24 * 7
   return jwt.sign(patient, config.authentication.jwtSecret, {
     expiresIn: ONE_WEEK
   })
}

module.exports = {
  async register (req, res) {
    try {
      const patient = await Patient.create(req.body)
      const patientJson = patient.toJSON()
      res.send({
        patient: patientJson,
        token: jwtSignPatient(patientJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const patient = await Patient.findOne({
        where: {
          email: email
        }
      })
      if (!patient) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
        return
      }

      const isPasswordValid = patient.comparePassword(password)
      if (!isPasswordValid) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
        return
      }

      const patientJson = patient.toJSON()
      res.send({
        patient: patientJson,
        token: jwtSignPatient(patientJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}