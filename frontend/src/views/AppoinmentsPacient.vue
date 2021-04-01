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
            <p class="text-h5 font-weight-bold mt-16 mx-16">Appointments schedule</p>
            <p class="text-subtitle1 font-weight-regular mx-16 my-0">Contact +40 056 033 43 43 to change an appointment</p>
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
                        Today
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
                            <v-list-item-title>Week</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="type = 'month'">
                            <v-list-item-title>Month</v-list-item-title>
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
                      @change="updateRange"
                    ></v-calendar>
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
                <p class="text-h5 font-weight-bold text-color ma-2">Next appointment</p>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week'
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['#76C6D1', '#00A73E', '#FF7D01'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      user: {
        appointments: [
          {date: '12/02/2021', title: 'Results #1', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'},
          {date: '12/02/2021', title: 'Results #2', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. '}
        ]
      }
    }
  },
  mounted () {
    this.$refs.calendar.checkChange()
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
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        })
      }

      this.events = events
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

</style>
