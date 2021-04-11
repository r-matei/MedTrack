<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="5" class="pa-0">
      <img contain class="img-size fixed" :src="img.url" :alt="img.alt">
    </v-col>
    <v-col cols="7" class="pa-0 ma-0">
      <v-img contain class="logo-size mx-auto" :src="logo.url" :alt="logo.alt"></v-img>
      <h1 class="font-weight-bold welcome">Welcome</h1>
      <v-row
        align="center"
        justify="center"
      >
          <div class="login-form">
              <v-tabs v-model="tab" background-color="white" color="#76C6D1" dark grow>
                  <v-tabs-slider color="#76C6D1"></v-tabs-slider>
                  <v-tab v-for="i in tabs" :key="i">
                      <div class="caption py-1">{{ i.name }}</div>
                  </v-tab>
                  <v-tab-item>
                      <v-card>
                          <v-card-text>
                            <v-row>
                                <v-col cols="12" class="px-0 pt-15 pb-0 ma-0">
                                    <v-text-field
                                      color="#76C6D1"
                                      v-model="userLogin.loginEmail"
                                      name="loginEmail"
                                      label="E-mail"
                                      required
                                      :rules="[required]"
                                      outlined></v-text-field>
                                </v-col>
                                <v-col cols="12" class="px-0 py-0 ma-0">
                                    <v-text-field
                                      color="#76C6D1"
                                      v-model="userLogin.loginPassword"
                                      type="password"
                                      name="loginPassword"
                                      label="Password"
                                      hint="At least 8 characters"
                                      required
                                      :rules="[required]"
                                      outlined></v-text-field>
                                </v-col>
                                <v-col cols="12" class="px-0 py-0 ma-0">
                                  <v-btn
                                    :disabled="loading"
                                    class="text-xs font-weight-light forgot-psw pa-0"
                                    color="grey"
                                    plain
                                  >Forgot password?</v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <div class="text-error" v-html="errorLogin"/>
                                <br>
                                <v-col cols="12" class="px-0">
                                    <v-btn x-large block
                                      type="submit"
                                      color="#76C6D1"
                                      class="mt-5 white-text"
                                      @click="login"> Login </v-btn>
                                </v-col>
                            </v-row>
                          </v-card-text>
                      </v-card>
                  </v-tab-item>
                  <v-tab-item>
                      <v-card>
                          <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" class="pt-15 pb-0 pl-0">
                                    <v-text-field
                                      color="#76C6D1"
                                      outlined
                                      v-model="userRegister.firstName"
                                      label="First Name"
                                      maxlength="20"
                                      required
                                      :rules="[required]"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pt-15 pb-0 pr-0">
                                    <v-text-field
                                      color="#76C6D1"
                                      outlined
                                      v-model="userRegister.lastName"
                                      label="Last Name"
                                      maxlength="20"
                                      required
                                      :rules="[required]"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="px-0 py-0">
                                    <v-text-field
                                      color="#76C6D1"
                                      outlined
                                      v-model="userRegister.email"
                                      label="E-mail"
                                      autocomplete="new-password"
                                      required
                                      :rules="[required]"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pl-0 py-0">
                                    <v-text-field
                                      color="#76C6D1"
                                      outlined
                                      block
                                      v-model="userRegister.registerPassword"
                                      type="password"
                                      name="password"
                                      required
                                      :rules="[required]"
                                      autocomplete="new-password"
                                      label="Password"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pr-0 py-0">
                                    <v-text-field
                                      color="#76C6D1"
                                      outlined
                                      block
                                      v-model="userRegister.verify"
                                      type="password"
                                      required
                                      :rules="[required]"
                                      name="verify-password"
                                      label="Confirm Password"></v-text-field>
                                </v-col>
                                <v-col class="px-0 pt-0" cols="12">
                                    <div class="text-error" v-html="errorRegister"/>
                                    <br>
                                    <v-btn x-large block
                                      type="submit"
                                      color="#76C6D1"
                                      class="mt-5 white-text"
                                      @click="register"> Register </v-btn>
                                </v-col>
                            </v-row>
                          </v-card-text>
                      </v-card>
                  </v-tab-item>
              </v-tabs>
          </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      img: {
        url: require('@/assets/poza-login.jpeg'),
        name: 'LoginImage'
      },
      logo: {
        url: require('@/assets/logo-blue.png'),
        name: 'Logo'
      },
      dialog: true,
      tab: 0,
      tabs: [
        {name: 'Login'},
        {name: 'Register'}
      ],
      userRegister: {
        firstName: '',
        lastName: '',
        email: '',
        registerPassword: '',
        verify: ''
      },
      userLogin: {
        loginPassword: '',
        loginEmail: ''
      },
      errorRegister: null,
      errorLogin: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async register () {
      this.errorRegister = null

      const areAllFieldsFilledIn = Object
        .keys(this.userRegister)
        .every(key => !!this.userRegister[key])

      if (!areAllFieldsFilledIn) {
        this.errorRegister = 'Please fill in all the required fields.'
        return
      }

      if (this.userRegister.registerPassword !== this.userRegister.verify) {
        this.errorRegister = 'Password must match.'
        return
      }

      try {
        const response = await AuthenticationService.register({
          firstName: this.userRegister.firstName,
          lastName: this.userRegister.lastName,
          email: this.userRegister.email,
          password: this.userRegister.registerPassword
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setPatient', response.data.patient)
        this.$router.push({
          name: 'questionnaire'
        })
      } catch (error) {
        this.errorRegister = error.response.data.error
      }
    },
    async login () {
      this.errorLogin = null

      const areAllFieldsFilledIn = Object
        .keys(this.userLogin)
        .every(key => !!this.userLogin[key])

      if (!areAllFieldsFilledIn) {
        this.errorLogin = 'Please fill in all the required fields.'
        return
      }

      try {
        const response = await AuthenticationService.login({
          email: this.userLogin.loginEmail,
          password: this.userLogin.loginPassword
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setPatient', response.data.patient)
        this.$router.push({
          name: 'Home'
        })
      } catch (error) {
        this.errorLogin = error.response.data.error
      }
    }
  }

}

</script>

<style scoped>
.img-size {
  height: 100vh;
}

.logo-size {
  width: 50vh;
}

.welcome {
  font-size: 7vh;
  color: #5c5c5c;
  text-align: center;
}

.login-form {
  max-width: 500px;
}

.forgot-psw {
  font-size: 1.3vh;
}

.white-text {
  color: white;
}

.login-form {
  max-width: 60vh;
  margin-top: 10vh;;
}

.theme--dark.v-tabs>.v-tabs-bar .v-tab--disabled, .theme--dark.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active), .theme--dark.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active)>.v-btn, .theme--dark.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active)>.v-icon {
    color: #76C6D1;
}

.text-error {
  color: red;
}

.fixed {
  position: fixed;
}

</style>
