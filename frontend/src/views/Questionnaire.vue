<template>
  <v-row justify="center" align="center" fill-height class="ma-0">
    <v-col cols="4" class="pa-0">
      <v-card color="#76C6D1" height="101vh" dark class="ma-0 pa-0">
        <v-row justify="center">
          <v-img contain class="img-size my-10" :src="img.url" :alt="img.alt"></v-img>
        </v-row>
        <v-row justify="center" class="mt-10 mb-7">
          <v-card-title class="text-h4 font-weight-medium">
            Questionnaire
          </v-card-title>
        </v-row>
        <v-row justify="center">
          <v-card-text class="mx-15">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </v-card-text>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="8" class="px-7 py-0">
      <v-form>
            <div v-if="step === 1">
              <h5 class="text-h5 ma-10">{{ q1.id }}/10</h5>
              <v-spacer></v-spacer>
              <h4 class="text-h4 ma-10 font-weight-medium">{{ q1.title }}</h4>
              <div class="mx-10" v-for="i in q1.ans" :key="i">
                  <v-checkbox
                    v-model="i.check"
                    :label="i.text"
                  ></v-checkbox>
              </div>
              <v-row class="bottom-page" no-gutters>
                <v-col cols="10" align-start>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" align-end>
                  <v-btn color="#76C6D1" dark block
                    @click.prevent="next()">
                    Continue
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-if="step === 2">
              <h5 class="text-h5 ma-10">{{ q2.id }}/10</h5>
              <v-spacer></v-spacer>
              <h4 class="text-h4 ma-10 font-weight-medium">{{ q2.title }}</h4>
              <div class="mx-10" v-for="i in q2.ans" :key="i">
                  <v-checkbox
                    v-model="i.check"
                    :label="i.text"
                  ></v-checkbox>
              </div>
              <v-row class="bottom-page" no-gutters>
                <v-col cols="2" align-start>
                  <v-btn class="mx-10"
                    color="#76C6D1" dark block
                    @click.prevent="prev()"
                  >
                    Back
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" align-end>
                  <v-btn color="#76C6D1" dark block
                    @click.prevent="next()">
                    Continue
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-if="step === 3">
              <h5 class="text-h5 ma-10">{{ q3.id }}/10</h5>
              <v-spacer></v-spacer>
              <h4 class="text-h4 ma-10 font-weight-medium">{{ q3.title }}</h4>
              <div class="mx-10" v-for="i in q3.ans" :key="i">
                  <v-checkbox
                    v-model="i.check"
                    :label="i.text"
                  ></v-checkbox>
              </div>
              <v-row class="bottom-page" no-gutters>
                <v-col cols="2" align-start>
                  <v-btn class="mx-10"
                    color="#76C6D1" dark block
                    @click.prevent="prev()"
                  >
                    Back
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" align-end>
                  <v-btn color="#76C6D1" dark block
                    @click.prevent="submit()">
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      step: 1,
      img: {
        url: require('@/assets/illustration-1.png'),
        name: 'illustration'
      },
      q1:
        {
          id: 1,
          title: 'Question1?',
          ans: [
            {
              text: 'yes',
              check: true
            },
            {
              text: 'no',
              check: false
            }
          ]
        },
      q2:
        {
          id: 2,
          title: 'Question2?',
          ans: [
            {
              text: 'yes',
              check: false
            },
            {
              text: 'no',
              check: false
            }
          ]
        },
      q3:
        {
          id: 3,
          title: 'Question3?',
          ans: [
            {
              text: 'yes',
              check: false
            },
            {
              text: 'no',
              check: false
            }
          ]
        }
    }
  },
  methods: {
    prev () {
      this.step--
    },
    next () {
      this.step++
    },
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

.fixed {
  position: fixed;
}

</style>
