const {
  sequelize,
  User,
  ClinicalTrial,
  Medication,
  Result,
  Report,
  Appointment
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const trials = require('./trials.json')
const reports = require('./reports.json')
const results = require('./results.json')
const medications = require('./medications.json')
const appointments = require('./appointments.json')

sequelize.sync({force: true}) // {force: true} to delete all tables from database
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      trials.map(trial => {
        ClinicalTrial.create(trial)
      })
    )

    await Promise.all(
      reports.map(report => {
        Report.create(report)
      })
    )

    await Promise.all(
      results.map(result => {
        Result.create(result)
      })
    )

    await Promise.all(
      medications.map(medication => {
        Medication.create(medication)
      })
    )

    await Promise.all(
      appointments.map(appointment => {
        Appointment.create(appointment)
      })
    )
  })