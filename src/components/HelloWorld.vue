<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Scene Select</h2>
    <h3>Current Scene: <span v-html="scene"></span></h3>
    <button v-on:click="setScene('wait')">change scene - wait</button>
    <button v-on:click="setScene('poll')">change scene - poll</button>
    <button v-on:click="setScene('agree')">change scene - agree</button>
    <h2>Question Input</h2>
    <input v-model="question" placeholder="question?">
    <button v-on:click="setQuestion()">Submit Question</button>
    <h2>Answer</h2>
    <input v-model="answer" placeholder="Answer">
    <button v-on:click="setAnswer()">Submit Answer</button>
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
      scene: "unloaded",
      question: "",
      answer:'',
    }
  },
  created() {
    TestService.getAWSdata()
      .then(
        (([scene,question,answer]) => {
          this.$set(this, "scene", scene);
          this.$set(this, "question", question);
          this.$set(this, "answer", answer);
        }).bind(this)
      )
  },
  methods: {
    async setScene(scene){
      this.$set(this, "scene", '&#8987;');
      TestService.setScene(scene)
      .then(
        (res => {
          this.$set(this, "scene", res);
        }).bind(this)
      );
    },
    async setQuestion(){
      TestService.setData("question",this.question)
    },
    async setAnswer(){
      TestService.setData("answer",this.answer)
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
