<template>
  <v-row justify="center" align="center" class="ma-0">
    <v-col cols="4" class="pa-0">
      <v-card color="#76C6D1" height="101vh" dark>
        <v-row class="fill-height" justify="center" align="center">
          <v-card-title class="text-h4 font-weight-medium">
            Survey
          </v-card-title>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="8" class="pa-0">
      <v-stepper v-model="e1" class="ma-16">
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
            color="#76C6D1"
          >
            Name of step 1
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
            color="#76C6D1"
          >
            Name of step 2
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" color="#76C6D1">
            Name of step 3
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="50vh"
            ></v-card>
            <v-row no-gutters>
              <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex" cols="2" align-end>
                <v-btn
                  color="#76C6D1" dark block
                  @click="e1 = 2"
                >
                  Continue
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="50vh"
            ></v-card>

            <v-row no-gutters>
              <v-col cols="2" align-start>
                <v-btn
                  color="#76C6D1" dark block
                  @click="e1 = 1"
                >
                  Back
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2" align-end>
                <v-btn color="#76C6D1" dark block
                  @click="e1 = 3">
                  Continue
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="50vh"
            ></v-card>

            <v-row no-gutters>
              <v-col cols="2" align-start>
                <v-btn
                  color="#76C6D1" dark block
                  @click="e1 = 2"
                >
                  Back
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2" align-end>
                <v-btn color="#76C6D1" dark block
                  @click="e1 = 1">
                  Finish
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      e1: 1
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
