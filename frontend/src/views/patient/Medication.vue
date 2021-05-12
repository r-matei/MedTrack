<template>
  <v-row justify="center" align="center" class="ma-0">
    <v-col cols="12" class="pa-0">
      <v-card
        color="#F6FAFD"
        height="100vh"
        elevation="0"
        class="bradius ma-0 pa-0">
        <v-row class="ma-0">
          <v-col cols="6" class="pa-5">
            <p class="text-h5 font-weight-bold mt-16 mx-16">Welcome Jane Smith !</p>
            <p class="text-subtitle1 font-weight-regular mx-16">Don't forget about your daily medication!</p>
            <!-- efecte adverse -->
            <v-card width="35vh" height="20vh" class="mx-16 mt-16 pa-2 rounded-xl" align="center" elevation="2">
              <v-card-text class="font-weight-bold text-h6">Efecte adverse</v-card-text>
              <v-card-text class="font-weight-regular text-h7">{{ clinicalTrial.adverseEffects }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" class="pa-10">
            <v-img contain width="50vh" class="mx-16 mt-6" :src="img.url" :alt="img.alt"></v-img>
          </v-col>
        </v-row>
        <v-row class="ma-0" align="center" justify="center">
          <!-- medication -->
          <v-col cols="6" class="pa-5">
            <v-card width="70vh" height="45vh" class="rounded-xl ml-16" elevation="2">
              <v-card-title>
                <img width="35vh" class="mx-2 mt-2 mb-6" :src="medImage.url" :alt="medImage.alt">
                <p class="text-h5 font-weight-bold text-color mx-2 mt-2 mb-6">Medication</p>
              </v-card-title>
              <row align="center">
                <v-simple-table>
                  <template>
                    <thead>
                      <tr>
                        <th class="text-center">
                          Name
                        </th>
                        <th class="text-center">
                          Quantity
                        </th>
                        <th class="text-center">
                          Period
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in medication"
                        :key="item.id"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.qtyPerUse }}</td>
                        <td>{{ item.period }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </row>
              <v-row class="bottom">
                <v-col></v-col>
                <v-spacer></v-spacer>
                <v-col align-end>
                  <v-btn
                    color="#76C6D1"
                    dark>
                    Request new recipe
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <!-- online chat -->
          <v-col cols="6" class="pa-5">
            <v-card width="70vh" height="45vh" class="rounded-xl" elevation="2">
              <v-card-title>
                <img width="35vh" class="ma-2" :src="chatImage.url" :alt="chatImage.alt">
                <p class="text-h5 font-weight-bold text-color ma-2">Online chat</p>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TrialsService from '../../services/TrialsService'
import MedicationService from '../../services/MedicationService'

export default {
  data () {
    return {
      img: {
        url: require('../../assets/illustration-3.png'),
        alt: 'Illustration'
      },
      chatImage: {
        url: require('../../assets/chat.png'),
        alt: 'Icon'
      },
      medImage: {
        url: require('../../assets/pills.png'),
        alt: 'Icon'
      },
      medication: [],
      clinicalTrial: {}
    }
  },
  async mounted () {
    this.clinicalTrial = (await TrialsService.index()).data

    this.medication = (await MedicationService.index()).data
  }
}
</script>

<style scoped>
.bk-color {
  background-color: #76C6D1;
}

.bradius {
  border-radius: 10vh 0 0 10vh;
}

.text-size {
  font-size: 1.5vh;
}

.text-color {
  color:rgb(80, 80, 80);
}

.bottom {
  margin-top: 2vh;
  margin-right: 1.3vh;
}

</style>
