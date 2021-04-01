import Vue from 'vue'
import Router from 'vue-router'
import HomePacient from '../views/HomePacient.vue'
import User from '../views/User.vue'
import AppointmentsPacient from '../views/AppoinmentsPacient.vue'
import MedicationPacient from '../views/MedicationPacient.vue'
import Login from '../views/Login.vue'
import Questionnaire from '../views/Questionnaire.vue'
import ClinicalTrials from '../views/ClinicalTrials.vue'
import Survey from '../views/Survey.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: HomePacient
        },
        {
          path: 'appointments',
          name: 'Appointments',
          component: AppointmentsPacient
        },
        {
          path: 'medication',
          name: 'Medication',
          component: MedicationPacient
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
