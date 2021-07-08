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
      path: '/pacient',
      name: 'Patient',
      component: Patient,
      children: [
        {
          path: 'acasa',
          name: 'Home',
          component: HomePatient
        },
        {
          path: 'programari',
          name: 'Patient Appointments',
          component: AppointmentsPatient
        },
        {
          path: 'medicatie',
          name: 'Medication',
          component: MedicationPatient
        }
      ]
    },
    {
      path: '/inregistrare',
      name: 'Register Patient',
      component: Register
    },
    {
      path: '/studiu/:trialId',
      name: 'trial',
      component: Trial
    },
    {
      path: '/studii-clinice',
      name: 'clinical-trials',
      component: ClinicalTrials
    },
    {
      path: '/formular',
      name: 'survey',
      component: Survey
    },
    {
      path: '/inregistrare-supervizor',
      name: 'Register Supervisor',
      component: RegisterSupervisor
    },
    {
      path: '/supervizor',
      name: 'Supervisor',
      component: Supervisor,
      children: [
        {
          path: 'acasa-supervizor',
          name: 'Supervisor Home',
          component: HomeSupervisor
        },
        {
          path: 'studii-supervizor',
          name: 'Trials',
          component: Trials
        },
        {
          path: 'studii-supervizor/:trialId',
          name: 'clinical-trial',
          component: ViewTrial
        },
        {
          path: 'pacienti-supervizor',
          name: 'Patients',
          component: Patients
        },
        {
          path: 'pacienti-supervizor/:patientId',
          name: 'viewPatient',
          component: ViewPatient
        },
        {
          path: 'programari-supervizor',
          name: 'Supervisor Appointments',
          component: AppointmentsSupervisor
        }
      ]
    },
    {
      path: '/formular-supervizor',
      name: 'Supervisor Survey',
      component: SurveySupervisor
    },
    {
      path: '*',
      redirect: 'inregistrare'
    },
    {
      path: '/rapoarte/studii-clinice',
      name: 'Clinical Trials reports',
      component: Reports
    }
  ]
})
