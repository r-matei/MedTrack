<template>
  <v-container fill-height>
    <v-row justify="center" align="center" class="pa-0 ma-0">
      <v-card
        height="80vh"
        width="150vh"
        align="start"
        class="bradius pa-16 scroll-y"
        outlined
        >
          <v-text class="pa-4 font-weight-bold text-h4">{{ patient.firstName }} {{ patient.lastName }}</v-text>
          <div style="display: inline; position: absolute; right: 20px;">
            <v-btn
              color="#76C6D1"
              dark
              align-center
              class="justify-end"
              @click="deleteTab = true">
              Șterge pacient
            </v-btn>
            <v-btn
              color="#76C6D1"
              dark
              align-center
              class="mx-5 justify-end"
              @click="resultsTab = !resultsTab">
              <v-icon>mdi-plus</v-icon>
              Adaugă rezultate
            </v-btn>
          </div>
          <br>
          <v-text class="pa-4 font-weight-regular text-h7">Studiu clinic: {{ trial.title }}</v-text>

          <v-card-text class="mt-6 mb-3 font-weight-bold text-h6">Informații generale</v-card-text>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Data nașterii</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.birthDate }}</v-text>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Vârstă</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.age }}</v-text>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Sex</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.age }}</v-text>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Grupă sanguină</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.bloodType }}</v-text>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Înălțime</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.height }} cm</v-text>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Greutate</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.weight }} kg</v-text>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Naționalitate</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.state }}</v-text>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Adresă</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.city }}, {{ patient.street }}</v-text>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-4">
            <v-text class="font-weight-regular text-h7">Cod poștal</v-text>
            <v-spacer></v-spacer>
            <v-text class="font-weight-regular text-h7">{{ patient.zipcode }}</v-text>
          </v-row>
          <v-divider></v-divider>
        </v-card>
        <v-overlay
          :z-index="zIndex"
          :value="resultsTab">
          <v-card
            height="60vh"
            width="60vh"
            color="white"
            >
            <v-btn
              fab
              @click="resultsTab = false"
              icon
              absolute
              right>
                <v-icon color="grey">mdi-close-circle-outline</v-icon>
              </v-btn>
              <v-card-title class="pa-10 grey--text text-subtitle">Completați detaliile rezultatelor</v-card-title>
              <v-text-field
                class="mt-3 grey--text px-10"
                v-model="results.title"
                label="Titlu"
                required
                light
                :rules="[required]">
              </v-text-field>
              <v-textarea
                class="mt-3 grey--text px-10"
                v-model="results.text"
                label="Descriere"
                required
                light
                :rules="[required]">
              </v-textarea>
              <v-text-field
                class="mt-3 grey--text px-10"
                v-model="results.healthCoef"
                label="Coeficient de sănătate"
                required
                light
                :rules="[required]">
              </v-text-field>
              <div class="text-error px-10" v-html="error"/>
              <v-btn
                color="#76C6D1"
                dark
                absolute
                right
                align-center
                class="mx-4 mb-4"
                @click="addResults">
                <v-icon>mdi-plus</v-icon>
                Adaugă
              </v-btn>
          </v-card>
        </v-overlay>
        <v-overlay
          :z-index="zIndex"
          :value="deleteTab">
          <v-card
            height="30vh"
            width="60vh"
            color="white"
            align="center"
            class="pt-15"
            >
              <p class="tab-text">Sigur doriți să ștergeți acest pacient?</p>
              <v-btn
                color="#76C6D1"
                dark
                absolute
                left
                align-center
                class="mx-15 my-4"
                @click="deletePatient()">
                Da
              </v-btn>
              <v-btn
                color="#76C6D1"
                dark
                absolute
                right
                align-center
                class="mx-15 my-4"
                @click="deleteTab = false">
                Nu
              </v-btn>
          </v-card>
        </v-overlay>
      </v-row>
  </v-container>
</template>

<script>
import UserService from '../../services/UserService'
import ResultsService from '../../services/ResultsService'
import TrialsService from '../../services/TrialsService'

import {mapState} from 'vuex'

export default {
  data () {
    return {
      patient: {},
      trial: {},
      resultsTab: false,
      error: '',
      required: (value) => !!value || 'Obligatoriu.',
      results: {
        userId: '',
        title: '',
        text: '',
        healthCoef: '',
        date: ''
      },
      deleteTab: false
    }
  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  async mounted () {
    const patientId = this.route.params.patientId
    this.patient = (await UserService.showUser(patientId)).data
    this.trial = (await TrialsService.showTrial(this.patient.clinicalTrialId)).data

    function calculateAge (birthday) {
      var d = new Date(birthday)
      var ageDifMs = Date.now() - d.getTime()
      var ageDate = new Date(ageDifMs)
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    }

    this.patient['age'] = calculateAge(this.patient.birthDate)
  },
  methods: {
    async addResults () {
      this.error = null

      this.results.userId = this.patient.id
      var date = new Date()
      this.results.date = date.getTime()

      const areAllFieldsFilledIn = Object
        .keys(this.results)
        .every(key => !!this.results[key])

      if (!areAllFieldsFilledIn) {
        this.error = 'Vă rugăm să completați toate câmpurile obligatorii.'
        return
      }
      try {
        await ResultsService.post(this.results)
        this.resultsTab = false
      } catch (err) {
        console.log(err)
      }
    },
    async deletePatient () {
      try {
        await UserService.delete(this.patient.id)
        this.deleteTab = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.bradius {
  border-radius: 5vh;
}

.scroll-y {
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

::-webkit-scrollbar {
  display: none;
}

.text-error {
  color: red;
}

.tab-text {
  color: #616161;
  margin-bottom: 10vh;
}
</style>
