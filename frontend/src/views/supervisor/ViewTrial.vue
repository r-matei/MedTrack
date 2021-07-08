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
        <v-text class="pa-4 font-weight-bold text-h4">{{ trial.title }}</v-text>
        <div style="display: inline; position: absolute; right: 20px;">
          <v-btn
            color="#76C6D1"
            dark
            align-center
            class="justify-end"
            @click="deleteTab = true">
            Șterge studiu
          </v-btn>
        </div>
        <p class="px-5">Id: {{ trial.id }}</p>

        <v-card-text class="mt-6 font-weight-bold text-h6">Descriere</v-card-text>
        <v-card-text class="font-weight-regular text-h6">{{ trial.description }}</v-card-text>
        <v-card-text class="mt-6 mb-3 font-weight-bold text-h6">Informații generale</v-card-text>
        <v-row class="ma-0 pa-4">
          <v-text class="font-weight-regular text-h7">Fază</v-text>
          <v-spacer></v-spacer>
          <v-text class="font-weight-regular text-h7">{{ trial.phase }}</v-text>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-4">
          <v-text class="font-weight-regular text-h7">Status</v-text>
          <v-spacer></v-spacer>
          <v-text class="font-weight-regular text-h7">{{ trial.status }}</v-text>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-4">
          <v-text class="font-weight-regular text-h7">Efecte adverse</v-text>
          <v-spacer></v-spacer>
          <v-text class="font-weight-regular text-h7">{{ trial.adverseEffects }}</v-text>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-4">
          <v-text class="font-weight-regular text-h7">Supervisor</v-text>
          <v-spacer></v-spacer>
          <v-text class="font-weight-regular text-h7">{{ supervisor.firstName }} {{ supervisor.lastName }}</v-text>
        </v-row>
      </v-card>
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
          <p class="tab-text">Sigur doriți să ștergeți acest studiu?</p>
          <v-btn
            color="#76C6D1"
            dark
            absolute
            left
            align-center
            class="mx-15 my-4"
            @click="deleteTrial()">
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
import {mapState} from 'vuex'
import TrialsService from '../../services/TrialsService'
import UserService from '../../services/UserService'

export default {
  data () {
    return {
      trial: {},
      supervisor: {},
      deleteTab: false
    }
  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  async mounted () {
    const trialId = this.route.params.trialId
    this.trial = (await TrialsService.showTrial(trialId)).data
    this.supervisor = (await UserService.showUser(this.trial.supervisorId)).data
  },
  methods: {
    async deleteTrial () {
      try {
        await TrialsService.delete(this.trial.id)
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

.tab-text {
  color: #616161;
  margin-bottom: 10vh;
}
</style>
