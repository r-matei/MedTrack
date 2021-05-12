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

        <v-card-text class="mt-6 font-weight-bold text-h6">Description</v-card-text>
        <v-card-text class="font-weight-regular text-h6">{{ trial.description }}</v-card-text>
        <v-card-text class="mt-6 mb-3 font-weight-bold text-h6">General informations</v-card-text>
        <v-row class="ma-0 pa-4">
          <v-text class="font-weight-regular text-h7">Phase</v-text>
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
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import TrialsService from '../../services/TrialsService'

export default {
  data () {
    return {
      trial: {}
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
    console.log(this.trial)
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
</style>
