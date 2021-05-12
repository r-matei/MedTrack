<template>
  <div>
    <v-row v-if="isUserLoggedIn" justify="center" align="center" class="bk-color ma-0">
      <!-- menu -->
      <v-col cols="2" class="pa-0">
        <v-navigation-drawer
          ma-0
          height="100vh"
          color="#76C6D1"
          dark
          permanent
          width="auto"
          floating
        >
          <v-img contain class="ma-10" :src="logo.url" :alt="logo.alt"></v-img>
          <v-list class="menu-margins">
            <v-list-item
              v-for="item in menu"
              :key="item.title"
              :to="item.link"
              link
              class="left-margin-menu"
            >
              <v-list-item-icon>
                <v-icon large class="mr-0">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn
                block
                text
                class="my-4"
                @click = "logout({name: 'register'})">
                <v-icon medium class="mr-2 mb-1">mdi-logout-variant</v-icon>Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
      </v-col>
      <!-- content -->
      <v-col cols="10" class="pa-0">
        <v-card
          color="#F6FAFD"
          height="100vh"
          elevation="0"
          class="bradius ma-0 pa-0">
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
    <!-- when user is not logged in -->
    <v-row v-if="!isUserLoggedIn" class="ma-0">
      <v-col class="ma-0 pa-0" align="center">
        <v-toolbar fixed color="#76C6D1" dark class="mb-16">
          <v-toolbar-title class="mr-4">
            MedTrack
          </v-toolbar-title>

          <v-toolbar-items>
          </v-toolbar-items>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn
              text
              dark
              :to="{
                path: '/register'
              }">
              Login
            </v-btn>

            <v-btn
              text
              :to="{
                path: '/register'
              }">
              Sign Up
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-text> This Content Isn't Available Right Now</v-text>
        <br>
        <v-text>Please login first</v-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      logo: {
        url: require('../../assets/logo-alb.png'),
        alt: 'Logo'
      },
      menu: [
        { title: 'Home', icon: 'mdi-home-outline', link: '/patient/home' },
        { title: 'Appointments', icon: 'mdi-calendar', link: '/patient/appointments' },
        { title: 'Medication', icon: 'mdi-heart-outline', link: '/patient/medication' }
      ]
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('setUserToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style scoped>
.menu-margins {
  margin-top: 10vh;
}

.bk-color {
  background-color: #76C6D1;
}

.bradius {
  border-radius: 10vh 0 0 10vh;
}

.left-margin-menu {
  padding-left: 7vh;
}

.white-link {
  color: white;
}
</style>
