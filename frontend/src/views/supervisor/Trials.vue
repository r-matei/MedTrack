<template>
  <v-card
    class="pa-10"
    height="100vh">
    <div style="display: block; text-align: end;">
      <v-btn
        color="#76C6D1"
        dark
        align-center
        @click="addTrialTab = true">
        Add trial
      </v-btn>
    </div>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-if="trials"
      :headers="headers"
      :items="trials"
      :search="search"
    >
      <template v-slot:item="row">
        <router-link
          tag="tr"
          :to="{
            name: 'clinical-trial',
            params: {
              trialId: row.item.id
            }
          }">
          <td>{{row.item.title}}</td>
          <td>{{row.item.phase}}</td>
          <td>{{row.item.patientsNr}}</td>
          <td>{{row.item.status}}</td>
          <td>
              <v-btn
                elevation="1"
                width="3.5vh"
                height="3.5vh"
                class="mx-2"
                fab
                small
                :to="{
                  name: 'clinical-trial',
                  params: {
                    trialId: row.item.id
                  }
                }">
                  <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
          </td>
        </router-link>
      </template>
    </v-data-table>
    <v-data-table
      v-if="!trials"
      item-key="name"
      class="elevation-1"
      loading
      loading-text="Loading... Please wait"></v-data-table>
    <v-row class="fill-height">
      <v-overlay
        :z-index="zIndex"
        :value="addTrialTab">
        <v-card
          height="90vh"
          width="60vh"
          color="white"
          >
          <v-btn
            fab
            @click="addTrialTab = false"
            icon
            absolute
            right>
              <v-icon color="grey">mdi-close-circle-outline</v-icon>
            </v-btn>
            <v-card-title class="pa-10 grey--text text-subtitle">Complete the trial details</v-card-title>
            <v-text-field
              class="mt-3 grey--text px-10"
              v-model="newTrial.title"
              label="Trial title"
              required
              light
              :rules="[required]">
            </v-text-field>
            <v-select
              v-model="newTrial.phase"
              :items="trialPhases"
              menu-props="auto"
              label="Phase"
              class="mt-3 grey--text px-10"
              hide-details
              single-line
              required
              light
              :rules="[required]">
            </v-select>
            <v-textarea
              class="mt-3 grey--text px-10"
              v-model="newTrial.description"
              label="Description"
              required
              light
              :rules="[required]">
            </v-textarea>
            <v-text-field
              class="mt-3 grey--text px-10"
              v-model="newTrial.adverseEffects"
              label="Adverse effects"
              required
              light
              :rules="[required]">
            </v-text-field>
            <v-text-field
              class="mt-3 grey--text px-10"
              v-model="supervisorEmail"
              label="Supervisor email"
              required
              light
              :rules="[required]">
            </v-text-field>
            <v-textarea
              class="mt-3 grey--text px-10"
              v-model="newTrial.requirements"
              label="Requirements (please add # before each requirement)"
              required
              light
              :rules="[required]">
            </v-textarea>
            <div class="text-error px-10" v-html="error"/>
            <v-btn
              color="#76C6D1"
              dark
              absolute
              right
              align-center
              class="mx-4 mb-4"
              @click="addTrial">
              <v-icon>mdi-plus</v-icon>
              Add
            </v-btn>
        </v-card>
      </v-overlay>
    </v-row>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '../../services/UserService'
import TrialsService from '../../services/TrialsService'

export default {
  data () {
    return {
      user: {},
      patients: [],
      search: '',
      trials: [],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Current Phase', value: 'phase' },
        { text: 'Patients Number', value: 'patientsNr' },
        { text: 'Status', value: 'status' },
        { text: 'Details', value: '' }
      ],
      addTrialTab: false,
      newTrial: {
        title: '',
        phase: '',
        description: '',
        adverseEffects: '',
        supervisorId: '',
        status: '',
        link: '',
        requirements: ''
      },
      trialPhases: ['I', 'II', 'III', 'IV'],
      supervisorEmail: '',
      supervisors: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    this.user = (await UserService.show()).data

    this.patients = (await UserService.showPatients()).data
    this.supervisors = (await UserService.showSupervisors()).data
    this.trials = (await TrialsService.show()).data

    var p = this.patients
    function getTrialPatients (id) {
      var nr = 0
      for (var i = 0; i < p.length; i++) {
        if (p[i].clinicalTrialId === id) {
          console.log('here')
          nr++
        }
      }
      return nr
    }

    for (var i = 0; i < this.trials.length; i++) {
      this.trials[i]['patientsNr'] = getTrialPatients(this.trials[i].id)
    }
  },
  methods: {
    async addTrial () {
      for (var i = 0; i < this.supervisors.length; i++) {
        if (this.supervisors[i].email === this.supervisorEmail) {
          this.newTrial.supervisorId = this.supervisors[i].id
        }
      }
      this.newTrial.status = 'active'
      this.newTrial.link = '/trials/' + this.trials.length
      try {
        await TrialsService.post(this.newTrial)
        this.addTrialTab = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
