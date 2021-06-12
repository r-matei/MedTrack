import Vue from 'vue'
import Router from 'vue-router'

// Patient
import HomePatient from '../views/patient/Home.vue'
import Patient from '../views/patient/Patient.vue'
import AppointmentsPatient from '../views/patient/Appoinments.vue'
import MedicationPatient from '../views/patient/Medication.vue'
import Register from '../views/patient/Register.vue'
import Trial from '../views/patient/Trial.vue'
import ClinicalTrials from '../views/patient/ClinicalTrials.vue'
import Survey from '../views/patient/Survey.vue'

// Supervisor
import RegisterSupervisor from '../views/supervisor/Register.vue'
import Supervisor from '../views/supervisor/Supervisor.vue'
import HomeSupervisor from '../views/supervisor/Home.vue'
import Trials from '../views/supervisor/Trials.vue'
import Patients from '../views/supervisor/Patients.vue'
import AppointmentsSupervisor from '../views/supervisor/Appointments.vue'
import SurveySupervisor from '../views/supervisor/Survey.vue'
import ViewTrial from '../views/supervisor/ViewTrial.vue'
import ViewPatient from '../views/supervisor/ViewPatient.vue'

// Reports
import Reports from '../views/reports/Reports.vue'

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
          name: 'Patient Appointments',
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
      name: 'Register Patient',
      component: Register
    },
    {
      path: '/trial/:trialId',
      name: 'trial',
      component: Trial
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
    },
    {
      path: '/register-supervisor',
      name: 'Register Supervisor',
      component: RegisterSupervisor
    },
    {
      path: '/supervisor',
      name: 'Supervisor',
      component: Supervisor,
      children: [
        {
          path: 'supervisor-home',
          name: 'Supervisor Home',
          component: HomeSupervisor
        },
        {
          path: 'trials',
          name: 'Trials',
          component: Trials
        },
        {
          path: 'trials/:trialId',
          name: 'clinical-trial',
          component: ViewTrial
        },
        {
          path: 'patients',
          name: 'Patients',
          component: Patients
        },
        {
          path: 'patients/:patientId',
          name: 'viewPatient',
          component: ViewPatient
        },
        {
          path: 'supervisor-appointments',
          name: 'Supervisor Appointments',
          component: AppointmentsSupervisor
        }
      ]
    },
    {
      path: '/survey-supervisor',
      name: 'Supervisor Survey',
      component: SurveySupervisor
    },
    {
      path: '*',
      redirect: 'register'
    },
    {
      path: '/reports/clinical-trials',
      name: 'Clinical Trials reports',
      component: Reports
    }
  ]
})
