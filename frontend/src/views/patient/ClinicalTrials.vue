<template>
  <v-row justify="center" align="center" fill-height class="ma-0 pa-0">
    <v-col cols="4" class="pa-0 ma-0">
      <v-card color="#76C6D1" height="101vh" dark class="ma-0 pa-0">
        <v-row class="fill-height" justify="center" align="center">
          <v-col cols="12" sm="6" align-self="center" class="ma-0 pa-0">
            <v-card-title class="text-h4 font-weight-medium">
              There you go!
            </v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="8" class="px-7 py-0" align-self="start">
      <p class="text-h4 font-weight-medium ma-16">Here is a list of tests you can attend to:</p>
      <div v-for="item in selectedTrials" :key="item" class="ml-16 d-flex">
        <v-checkbox
          v-model="item.check"
        >
          <div slot='label'>{{item.title}} - <a :href="item.link">read more</a></div>
        </v-checkbox>
      </div>
      <div class="text-error" v-html="error"/>
      <v-spacer></v-spacer>
      <v-row class="bottom-page" no-gutters>
        <v-col cols="10" align-start>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2" align-end>
          <v-btn color="#76C6D1" dark block
            @click.prevent="submit()">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import UserService from '../../services/UserService'
import TrialsService from '../../services/TrialsService'

export default {
  data () {
    return {
      trials: [],
      selectedTrials: [],
      user: {},
      checkTrial: false,
      error: null
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
      this.selectedTrials = this.trials.map(trial => {
        let props = {
          'id': trial.id,
          'title': trial.title,
          'supervisorId': trial.supervisorId,
          'link': trial.link,
          'check': false
        }
        return props
      })
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async submit () {
      this.error = null

      this.selectedTrials.forEach(element => {
        if (element.check === true) {
          this.user.clinicalTrialId = element.id
          this.user.supervisorId = element.supervisorId
          this.checkTrial = true
        }
      })

      if (this.checkTrial === false) {
        this.error = 'Please choose a trial to attend'
        return
      }

      try {
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

</style>
