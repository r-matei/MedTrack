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
            <p class="text-subtitle1 font-weight-regular mx-16 my-0">Pentru întrebări vă rugăm să contactați supervizorul dumneavoastră</p>
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
          <!-- next appointment -->
          <v-col cols="4">
            <v-card width="40vh" height="65vh" class="rounded-xl mt-10 mx-10" elevation="2">
              <v-card-title>
                <v-icon large>mdi-calendar-check</v-icon>
                <p class="text-h5 font-weight-bold text-color ma-2">Următoarea programare</p>
                <div v-if="nextAppointment" class="d-block">
                  <p class="font-weight-bold mt-3 text-color">{{ nextAppointment.name }}</p>
                  <span class="text-subtitle">{{ nextAppointment.date }} - </span>
                  <span>{{ nextAppointment.hour }}</span>
                  <p class="app-description">{{ nextAppointment.description }}</p>
                </div>
                <p v-if="!nextAppointment">Nu aveti programari viitoare.</p>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AppointmentService from '../../services/AppointmentService'

export default {
  data () {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Lună',
        week: 'Săptămână'
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['#76C6D1', '#00A73E', '#FF7D01'],
      appointments: [],
      nextAppointment: {}
    }
  },
  async mounted () {
    this.$refs.calendar.checkChange()

    this.appointments = (await AppointmentService.index()).data

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
    this.appointments.sort((b, a) => new Date(b.date) - new Date(a.date))

    // get next appointment
    var today = new Date()
    for (var i = 0; i < this.appointments.length; i++) {
      var d = new Date(this.appointments[i].date)
      if (d > today) {
        var id = i
        break
      }
    }
    this.nextAppointment = this.appointments[id]

    const date = new Date(this.nextAppointment.date)
    this.nextAppointment['date'] = date.toDateString()
    this.nextAppointment['hour'] = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'})
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

.v-navigation-drawer__border {
  width: 0px;
}

.text-color {
  color:rgb(80, 80, 80);
}

.app-description {
  word-break: break-word;
}

</style>
