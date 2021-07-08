const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
   return jwt.sign(user, config.authentication.jwtSecret, {
     expiresIn: ONE_WEEK
   })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'Acest email este deja folosit.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password, type} = req.body
      const user = await User.findOne({
        where: {
          email: email,
          type: type
        }
      })
      if (!user) {
        res.status(403).send({
          error: 'Datele de conectare nu sunt corecte'
        })
        return
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        res.status(403).send({
          error: 'Parola nu este corectă'
        })
        return
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}