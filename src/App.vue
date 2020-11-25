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
        <v-btn
            color="#ff1862"
            elevation="4"
            rounded
            v-on:click="sendReset()"
          >Click to Reset</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <HelloWorld :key="childKey"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import TestService from './services/TestService.js';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
    childKey:0,
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
  }
};
</script>
