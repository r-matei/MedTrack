<template>
  <v-card
    class="pa-10"
    height="100vh">
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
            name: 'trial',
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
                  name: 'trial',
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
      ]
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
  }
}
</script>

<style scoped>

</style>
