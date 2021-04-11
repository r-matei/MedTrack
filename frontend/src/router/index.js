import Vue from 'vue'
import Router from 'vue-router'
import HomePatient from '../views/HomePatient.vue'
import Patient from '../views/Patient.vue'
import AppointmentsPatient from '../views/AppoinmentsPatient.vue'
import MedicationPatient from '../views/MedicationPatient.vue'
import Register from '../views/Register.vue'
import Questionnaire from '../views/Questionnaire.vue'
import ClinicalTrials from '../views/ClinicalTrials.vue'
import Survey from '../views/Survey.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/patient',
      name: 'Patient',
      component: Patient,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: HomePatient
        },
        {
          path: 'appointments',
          name: 'Appointments',
          component: AppointmentsPatient
        },
        {
          path: 'medication',
          name: 'Medication',
          component: MedicationPatient
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: Questionnaire
    },
    {
      path: '/clinical-trials',
      name: 'clinical-trials',
      component: ClinicalTrials
    },
    {
      path: '/survey',
      name: 'survey',
      component: Survey
    }
  ]
})
