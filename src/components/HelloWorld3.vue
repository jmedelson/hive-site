<template>
  <div class="hello">
    <h1>{{ msg }} <img id="icon" src="../assets/hive.png" alt=""></h1>
    <a v-on:click="sendReset()" id='reset-button' class="button">Click to reset</a>
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
    <h2>--Answer was: {{result}}--</h2>
    <button class="correct" v-on:click="setCorrect(true)">Correct</button>
    <button class="correct" v-on:click="setCorrect(false)">Incorrect</button>
    <button id="get-resp" v-on:click="getRespones()">Get Responses</button>
    <img src="../assets/undo.png" alt="undo icon" id="undo-icon">
    <ul>
      <li class="d-block" :class="item.word" v-for="(item,index) in items" :key="index" v-on:click="itemSelect(item.word)">
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
      result:'unset',
      items:[],
      rules:{},
      item1:false,
      item2:false,
      last:{
        word1:'',
        word2:'',
        count:0
      }
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
    itemCombine(data){
      let hold = []
      for(let i = 0; i<data.length; i++){
        console.log(data[i].word in this.rules)
        if(data[i].word in this.rules){
          let check = this.rules[data[i].word]
          console.log(data[i].word,">>>>>",check)
          for(let j = 0; j<data.length; j++){
            if(data[j].word == check){
              data[j].count += data[i].count
              data[i].count = 0
            }
          }
        }
      }
      for(let k = 0; k<data.length; k++){
        if(data[k].count>0){
          hold.push(data[k])
        }
      }
      console.log("HOLD DATA:::::", hold)
      return(hold)
    },
    async getRespones(){
      TestService.getResponse()
      .then(
        (res => {
          console.log("RESPONSE DATA: ", res)
          res = this.itemCombine(res)
          this.$set(this, "items", res);
        }).bind(this)
      )
      console.log("items", this.items)
      console.log("computed",this.combinedResults)
    },
    async sendReset(){
      TestService.sendReset()
    },
    itemSelect(word){
      console.log(word,this.item1, this.item2)
      if(!this.item1){
        this.item1 = word;
      }else if(!this.item2){
        this.item2 = word;
        this.rules[this.item1] = this.item2;
        console.log(this.rules)
        for(let i = 0; i<this.items.length; i++){
          if(this.item1 == this.items[i].word){
            this.last = {
              word1:this.item1,
              word2:this.item2,
              count:this.items[i].count
            }
          }
        }
        this.item1 = false;
        this.item2 = false;
        this.items = this.itemCombine(this.items)
      }
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
#reset-button{
  background: red;
  color: white;
  font-size: 25px;
}
#reset-button:hover{
background: darkred;
}
#reset-button:active{
  background: black;
  color: red;
}
.button {
  font: bold 11px Arial;
  text-decoration: none;
  background-color: #EEEEEE;
  color: #333333;
  padding: 2px 6px 2px 6px;
  border-top: 1px solid #CCCCCC;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #CCCCCC;
}
#undo-icon{
  margin: 15px auto;
  width: 40px;
}
</style>
