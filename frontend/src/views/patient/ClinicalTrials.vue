<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="4" class="pa-0">
      <v-card color="#76C6D1" height="101vh" dark class="ma-0 pa-0">
        <v-row justify="center">
          <v-img contain class="img-size my-10" :src="img.url" :alt="img.alt"></v-img>
        </v-row>
        <v-row justify="center" class="mt-10 mb-7">
          <v-card-title class="text-h4 font-weight-medium">
            Studii clinice active
          </v-card-title>
          <v-card-text class="mx-15">
            Studiile clinice sunt proiecte de cercetare pe oameni care se înscriu voluntar, făcute pentru a răspunde la întrebări legate de efectele unui medicament, vaccin, alte terapii sau dacă o altă boală răspunde sau nu la tratamentul deja existent. Studiile clinice sunt proiecte în care oamenii pot participa atât în calitate de pacienți cât și de voluntari sănătoși.
          </v-card-text>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="8" class="px-7 py-0" elevation="0">
      <v-card class="set-height scroll-y">
        <div v-for="trial in trials" :key="trial.id">
          <v-row class="trial-box">
            <v-col cols="8" class="pt-4">
              <p class="trial-title">{{ trial.title }}</p>
              <p class="trial-description">{{ trial.description }}</p>
            </v-col>
            <v-col cols="4" class="pt-10">
              <v-btn
                color="#76C6D1"
                dark
                block
                class="pa-5"
                :to="{
                    name: 'trial',
                    params: {
                      trialId: trial.id
                    }
                  }">Vezi mai multe detalii și înregistrează-te</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
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

.set-height {
  height: 100vh;
}

</style>
