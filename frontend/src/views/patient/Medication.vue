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
            <p class="text-h5 font-weight-bold mt-16 mx-16">Bine ai venit, {{user.firstName}} {{user.lastName}} !</p>
            <p class="text-subtitle1 font-weight-regular mx-16">Nu uita de medicația ta zilnică!</p>
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
                <p class="text-h5 font-weight-bold text-color mx-2 mt-2 mb-6">Medicație</p>
              </v-card-title>
              <row align="center">
                <v-simple-table>
                  <template>
                    <thead>
                      <tr>
                        <th class="text-center">
                          Nume
                        </th>
                        <th class="text-center">
                          Cantitate
                        </th>
                        <th class="text-center">
                          Perioadă
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
            </v-card>
          </v-col>
          <!-- online chat -->
          <v-col cols="6" class="pa-5">
            <v-card width="70vh" height="45vh" class="rounded-xl" elevation="2">
              <v-card-title>
                <img width="35vh" class="ml-2" :src="chatImage.url" :alt="chatImage.alt">
                <p class="text-h5 font-weight-bold text-color ma-2">Chat online</p>
              </v-card-title>
              <v-avatar class="ml-5 mt-0">
                <v-img :src="require('../../assets/Pictures/' + supervisor.img)"></v-img>
              </v-avatar>
              <p class="d-inline text-h7 font-weight-bold text-color ml-3">Dr. {{ supervisor.firstName }} {{ supervisor.lastName }}</p>

              <v-container>
                <v-card
                  height="24vh"
                  elevation="0"
                  class="scroll-y"
                  id="chat-card"
                  >
                  <v-row class="align-end fill-height">
                    <v-col class="pa-0 mr-7 mb-2">
                      <div class="my-2" v-for="message in messages" :key="message">
                        <span v-if="parseInt(message.userId) === parseInt(username) && parseInt(message.to) === parseInt(supervisor.id)" class="d-flex justify-end">
                          {{message.message}}
                          <v-avatar size="3vh">
                            <v-img :src="require('../../assets/Pictures/' + loggedUser.img)"></v-img>
                          </v-avatar>
                        </span>
                        <span v-if="parseInt(message.to) === parseInt(username) && parseInt(message.userId) === parseInt(supervisor.id)" class="ml-5">
                          <v-avatar size="3vh">
                            <v-img :src="require('../../assets/Pictures/' + supervisor.img)"></v-img>
                          </v-avatar>
                          {{message.message}}
                        </span>
                      </div>
                    </v-col>
                  </v-row>

                </v-card>

                <!-- write new message -->
                <v-row class="mb-3 ml-2">
                  <v-col cols="11">
                    <v-text-field
                    label="Aa"
                    solo
                    v-model="newMessage"
                    dense
                    @keyup.enter="send()"
                  ></v-text-field>
                  </v-col>
                  <v-col cols="1" class="pt-3 pl-0">
                    <v-btn
                    icon
                    color="grey"
                    @click="send()"
                  >
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                  </v-col>
                </v-row>
              </v-container>
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
import UserService from '../../services/UserService'
import {mapState} from 'vuex'
import MessageService from '../../services/MessageService'

import io from 'socket.io-client'
var socket = io('http://localhost:8081')

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
      clinicalTrial: {},
      supervisor: {},
      // chat data
      newMessage: null,
      messages: [],
      username: null,
      loggedUser: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  created () {
    socket.on('chat-message', (data) => {
      this.messages.push({
        message: data.message,
        userId: data.userId,
        to: data.to
      })
    })
  },
  updated () {
    setTimeout(() => {
      let elem = document.getElementById('chat-card')
      elem.scrollTop = elem.scrollHeight
    })
  },
  async mounted () {
    this.clinicalTrial = (await TrialsService.index()).data
    this.loggedUser = (await UserService.showUser(this.user.id)).data
    this.medication = (await MedicationService.index()).data
    this.supervisor = (await UserService.showUser(this.loggedUser.supervisorId)).data

    // populeaza messages
    this.messages = (await MessageService.index(this.user.id)).data

    // emit 'joined' event to server
    this.username = this.user.id
    socket.emit('joined', this.username)
  },
  methods: {
    send () {
      this.messages.push({
        message: this.newMessage,
        userId: this.username,
        to: this.supervisor.id
      })

      socket.emit('chat-message', {
        message: this.newMessage,
        userId: this.username,
        to: this.supervisor.id
      })
      this.newMessage = null
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

.bottom {
  margin-top: 2vh;
  margin-right: 1.3vh;
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
