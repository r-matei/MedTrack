<template>
  <v-row justify="center" align="center" class="ma-0">
    <!-- content -->
    <v-col cols="9" class="pa-0">
      <v-card
        color="#F6FAFD"
        height="100vh"
        elevation="0"
        class="bradius ma-0 pa-0">
        <v-row class="ma-0">
          <v-col cols="6" class="pa-5">
            <p class="text-h5 font-weight-bold mt-16 mx-16">Welcome {{ user.name }} !</p>
            <p class="text-subtitle1 font-weight-regular mx-16">Let's check your test results</p>
            <v-card width="30vh" class="mx-16 mt-16 pa-5 rounded-xl" align="center" elevation="2">
              <v-card-text class="font-weight-bold text-h6">Clinical Trial Phase {{ user.clinicalTrialPhase }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" class="pa-10">
            <v-img contain class="mx-16 mt-6" :src="img.url" :alt="img.alt"></v-img>
          </v-col>
        </v-row>
        <v-row class="ma-0" align="center" justify="center">
          <!-- health graphic -->
          <v-col cols="6" class="pa-5">
            <v-card width="52vh" height="45vh" class="rounded-xl ml-16" elevation="2">

            </v-card>
          </v-col>
          <!-- results documents -->
          <v-col cols="6" class="pa-5">
            <v-card width="52vh" height="45vh" class="rounded-xl" elevation="2">
              <v-card-title>
                <p class="text-h5 font-weight-bold text-color mx-2 mt-2 mb-0">Health Report Documents</p>
              </v-card-title>
               <v-card-text>
                <v-list>
                  <v-list-item-group
                    v-model="selectedItem"
                    color="primary"
                  >
                    <v-list-item
                      v-for="item in user.reports"
                      :key="item"
                    >
                      <v-list-item-icon class="mr-2">
                        <v-icon color="#76C6D1">mdi-file-document</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.size"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-icon color="#76C6D1">mdi-download</v-icon>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <p class="mt-3">You can find more details about this study <a href="user.clinicalTrialLink">here</a></p>
        </v-row>
      </v-card>
    </v-col>
    <!-- user info -->
    <v-col cols="3" class="pa-0">
      <v-navigation-drawer
        right
        height="100vh"
        width="auto"
        ma-0
        floating
      >
        <template v-slot:prepend>
          <v-list-item two-line class="ma-5">
            <v-list-item-avatar>
              <img :src="user.img">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-h6">{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle class="text-size">{{ user.birthDate }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-row no-gutters class="mx-5">
          <v-col cols="4">
            <v-card
              class="px-2 ma-1 text-size"
              align="center"
              elevation="0"
            >
              <p class="font-weight-bold ma-1">{{ user.bloodType }}</p>
              <p>Blood type</p>
            </v-card>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="4">
            <v-card
              class="px-2 ma-1 text-size"
              align="center"
              elevation="0"
            >
              <p class="font-weight-bold ma-1">{{ user.height }}cm</p>
              <p>Height</p>
            </v-card>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="4">
            <v-card
              class="px-2 ma-1 text-size"
              align="center"
              elevation="0"
            >
              <p class="font-weight-bold ma-1">{{ user.weight }}kg</p>
              <p>Weight</p>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-for="result in user.results" :key="result">
          <v-card
            class="pa-5 mx-13 my-5 text-size rounded-lg"
            align="start"
            elevation="2"
            color="#F6FAFD">
            <v-card-text class="pa-1">
              <p>{{ result.date }}</p>
              <p class="font-weight-bold">{{ result.title }}</p>
              <p>{{ result.text }}</p>
            </v-card-text>
          </v-card>
        </v-row>
      </v-navigation-drawer>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      img: {
        url: require('@/assets/illustration-2.png'),
        alt: 'Illustration'
      },
      user: {
        img: require('@/assets/pic.png'),
        name: 'Jane Smith',
        birthDate: '20.04.1960',
        bloodType: 'A-',
        height: '178',
        weight: '55',
        clinicalTrial: '',
        clinicalTrialPhase: 'I',
        clinicalTrialLink: '',
        results: [
          {date: '12/02/2021', title: 'Results #1', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'},
          {date: '12/02/2021', title: 'Results #2', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. '}
        ],
        reports: [
          {title: 'Test results - 23.03.2021', size: '2 MB'},
          {title: 'Test results - 10.02.2021', size: '3 MB'},
          {title: 'Test results - 5.01.2021', size: '3 MB'}
        ]
      }
    }
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

</style>
