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
        <v-btn color="#141386" rounded v-on:click="display=0" class="mr-4" v-bind:class="[this.display == 0 ? 'selected':'']">Home</v-btn>
        <v-btn color="#141386" rounded v-on:click="display=1" class="mr-4" v-bind:class="[this.display == 1 ? 'selected':'']">Poll Results</v-btn>
        <v-btn color="#141386" rounded v-on:click="display=2" class="mr-4" v-bind:class="[this.display == 2 ? 'selected':'']">Control Panel</v-btn>
        <!-- <v-btn
            color="#ff1862"
            elevation="4"
            rounded
            v-on:click="sendReset()"
          >Click to Reset</v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <HelloWorld :key="childKey" v-if="display==0"/>
        <VoteHistory v-else-if="display==1"/>
        <ControlPanel v-else-if="display==2"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import VoteHistory from './components/VoteHistory';
import ControlPanel from './components/ControlPanel';
import TestService from './services/TestService.js';

export default {
  name: 'App',

  components: {
    HelloWorld,
    VoteHistory,
    ControlPanel,
  },

  data: () => ({
    //
    childKey:0,
    scene:"Poll Results",
    display:0
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
    // changeScene(){
    //   if(this.display){
    //     this.display = false
    //     this.scene= "Home"
    //   }else{
    //     this.display = true
    //     this.scene= "Poll Results"
    //   }
    // }
  }
};
</script>
<style scoped>
.selected{
  background-color: #a80c0c !important;
  border-color: #a80c0c !important;
}
</style>