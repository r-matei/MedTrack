<template>
  <v-row justify="center" align="center" fill-height class="ma-0">
    <v-col cols="4" class="pa-0">
      <v-card color="#76C6D1" height="101vh" dark class="ma-0 pa-0">
        <v-row class="fill-height" justify="center" align="center">
          <v-card-title class="text-h4 font-weight-medium">
            Formular date personale
          </v-card-title>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="8" class="pa-0">
      <v-stepper v-model="e1" class="ma-16">
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
            color="#76C6D1"
          >
            Încarcă o poză
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            step="2"
            color="#76C6D1"
          >
            Informații personale
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <!-- load photo -->
            <v-card
              class="mb-12"
              outlined
              height="50vh"
              align="center"
              @dragover.prevent
              @drop.prevent
            >
              <div class="container-load" @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop" v-bind:style="{ 'background-color': color }">
                <v-img
                  :src="loadImg.url"
                  width="30vh"
                  class="my-4"></v-img>
                  Plasează aici o poză pentru a încărca
                  <br>
                  sau
                  <div class="file-wrapper">
                    <input type="file" name="file-input" @change="handleFileInput" > Selectează o poză de profil
                  </div>
                  <ul>
                    <li v-for="(file, index) in files" :key="index">
                      {{ file.name }} ({{ file.size }} b)
                      <button @click="removeFile(index)" title="Remove">Șterge</button>
                    </li>
                  </ul>
                </div>
            </v-card>
            <v-row no-gutters>
              <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex" cols="2" align-end>
                <v-btn
                  color="#76C6D1" dark block
                  @click="e1 = 2"
                >
                  Continuă
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2">
            <!-- personal info -->
            <v-card
              class="mb-12 scroll-y"
              color="white"
              height="50vh"
              elevation="0"
            >
              <v-text-field
                class="mt-3"
                v-model="user.phoneNumber"
                label="Telefon"
                required
                :rules="[required]"></v-text-field>
              <v-menu
                v-model="fromDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
              >
                <template v-slot:activator="{ on }">
                <v-text-field
                  label="Data nașterii"
                  readonly
                  :value="fromDateDisp"
                  v-on="on"
                  required
                  :rules="[required]"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="en-in"
                  v-model="user.birthDate"
                  no-title
                  @input="fromDateMenu = false"
                ></v-date-picker>
              </v-menu>
              <v-row>
                <v-col
                  cols="12"
                  sm="6">
                  <country-select class="country-select" :countryName="countryName" v-model="user.state" :country="user.state" topCountry="US" />
                </v-col>
                <v-col
                  cols="12"
                  sm="6">
                  <region-select class="country-select" :countryName="countryName" :regionName="countryName" v-model="user.city" :country="user.state" :region="user.city" />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6">
                  <v-text-field
                    class="mt-3"
                    v-model="user.street"
                    required
                    :rules="[required]"
                    label="Stradă"></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6">
                  <v-text-field
                    class="mt-3"
                    v-model="user.zipcode"
                    required
                    :rules="[required]"
                    label="Cod poștal"></v-text-field>
                </v-col>
              </v-row>
              <v-select
                v-model="trialName"
                :items="trialsName"
                label="Studiu Clinic"
                dense
                required
                :rules="[required]"
              ></v-select>
            </v-card>
            <div class="text-error align-end-error" v-html="error"/>
            <v-row no-gutters>
              <v-col cols="2" align-start>
                <v-btn
                  color="#76C6D1" dark block
                  @click="e1 = 1"
                >
                  Înapoi
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2" align-end>
                <v-btn color="#76C6D1" dark block
                  @click="upload">
                  Finalizare
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '../../services/UserService'
import TrialsService from '../../services/TrialsService'

export default {
  data () {
    return {
      trials: [],
      trialsName: [],
      loadImg: {
        url: require('../../assets/load.png')
      },
      fromDateMenu: false,
      files: [],
      color: '#f4f5f5',
      e1: 1,
      user: {},
      agree: false,
      countryName: true,
      error: null,
      required: (value) => !!value || 'Obligatoriu.',
      trialName: []
    }
  },
  async mounted () {
    try {
      this.user = (await UserService.show()).data
    } catch (err) {
      console.log(err)
    }

    try {
      this.trials = (await TrialsService.show()).data
    } catch (err) {
      console.log(err)
    }

    for (var i = 0; i < this.trials.length; i++) {
      this.trialsName.push(this.trials[i].title)
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ]),
    fromDateDisp () {
      return this.user.birthDate
    }
  },
  methods: {
    handleFileDrop (e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return
      ([...droppedFiles]).forEach(f => {
        this.files.push(f)
        this.user.img = f.name
      })
      this.color = '#f4f5f5'
    },
    handleFileInput (e) {
      let files = e.target.files
      files = e.target.files
      if (!files) return
      ([...files]).forEach(f => {
        this.files.push(f)
        this.user.img = f.name
      })
    },
    removeFile (fileKey) {
      this.files.splice(fileKey, 1)
    },
    fileDragIn () {
      this.color = 'white'
    },
    fileDragOut () {
      this.color = '#f4f5f5'
    },
    async upload () {
      this.error = null
      this.user.type = 'supervisor'

      if (this.files.length === 0) {
        this.error = 'Vă rugăm să încărcați o poză de profil.'
        return
      }

      for (var i = 0; i < this.trials.length; i++) {
        if (this.trialName === this.trials[i].title) {
          this.user.clinicalTrialId = this.trials[i].id
        }
      }

      if (this.user.phoneNumber === '' ||
          this.user.birthDate === '' ||
          this.user.state === '' ||
          this.user.city === '' ||
          this.user.street === '' ||
          this.user.zipcode === '' ||
          this.user.clinicalTrialId === '') {
        this.error = 'Vă rugăm să completați toate câmpurile obligatorii.'
        return
      }

      try {
        await UserService.put(this.user)
        this.$router.push('/supervizor/acasa-supervizor')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
main {
  margin-top: 30px;
  height: 100%;
}
.container-load {
  border: 2px dashed #76C6D1;
  height: 50vh;
}

.scroll-y {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
}

select {
  border: 1px solid transparent;
  width: 50vh;
  border-color: transparent transparent rgb(48, 48, 48) transparent;
}

.file-wrapper {
  text-align: center;
  width: 20vh;
  border-radius: 1vh;
  height: 7vh;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  overflow: hidden;
  font-size: 2vh;
  background: rgb(255, 255, 255); /* and other things to make it pretty */
}

.file-wrapper input {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    opacity: 0.0;
    filter: alpha(opacity=0);
    font-size: 300px;
    height: 200px;
}

ul {
  list-style-type: none;
}

.align-end {
  position: absolute;
  right: 10vh;
}

.text-error {
  color: red;
}

.align-end-error {
  position: absolute;
  right: 3vh;
  bottom: 7vh;
}

</style>
