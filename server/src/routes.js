const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const UserController = require('./controllers/UserController')
const ResultsController = require('./controllers/ResultsController')
const ReportsController = require('./controllers/ReportsController')
const TrialsController = require('./controllers/TrialsController')
const MedicationController = require('./controllers/MedicationController')
const AppointmentController = require('./controllers/AppointmentController')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/userInfo',
    isAuthenticated,
    UserController.show)

  app.put('/userInfo',
    isAuthenticated,
    UserController.put)

  app.get('/patientResults',
    isAuthenticated,
    ResultsController.index)

  app.get('/patientReports',
    isAuthenticated,
    ReportsController.index)

  app.get('/patientTrial',
    isAuthenticated,
    TrialsController.index)

  app.get('/showTrials',
    isAuthenticated,
    TrialsController.show)

  app.get('/patientMedication',
    isAuthenticated,
    MedicationController.index)

  app.get('/patientAppointment',
    isAuthenticated,
    AppointmentController.index)
    
  app.get('/patients',
    isAuthenticated,
    UserController.showPatients)

  app.get('/appointments',
    isAuthenticated,
    AppointmentController.show)
  
  app.post('/addReport',
    ReportsController.post)

  app.post('/addResults',
    ResultsController.post)

  app.get('/patient/:patientId',
    UserController.showPatient)

  app.get('/trial/:trialId',
    TrialsController.showTrial)
  
  app.post('/addAppointment',
    AppointmentController.post)
}
