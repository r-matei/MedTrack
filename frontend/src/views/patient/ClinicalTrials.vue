<template>
  <v-row justify="center" align="center" fill-height class="ma-0">
    <v-col cols="4" class="pa-0">
      <v-card color="#76C6D1" height="101vh" dark class="ma-0 pa-0">
        <v-row justify="center">
          <v-img contain class="img-size my-10" :src="img.url" :alt="img.alt"></v-img>
        </v-row>
        <v-row justify="center" class="mt-10 mb-7">
          <v-card-title class="text-h4 font-weight-medium">
            Clinical Trials
          </v-card-title>
          <v-card-text class="mx-15">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </v-card-text>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="8" class="px-7 py-0">
      <div v-for="trial in trials" :key="trial.id">
        <v-row class="trial-box scroll-y">
          <v-col cols="8" class="pt-4">
            <p class="trial-title">{{ trial.title }}</p>
            <p class="trial-description">{{ trial.description }}</p>
          </v-col>
          <v-col cols="4" class="pt-10">
            <v-btn
              color="#76C6D1"
              dark
              block
              :to="{
                  name: 'trial',
                  params: {
                    trialId: trial.id
                  }
                }">View trial details and register</v-btn>
          </v-col>
        </v-row>
      </div>
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
      img: {
        url: require('../../assets/illustration-1.png'),
        name: 'illustration'
      },
      user: {}
    }
  },

  async mounted () {
    try {
      this.user = (await UserService.show()).data
      console.log(this.user)
    } catch (err) {
      console.log(err)
    }

    try {
      this.trials = (await TrialsService.show()).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
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

.fixed {
  position: fixed;
}

.trial-title {
  font-size: 2vh;
  color: #76C6D1;
}

.trial-box {
  border: 1px solid rgb(226, 226, 226);
  margin: 15px 10px;
}

.align-center {
  vertical-align: center;
}

.scroll-y {
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

::-webkit-scrollbar {
  display: none;
}

</style>
