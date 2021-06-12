<template>
  <v-row justify="center" align="center" fill-height class="ma-0 pa-0">
    <v-col cols="4" class="pa-0 ma-0">
      <v-card color="#76C6D1" height="101vh" dark class="ma-0 pa-0">
        <v-row class="fill-height" justify="center" align="center">
          <v-img contain class="img-size my-10" :src="img.url" :alt="img.alt"></v-img>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="8" class="px-7 py-0" align-self="start">
      <v-btn
        icon
        color="#76C6D1"
        class="mt-6"
        :to="{
          name: 'clinical-trials'}">
        <v-icon large>mdi-arrow-left</v-icon>
      </v-btn>

      <div class="mx-15 my-10">
        <p class="trial-title">{{ trial.title }}</p>
        <p class="trial-text">{{ trial.description }}</p>
        <p class="trial-colored-text">If you are interested in participating in the trial:</p>
        <div v-for="(require, index) in requirements" :key="index">
          <v-icon v-if="index != 0" color="#76C6D1">mdi-chevron-right</v-icon>
          <span v-if="index != 0">{{ require }}</span>
        </div>
        <v-btn
          color="#76C6D1"
          dark
          outlined
          height="5vh"
          x-large
          class="mt-15"
          @click="submitTrial(trial.id)">Register your interest in this clinical trial</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import UserService from '../../services/UserService'
import TrialsService from '../../services/TrialsService'

import {mapState} from 'vuex'

export default {
  data () {
    return {
      trial: {},
      user: {},
      img: {
        url: 'https://ik.imagekit.io/roxanam/illustration-4_P2XopA3OQKd.svg',
        name: 'illustration'
      }
    }
  },
  async mounted () {
    try {
      this.user = (await UserService.show()).data
    } catch (err) {
      console.log(err)
    }

    const trialId = this.route.params.trialId

    try {
      this.trial = (await TrialsService.showTrial(trialId)).data
      console.log(this.trial.id)
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapState([
      'route'
    ]),
    requirements: function () {
      return this.trial.requirements.split('#')
    }
  },
  methods: {
    async submitTrial (trialId) {
      try {
        this.user.clinicalTrialId = trialId
        await UserService.put(this.user)
        this.$router.push('/survey')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

.img-size {
  height: 30vh;
}

.bottom-page {
  margin-top: 45vh;
}

.text-error {
  color: red;
}

.fixed {
  position: fixed;
}

.trial-title {
  font-size: 3vh;
  font-weight: 600;
  color: #76C6D1;
}

.trial-text {
  font-weight: 600;
}

.trial-colored-text {
  font-weight: 600;
  color: #76C6D1;
}

</style>
