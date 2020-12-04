<template>
  <v-app>
    <v-app-bar
      app
      color="#2a07ff"
      dark
    >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/hive.png"
          transition="scale-transition"
          width="40"
        />

        <v-toolbar-title> HiveMind Helper Site </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="#141386" rounded v-on:click="changeScene()" class="mr-4">Go to: {{scene}}</v-btn>
        <v-btn
            color="#ff1862"
            elevation="4"
            rounded
            v-on:click="sendReset()"
          >Click to Reset</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <HelloWorld :key="childKey" v-if="display"/>
        <VoteHistory v-else/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import VoteHistory from './components/VoteHistory';
import TestService from './services/TestService.js';

export default {
  name: 'App',

  components: {
    HelloWorld,
    VoteHistory,
  },

  data: () => ({
    //
    childKey:0,
    scene:"Poll Results",
    display:true
  }),
  methods: {
    async sendReset(){
      TestService.sendReset()
      .then(
        (res => {
          console.log("RESPONSE DATA: ", res)
          if(res == 0){
            console.log("reload child")
            this.childKey += 1
          }
        }).bind(this)
      )
    },
    changeScene(){
      if(this.display){
        this.display = false
        this.scene= "Home"
      }else{
        this.display = true
        this.scene= "Poll Results"
      }
    }
  }
};
</script>
