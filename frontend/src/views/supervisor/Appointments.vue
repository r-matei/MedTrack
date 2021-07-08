<template>
  <v-row justify="center" align="center" class="ma-0">
    <v-col cols="12" class="pa-0">
      <v-card
        color="#F6FAFD"
        height="100vh"
        elevation="0"
        class="bradius ma-0 pa-0">
        <v-row class="ma-0">
          <v-col cols="12" class="pa-3">
            <p class="text-h5 font-weight-bold mt-16 mx-16">Calendar programări</p>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <!-- calendar -->
          <v-col cols="8">
            <v-card width="100vh" height="65vh" class="rounded-xl mt-10 mx-16 pa-2" elevation="2">
              <v-row class="fill-height">
                <v-col>
                  <v-sheet height="64">
                    <v-toolbar
                      flat
                    >
                      <v-btn
                        outlined
                        class="mr-4"
                        color="grey darken-2"
                        @click="setToday"
                      >
                        Astăzi
                      </v-btn>
                      <v-btn
                        fab
                        text
                        small
                        color="grey darken-2"
                        @click="prev"
                      >
                        <v-icon small>
                          mdi-chevron-left
                        </v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        text
                        small
                        color="grey darken-2"
                        @click="next"
                      >
                        <v-icon small>
                          mdi-chevron-right
                        </v-icon>
                      </v-btn>
                      <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-menu
                        bottom
                        right
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            outlined
                            color="grey darken-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <span>{{ typeToLabel[type] }}</span>
                            <v-icon right>
                              mdi-menu-down
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item @click="type = 'week'">
                            <v-list-item-title>Săptămână</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="type = 'month'">
                            <v-list-item-title>Lună</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-toolbar>
                  </v-sheet>
                  <v-sheet height="53vh">
                    <v-calendar
                      ref="calendar"
                      v-model="focus"
                      color="#76C6D1"
                      :events="events"
                      :event-color="getEventColor"
                      :type="type"
                      first-interval="7"
                      @click:event="showEvent"
                    ></v-calendar>
                    <v-menu
                      v-model="selectedOpen"
                      :close-on-content-click="false"
                      :activator="selectedElement"
                      offset-x
                    >
                      <v-card
                        color="grey lighten-4"
                        width="350px"
                        flat
                      >
                        <v-toolbar
                          :color="selectedEvent.color"
                          dark
                        >
                          <v-toolbar-title
                            v-if = "selectedEvent.startMinute > 9"
                            class="text-h6 font-weight-bold"
                            v-html="selectedEvent.name + '<br>' +
                            selectedEvent.startHour + ':' +
                            selectedEvent.startMinute + '-' +
                            selectedEvent.endHour + ':' +
                            selectedEvent.startMinute"></v-toolbar-title>
                          <v-toolbar-title
                            v-if = "selectedEvent.startMinute < 10"
                            class="text-h6 font-weight-bold"
                            v-html="selectedEvent.name + '<br>' +
                            selectedEvent.startHour + ':0' +
                            selectedEvent.startMinute + '-' +
                            selectedEvent.endHour + ':0' +
                            selectedEvent.startMinute"></v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                          <span v-html="selectedEvent.description"></span>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            text
                            color="secondary"
                            @click="selectedOpen = false"
                          >
                            Închide
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <!-- all appointments -->
          <v-col cols="4">
            <v-card width="40vh" height="65vh" class="rounded-xl mt-10 mx-10" elevation="2">
              <v-card-title>
                <v-icon large>mdi-calendar-check</v-icon>
                <p class="text-h5 font-weight-bold text-color ma-2">Toate programările</p>
              </v-card-title>
              <v-card
                v-if="pairs.length > 0"
                class="scroll-y"
                height="45vh"
                elevation="0"
                >
                <v-row v-for="pair in pairs" :key="pair">
                  <v-list-item two-line class="mx-5 mt-5">
                      <v-list-item-avatar>
                        <v-img :src="require('../../assets/Pictures/' + pair.patient.img)"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="font-weight-bold text-subtitle-1">{{ pair.patient.firstName }} {{ pair.patient.lastName }}</v-list-item-title>
                        <v-list-item-subtitle class="text-size">{{ pair.date }} - {{ pair.time }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-btn
                        elevation="0"
                        width="3vh"
                        height="3vh"
                        class="mx-2"
                        fab
                        color="#ffffff"
                        small
                        @click="(deleteAppId = pair.id) && (deleteAppTab = true)">
                        <v-icon small>mdi-close</v-icon>
                      </v-btn>
                    </v-list-item>
                </v-row>
              </v-card>
              <div v-else class="ml-5">Nu aveți programări.</div>
              <v-row justify="center">
                <v-col>
                  <v-row justify="center">
                    <v-btn
                      color="#76C6D1"
                      dark
                      absolute
                      bottom
                      align-center
                      class="ma-10"
                      @click="appTab = !appTab">
                      <v-icon>mdi-plus</v-icon>
                      Adaugă programare
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-overlay
              :z-index="zIndex"
              :value="appTab">
              <v-card
                height="60vh"
                width="60vh"
                color="white"
                >
                <v-btn
                  fab
                  @click="appTab = false"
                  icon
                  absolute
                  right>
                    <v-icon color="grey">mdi-close-circle-outline</v-icon>
                  </v-btn>
                  <v-card-title class="pa-10 grey--text text-subtitle">Completați detaliile programării</v-card-title>
                  <v-text-field
                    class="mt-3 grey--text px-10"
                    v-model="app.userId"
                    label="Emailul pacientului"
                    required
                    light
                    :rules="[required]">
                  </v-text-field>
                  <v-text-field
                    class="mt-3 grey--text px-10"
                    v-model="app.name"
                    label="Numele programării"
                    required
                    light
                    :rules="[required]">
                  </v-text-field>
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
                      label="Dată"
                      class="mt-3 grey--text px-10"
                      readonly
                      light
                      :value="fromDateDisp"
                      v-on="on"
                      required
                      prepend-icon="mdi-calendar-outline"
                      :rules="[required]"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="en-in"
                      v-model="appDate"
                      no-title
                      @input="fromDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-menu
                    ref="menu"
                    v-model="menuTime"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="appTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="appTime"
                        label="Oră"
                        light
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        class="mt-3 grey--text px-10"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menuTime"
                      v-model="appTime"
                      full-width
                      @click:minute="$refs.menu.save(appTime)"
                    ></v-time-picker>
                  </v-menu>
                  <v-text-field
                    class="mt-3 grey--text px-10"
                    v-model="app.description"
                    label="Descriere"
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
                    @click="addAppointment">
                    <v-icon>mdi-plus</v-icon>
                    Adaugă
                  </v-btn>
              </v-card>
            </v-overlay>
            <v-overlay
              :z-index="zIndex"
              :value="deleteAppTab">
              <v-card
                height="30vh"
                width="60vh"
                color="white"
                align="center"
                class="pt-15"
                >
                  <p class="tab-text">Sigur doriți să ștergeți această programare?</p>
                  <v-btn
                    color="#76C6D1"
                    dark
                    absolute
                    left
                    align-center
                    class="mx-15 my-4"
                    @click="deleteAppointment(deleteAppId)">
                    Da
                  </v-btn>
                  <v-btn
                    color="#76C6D1"
                    dark
                    absolute
                    right
                    align-center
                    class="mx-15 my-4"
                    @click="deleteAppTab = false">
                    Nu
                  </v-btn>
              </v-card>
            </v-overlay>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AppointmentService from '../../services/AppointmentService'
import UserService from '../../services/UserService'

export default {
  data () {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week'
      },
      selectedPatients: [], // pacientii cu care avem programari in saptamana curenta
      selectedEvent: {},
      menuTime: false,
      appTime: '',
      appDate: '',
      fromDateMenu: false,
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['#76C6D1', '#00A73E', '#FF7D01'],
      appointments: [],
      appTab: false,
      patients: [],
      found: 0,
      app: {
        userId: '',
        name: '',
        supervisorId: '',
        date: '',
        description: ''
      },
      user: {},
      deleteAppTab: false,
      deleteAppId: ''
    }
  },
  async mounted () {
    this.$refs.calendar.checkChange()
    this.patients = (await UserService.showPatients()).data
    this.appointments = (await AppointmentService.index()).data
    this.user = (await UserService.show()).data

    const events = []

    for (let i = 0; i < this.appointments.length; i++) {
      const allDay = 0
      const dt = new Date(this.appointments[i].date)
      const hr = dt.getUTCHours()
      const minute = dt.getUTCMinutes()
      const first = new Date(dt - (dt % 900000))
      const second = new Date(first.getTime() + 3 * 900000)
      events.push({
        name: this.appointments[i].name,
        start: first,
        startHour: hr,
        startMinute: minute,
        end: second,
        endHour: hr + 2,
        description: this.appointments[i].description,
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        timed: !allDay
      })
    }

    this.events = events

    // populeaza selectedPatients
    for (let i = 0; i < this.appointments.length; i++) {
      for (let j = 0; j < this.patients.length; j++) {
        if (this.patients[j].supervisorId === this.user.id) {
          let patientInfo = (({firstName, lastName, img, id}) => ({firstName, lastName, img, id}))(this.patients[j])
          if (this.appointments[i].userId === this.patients[j].id) {
            this.selectedPatients.push(patientInfo)
          }
        }
      }
    }
  },
  computed: {
    fromDateDisp () {
      return this.appDate
    },
    pairs () {
      return this.selectedPatients.map((patient, i) => {
        var d = new Date(this.appointments[i].date)

        return {
          id: this.appointments[i].id,
          patient: patient,
          date: d.toDateString(),
          time: d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'})
        }
      })
    }
  },
  methods: {
    getEventColor (event) {
      return event.color
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    async addAppointment () {
      this.error = null

      for (var i = 0; i < this.patients.length; i++) {
        if (this.patients[i].email === this.app.userId) {
          this.app.userId = this.patients[i].id
          this.found = 1
        }
      }

      if (this.found === 0) {
        this.error = 'Emailul pacientului nu este valid'
        return
      }
      this.app.supervisorId = this.user.id

      var date = new Date(this.appDate)
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      var hour = this.appTime[0] + this.appTime[1]
      hour = parseInt(hour)
      var min = this.appTime[3] + this.appTime[4]
      this.app.date = new Date(year, month, day, hour + 3, min, 0, 0)

      const areAllFieldsFilledIn = Object
        .keys(this.app)
        .every(key => !!this.app[key])

      if (!areAllFieldsFilledIn) {
        this.error = 'Vă rugăm să completați toate câmpurile obligatorii.'
        return
      }

      try {
        await AppointmentService.post(this.app)
        this.appTab = false
      } catch (err) {
        console.log(err)
      }
    },
    async deleteAppointment () {
      try {
        await AppointmentService.delete(this.deleteAppId)
        this.deleteAppTab = false
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

.text-error {
  color: red;
}

.v-navigation-drawer__border {
  width: 0px;
}

.text-color {
  color:rgb(80, 80, 80);
}

.scroll-y {
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

::-webkit-scrollbar {
  display: none;
}

.tab-text {
  color: #616161;
  margin-bottom: 10vh;
}

</style>
