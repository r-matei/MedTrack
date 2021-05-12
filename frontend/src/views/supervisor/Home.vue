<template>
  <v-row justify="center" align="center" class="ma-0">
    <!-- content -->
    <v-col cols="9" class="pa-0">
      <v-card
        color="#F6FAFD"
        height="100vh"
        elevation="0"
        class="bradius ma-0 pa-0">
        <!-- welcome -->
        <v-row class="ma-0">
          <v-col cols="6" class="pa-5">
            <v-card width="70vh" class="mx-16 mt-16 pa-0 rounded-xl" elevation="2">
              <v-row class="ma-0 pa-0">
                <v-col cols="3" align-self="start" class="ma-0 pa-0">
                  <v-img height="15vh" class="pic" contain :src="img.url" :alt="img.alt"></v-img>
                </v-col>
                <v-col cols="9" class="ma-0 pa-0">
                  <v-card-text class="font-weight-bold text-h6">Welcome, Dr.{{ user.firstName }}</v-card-text>
                  <v-card-content class="ml-4">Have a nice day at work</v-card-content>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <!-- info cards -->
        <v-row class="ma-0 pa-5">
          <!-- patients number -->
          <v-card
            width="15vh"
            height="17vh"
            class="ml-16 pa-5 rounded-xl"
            elevation="2"
            align="center">
            <v-icon large color="rgb(44, 44, 44)" class="mb-2">mdi-account-multiple</v-icon>
            <br>
            <v-text class="font-weight-bold text-h6">Patients</v-text>
            <br>
            <v-text class="font-weight-regular text-h6">{{ patients.length }}</v-text>
          </v-card>
          <!-- trials number -->
          <v-card
            width="15vh"
            height="17vh"
            class="ml-16 pa-5 rounded-xl"
            elevation="2"
            align="center">
            <v-icon large color="rgb(44, 44, 44)" class="mb-2">mdi-medical-bag</v-icon>
            <br>
            <v-text class="font-weight-bold text-h6">Trials</v-text>
            <br>
            <v-text class="font-weight-regular text-h6">{{ trials.length }}</v-text>
          </v-card>
          <!-- appointments number -->
          <v-card
            width="15vh"
            height="17vh"
            class="ml-16 py-5 rounded-xl"
            elevation="2"
            align="center">
            <v-icon large color="rgb(44, 44, 44)" class="mb-2">mdi-calendar-multiple-check</v-icon>
            <br>
            <v-text class="font-weight-bold text-h6">Appointments</v-text>
            <br>
            <v-text class="font-weight-regular text-h6">{{ appointmentsNr }}</v-text>
          </v-card>
        </v-row>
        <!-- Online chat -->
        <v-row>
          <v-card width="80vh" height="40vh" class="mx-16 mt-16 pa-0 rounded-xl" elevation="2">
            <v-card-title>
                <img width="35vh" class="ma-2" :src="chatImage.url" :alt="chatImage.alt">
                <p class="text-h5 font-weight-bold text-color ma-2">Online chat</p>
              </v-card-title>
          </v-card>
        </v-row>
      </v-card>
    </v-col>
    <!-- user info -->
    <v-col cols="3" class="pa-0">
      <v-navigation-drawer
        right
        height="100vh"
        width="auto"
        ma-0
        floating
      >
        <template v-slot:prepend>
          <v-list-item two-line class="ma-5">
            <v-list-item-avatar height="7vh" width="auto">
              <img :src="require('../../assets/Pictures/' + user.img)">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-h5">{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
              <v-list-item-subtitle class="text-size">{{ user.birthDate }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <p class="font-weight-bold text-subtitle-1 ml-5">This week's appointments</p>
        <!-- appointments -->
        <v-row v-for="pair in pairs" :key="pair.date">
          <v-list-item two-line class="mx-5 mt-5">
              <v-list-item-avatar>
                <v-img :src="require('../../assets/Pictures/' + pair.patient.img)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-bold text-subtitle-1">{{ pair.patient.firstName }} {{ pair.patient.lastName }}</v-list-item-title>
                <v-list-item-subtitle class="text-size">{{ pair.date }} - {{ pair.time }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-row justify="center">
              <v-btn
                color="#76C6D1"
                dark
                absolute
                bottom
                align-center
                class="ma-16"
                @click="reportTab = !reportTab">
                <v-icon>mdi-plus</v-icon>
                Add Report
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-navigation-drawer>
      <!-- add report overlay -->
      <v-overlay
        :z-index="zIndex"
        :value="reportTab">
        <v-card
          height="45vh"
          width="60vh"
          color="white"
          >
          <v-btn
            fab
            @click="reportTab = false"
            icon
            absolute
            right>
              <v-icon color="grey">mdi-close-circle-outline</v-icon>
            </v-btn>
            <v-card-title class="pa-10 grey--text text-subtitle">Complete the report details</v-card-title>
            <v-text-field
              class="mt-3 grey--text px-10"
              v-model="report.userId"
              label="Patient email"
              required
              light
              :rules="[required]">
            </v-text-field>
            <v-text-field
              class="mt-3 grey--text px-10"
              v-model="report.title"
              label="Report title"
              required
              light
              :rules="[required]">
            </v-text-field>
            <v-file-input
              class="pr-10 pl-2"
              light
              label="Report file (.pdf)"
              v-model="report.link"
              required
              :rules="[required]"
              truncate-length="40"></v-file-input>
            <div class="text-error px-10" v-html="error"/>
            <v-btn
              color="#76C6D1"
              dark
              absolute
              right
              align-center
              class="mx-4 mb-4"
              @click="addReport">
              <v-icon>mdi-plus</v-icon>
              Add
            </v-btn>
        </v-card>
      </v-overlay>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '../../services/UserService'
import AppointmentService from '../../services/AppointmentService'
import TrialsService from '../../services/TrialsService'
import ReportsService from '../../services/ReportsService'

export default {
  data () {
    return {
      img: {
        url: require('../../assets/supervisor-home.png'),
        alt: 'Illustration'
      },
      chatImage: {
        url: require('../../assets/chat.png'),
        alt: 'Icon'
      },
      user: {},
      appointments: [],
      patients: [],
      selectedPatients: [],
      trials: [],
      appointmentsNr: '',
      reportTab: false,
      report: {
        title: '',
        link: '',
        userId: ''
      },
      error: '',
      required: (value) => !!value || 'Required.',
      found: 0
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ]),
    pairs () {
      return this.selectedPatients.map((patient, i) => {
        var d = new Date(this.appointments[i].date)

        return {
          patient: patient,
          date: d.toDateString(),
          time: d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'})
        }
      })
    }
  },
  async mounted () {
    this.user = (await UserService.show()).data

    this.appointments = (await AppointmentService.show()).data
    this.patients = (await UserService.showPatients()).data
    this.trials = (await TrialsService.show()).data
    this.appointmentsNr = this.appointments.length

    var startDate = new Date()
    startDate.setDate(startDate.getDate())

    var endDate = new Date()
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()) % 7)

    var id = this.user.id
    this.appointments = this.appointments.filter(function (a) {
      var d = new Date(a.date)
      return ((d >= startDate && d <= endDate) && (a.supervisorId === id))
    })

    for (let i = 0; i < this.appointments.length; i++) {
      for (let j = 0; j < this.patients.length; j++) {
        if ((this.patients[j].supervisorId === this.user.id) && (this.appointments[i].userId === this.patients[j].id)) {
          let patientInfo = (({firstName, lastName, img}) => ({firstName, lastName, img}))(this.patients[j])
          this.selectedPatients.push(patientInfo)
        }
      }
    }
  },
  methods: {
    async addReport () {
      this.error = null

      const areAllFieldsFilledIn = Object
        .keys(this.report)
        .every(key => !!this.report[key])

      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      for (var i = 0; i < this.patients.length; i++) {
        if (this.patients[i].email === this.report.userId) {
          this.report.userId = this.patients[i].id
          this.found = 1
        }
      }

      if (this.found === 0) {
        this.error = 'The patient email is not valid'
        return
      }

      this.report.size = this.report.link.size
      this.report.link = '../assets/Reports/' + this.report.link.name
      try {
        await ReportsService.post(this.report)
        this.reportTab = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.bk-color {
  background-color: #76C6D1;
}

.bradius {
  border-radius: 10vh 0 0 10vh;
}

.text-size {
  font-size: 1.5vh;
}

.text-color {
  color:rgb(80, 80, 80);
}

.healthGraphic {
  margin-top: 7vh;
}

.centerBtn {
  margin: 5vh;
}

.text-error {
  color: red;
}

</style>
