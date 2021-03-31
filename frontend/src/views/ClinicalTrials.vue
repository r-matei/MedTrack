<template>
  <v-container pa-0 fill-height>
    <v-row justify="center">
      <v-col cols="4" pa-0>
        <v-card color="#76C6D1" height="100vh" dark>
          <v-row class="fill-height" justify="center" align="center">
            <v-col cols="12" sm="6" align-self="center">
              <v-card-title class="text-h4 font-weight-medium">
                There you go!
              </v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="8" pa-0>
        <p class="text-h4 font-weight-medium ma-16">Here is a list of tests you can attend to:</p>
        <div v-for="item in trials" :key="item" class="ml-16 d-flex">
          <v-checkbox
            v-model="item.check"
          >
            <div slot='label'>{{item.title}} - <a :href="item.link">read more</a></div>
          </v-checkbox>
        </div>
        <v-row class="bottom-page" no-gutters>
          <v-col cols="2" align-start>
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
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      trials: [
        {
          title: 'Trial1',
          check: false,
          link: 'https://vuetifyjs.com/en/components/grids/'
        },
        {
          title: 'Trial2',
          check: false,
          link: 'https://vuetifyjs.com/en/components/grids/'
        },
        {
          title: 'Trial3',
          check: false,
          link: 'https://vuetifyjs.com/en/components/grids/'
        }
      ]
    }
  },
  methods: {
    submit () {
      alert('Submit to blah and show blah and etc.')
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

</style>
