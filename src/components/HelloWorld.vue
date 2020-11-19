<template>
  <div class="hello">
    <h1>{{ msg }} <img id="icon" src="../assets/hive.png" alt=""></h1>
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
    <h2>--Was Answer Correct--</h2>
    <button class="correct" v-on:click="setCorrect(true)">Correct</button>
    <button class="correct" v-on:click="setCorrect(false)">Incorrect</button>
    <button id="get-resp" v-on:click="getRespones()">Get Responses</button>
    <ul>
      <li class="d-block" v-for="(item,index) in items" :key="index">
        <p>{{item.word}}---{{item.count}}</p>
      </li>
    </ul>
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
      items:[],
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
      TestService.setData("scene", scene)
      .then(
        (res => {
          console.log("++++",res)
          this.$set(this, "scene", res);
        }).bind(this)
      );
    },
    async setQuestion(){
      TestService.setData("question",this.question)
    },
    async setAnswer(){
      TestService.setData("answer",this.answer)
    },
    async setCorrect(ans){
      if(ans){
        console.log("Correct")
      }else{
        console.log("Incorrect")
      }
    },
    async getRespones(){
      TestService.getResponse()
      .then(
        (res => {
          console.log("RESPONSE DATA: ", res)
          this.$set(this, "items", res);
        }).bind(this)
      )
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
  display: block;
  margin: 6px auto;
  border: 3px solid black;
  width: 60%;
}
a {
  color: #42b983;
}
#icon{
  width: 40px;
}
#get-resp{
  display: block;
  margin: auto;
  font-size: 30px;
  font-weight: bold;
  margin-top:20px;
}
.correct{
  margin: auto 38px;
  font-size: 20px;
}
</style>
