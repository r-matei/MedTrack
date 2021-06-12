<template>
  <div>
    <div class="banner">
    <v-row class="ma-0">
      <v-col cols="7">
        <v-img height="30vh" contain class="my-1" :src="img.url" :alt="img.alt"></v-img>
        <div class="align-text">
          <span class="ml-15 display-1">INFORM</span><img class="mx-2" height="30px" contain src="https://ik.imagekit.io/roxanam/head_bVsq_7-QjB1.png">
          <span class="ml-15 display-1">ENGAGE<img class="mx-2" height="30px" contain src="https://ik.imagekit.io/roxanam/touch_klEagf7Ig.png"></span>
          <span class="ml-15 display-1">EMPOWER<img class="mx-2" height="30px" contain src="https://ik.imagekit.io/roxanam/muscles_1X0fH5OpM.png"></span>
          <p class="my-5 text-h5">Your clinical trial management</p>
        </div>
      </v-col>
      <v-col cols="5" class="pa-0 ma-0">
        <v-img contain :src="img2.url" class="pa-0 ma-0 opacity-low" :alt="img2.alt"></v-img>
      </v-col>
    </v-row>
  </div>
  <div class="reports">
    <div class="container">
      <div>
        <p class="text-h5 mt-15">Choose a trial to show data</p>
        <v-select
          placeholder="Choose trial"
          :items="trialsTitles"
          v-model="selectedTitle"
        ></v-select>
      </div>
      <div>
        <div v-if="loaded" class="mt-10 font-weight-bold">
          Registered Patients during registration period<span>for clinical trial: {{ selectedTrial.title }}</span>
          <hr>
        </div>
        <div>
          <line-chart v-if="loaded" height="300px" class="chart1" :chart-data="chart1Data" :chartLabels="chart1Labels"></line-chart>
        </div>
      </div>
      <div>
        <div v-if="loaded" class="mt-10 font-weight-bold">
          Patients number per clinical trials
          <hr>
        </div>
        <div>
          <bar-chart v-if="loaded" height="300px" class="chart1" :chart-data="chart2Data" :chartLabels="chart2Labels"></bar-chart>
        </div>
      </div>
      <div>
        <div v-if="loaded" class="mt-10 font-weight-bold">
          Created Clinical Trials in time
          <hr>
        </div>
        <div>
          <line-chart v-if="loaded" height="300px" class="chart1" :chart-data="chart2Labels" :chartLabels="chart3Labels"></line-chart>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
<script>
import UserService from '../../services/UserService'
import TrialsService from '../../services/TrialsService'
import ResultsService from '../../services/ResultsService'

import LineChart from '../../components/LineChart.vue'
import BarChart from '../../components/BarChart.vue'

export default {
  components: {
    LineChart,
    BarChart
  },
  data () {
    return {
      img: {
        url: 'https://ik.imagekit.io/roxanam/logo-alb_rgJF44AQ_.png',
        name: 'logo'
      },
      img2: {
        url: 'https://ik.imagekit.io/roxanam/reports_1USYNIpG0.png',
        name: 'illustration'
      },
      patients: [],
      trials: [],
      results: [],
      selectedTrial: {},
      selectedTitle: '',
      loaded: false,
      registeredPatients: [],
      dates: [],
      trialsTitles: [],
      chart1Labels: [],
      chart1Data: [],
      chart2Labels: [],
      chart2Data: [],
      chart3Labels: [],
      loaded: false,
      datacollection: null
    }
  },
  async mounted () {
    this.patients = (await UserService.patientsForReports()).data
    this.trials = (await TrialsService.trialsForReports()).data
    this.results = (await ResultsService.show()).data

    for (var i = 0; i < this.patients.length; i++) {
      this.registeredPatients.push(this.patients[i])
    }

    for (var i = 0; i < this.trials.length; i++) {
      this.trialsTitles.push(this.trials[i].title)
    }

    this.registeredPatients.sort((b, a) => new Date(b.createdAt) - new Date(a.createdAt))

    this.createChart2Data ()

    this.createChart3Data ()
  },
  methods: {
    resetState () {
      this.loaded = false
    },
    createChart1Data () {
      for (var i=0; i<this.registeredPatients.length; i++) {
        if (this.registeredPatients[i].clinicalTrialId === this.selectedTrial.id) {
          var d = new Date(this.registeredPatients[i].createdAt)
          d = d.toDateString()
          var sum = 1;
          if (this.search (this.chart1Labels, d)) {
            continue;
          }
          for (var j=0; j<this.registeredPatients.length; j++) {
            var d2 = new Date(this.registeredPatients[j].createdAt)
            d2 = d2.toDateString()
            if (d === d2 && this.registeredPatients[i].id !== this.registeredPatients[j].id) {
              sum++
            }
          }
          this.chart1Labels.push(d)
          this.chart1Data.push(sum)
        }
      }
    },
    search (a, b) {
      for (var i=0; i<a.length; a++) {
        if (a[i] === b) {
          return 1
        }
      }
      return 0
    },
    createChart2Data () {
      for (var i = 0; i < this.trials.length; i++) {
        var sum = 0
        this.chart2Labels.push(this.trials[i].title.substring(0, 35) + "...")
        for (var j = 0; j < this.patients.length; j++) {
          if (this.patients[j].clinicalTrialId === this.trials[i].id) {
            sum++
          }
        }
        this.chart2Data.push(sum)
      }
      this.loaded = true
    },
    createChart3Data () {
      for (var i=0; i<this.trials.length; i++) {
        var d = new Date(this.trials[i].createdAt)
        d = d.toDateString()
        var sum = 1;
        if (this.search (this.chart3Labels, d)) {
          continue;
        }
        this.chart3Labels.push(d)
      }
      this.loaded = true
    }
  },
  watch: {
    selectedTitle: function () {
      this.resetState()
      for (var i = 0; i < this.trials.length; i++) {
        if (this.trials[i].title === this.selectedTitle) {
          this.selectedTrial = this.trials[i]
          break
        }
      }
      for (var i = 0; i < this.chart1Data.length; i++) {
        this.chart1Data.pop()
        this.chart1Labels.pop()
      }
      this.createChart1Data()
      this.loaded = true
    }
  }
}
</script>

<style scoped>
.banner {
  margin: 0;
  padding: 0px;
  background-color: #76C6D1;
  color: white;
  align-content: center;
  height: 56.5vh;
}

.align-text {
  text-align: center;
}

.container {
  align-content: center;
  width: 90vh;
}

.chart1 {
  width: 90vh;
}

.opacity-low {
  opacity: 0.7;
}
</style>
