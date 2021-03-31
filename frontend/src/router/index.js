import Vue from 'vue'
import Router from 'vue-router'
import HomePacient from '../views/HomePacient.vue'
import Login from '../views/Login.vue'
import Questionnaire from '../views/Questionnaire.vue'
import ClinicalTrials from '../views/ClinicalTrials.vue'
import Survey from '../views/Survey.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePacient
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
