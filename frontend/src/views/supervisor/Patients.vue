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
      v-if="patients"
      :headers="headers"
      :items="patients"
      :search="search"
    >
      <template v-slot:item="row">
        <router-link
          tag="tr"
          :to="{
            name: 'viewPatient',
            params: {
              patientId: row.item.id
            }
          }">
          <td>{{row.item.firstName}}</td>
          <td>{{row.item.lastName}}</td>
          <td>{{row.item.email}}</td>
          <td>{{row.item.phoneNumber}}</td>
          <td>{{row.item.age}}</td>
          <td>{{row.item.city}}</td>
          <td>{{row.item.clinicalTrialId}}</td>
          <td>
              <v-btn
                elevation="1"
                width="3.5vh"
                height="3.5vh"
                class="mx-2"
                fab
                small
                :to="{
                  name: 'viewPatient',
                  params: {
                    patientId: row.item.id
                  }
                }">
                  <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
          </td>
        </router-link>
      </template>
    </v-data-table>
    <v-data-table
      v-if="!patients"
      item-key="name"
      class="elevation-1"
      loading
      loading-text="Loading... Please wait"></v-data-table>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '../../services/UserService'

export default {
  data () {
    return {
      user: {},
      patients: [],
      search: '',
      headers: [
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phoneNumber' },
        { text: 'Age', value: 'age' },
        { text: 'City', value: 'city' },
        { text: 'Clinical Trial ID', value: 'trialId' },
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

    function calculateAge (birthday) {
      var d = new Date(birthday)
      var ageDifMs = Date.now() - d.getTime()
      var ageDate = new Date(ageDifMs)
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    }

    for (var i = 0; i < this.patients.length; i++) {
      this.patients[i]['age'] = calculateAge(this.patients[i].birthDate)
    }
  }
}
</script>

<style scoped>

</style>
