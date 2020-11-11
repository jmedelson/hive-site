<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Scene Select</h2>
    <h2>Current Scene: <span v-html="event"></span></h2>
    <button v-on:click="testTwitch('wait')">change scene - wait</button>
    <button v-on:click="testTwitch('poll')">change scene - poll</button>
    <button v-on:click="testTwitch('agree')">change scene - agree</button>
  </div>
</template>

<script>
import TestService from '../services/TestService.js';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    // initialize the event object
    return {
      event: "unloaded"
    }
  },
  created() {
    //this.getEventData();
  },
  methods: {
    async getEventData() {
      // Get the access token from the auth wrapper
      // Use the eventService to call the getEventSingle method
      TestService.getEvents()
      .then(
        (event => {
          this.$set(this, "event", event);
        }).bind(this)
      );
    },
    async testTwitch(scene){
      this.$set(this, "event", '&#8987;');
      TestService.sendTwitch(scene)
      .then(
        (res => {
          this.$set(this, "event", res);
        }).bind(this)
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
