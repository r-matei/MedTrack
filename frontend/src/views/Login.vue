<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="5" class="pa-0">
      <img contain class="img-size" :src="img.url" :alt="img.alt">
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
                              <v-form ref="loginForm" v-model="valid" lazy-validation>
                                  <v-row>
                                      <v-col cols="12" class="px-0 pt-15 pb-0 ma-0">
                                          <v-text-field color="#76C6D1" v-model="loginEmail" label="E-mail" required outlined></v-text-field>
                                      </v-col>
                                      <v-col cols="12" class="px-0 py-0 ma-0">
                                          <v-text-field color="#76C6D1" v-model="loginPassword" :type="password" name="password" label="Password" hint="At least 8 characters" outlined></v-text-field>
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
                                      <v-col cols="12" class="px-0">
                                          <v-btn x-large block
                                            type="submit"
                                            color="#76C6D1"
                                            class="mt-5 white-text"
                                            :disabled="!valid"
                                            @click="validate"> Login </v-btn>
                                      </v-col>
                                  </v-row>
                              </v-form>
                          </v-card-text>
                      </v-card>
                  </v-tab-item>
                  <v-tab-item>
                      <v-card>
                          <v-card-text>
                              <v-form ref="registerForm" v-model="valid" lazy-validation>
                                  <v-row>
                                      <v-col cols="12" sm="6" md="6" class="pt-15 pb-0 pl-0">
                                          <v-text-field color="#76C6D1" outlined v-model="firstName" label="First Name" maxlength="20" required></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="6" class="pt-15 pb-0 pr-0">
                                          <v-text-field color="#76C6D1" outlined v-model="lastName" label="Last Name" maxlength="20" required></v-text-field>
                                      </v-col>
                                      <v-col cols="12" class="px-0 py-0">
                                          <v-text-field color="#76C6D1" outlined v-model="email" label="E-mail" required></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="6" class="pl-0 py-0">
                                          <v-text-field color="#76C6D1" outlined block v-model="password" :type="password" name="password" label="Password"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="6" class="pr-0 py-0">
                                          <v-text-field color="#76C6D1" outlined block v-model="verify" :type="password" name="verify-password" label="Confirm Password"></v-text-field>
                                      </v-col>
                                      <v-col class="px-0 pt-0" cols="12">
                                          <v-btn x-large block
                                            type="submit"
                                            color="#76C6D1"
                                            class="mt-5 white-text"
                                            :disabled="!valid"
                                            @click="validate"> Register </v-btn>
                                      </v-col>
                                  </v-row>
                              </v-form>
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
      valid: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      verify: '',
      loginPassword: '',
      loginEmail: ''
    }
  },
  computed: {
    passwordMatch () {
      return () => this.password === this.verify || 'Password must match'
    }
  },
  methods: {
    validate () {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
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

</style>
