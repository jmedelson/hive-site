<template>
  <div class="hello">
    
    <v-row align="center">
      <v-col cols="12" md="3"><h2>Current Scene: <span v-html="scene"></span></h2></v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="4" md="auto"><v-btn color="#2a07ff" outlined v-on:click="setScene('wait')" v-bind:class="[this.scene == 'wait' ? 'selected':'']">change scene - wait</v-btn></v-col>
      <v-col cols="12" sm="4" md="auto"><v-btn color="#2a07ff" outlined v-on:click="setScene('poll')" v-bind:class="[this.scene == 'poll' ? 'selected':'']">change scene - poll</v-btn></v-col>
      <v-col cols="12" sm="4" md="auto"><v-btn color="#2a07ff" outlined v-on:click="setScene('agree')" v-bind:class="[this.scene == 'agree' ? 'selected':'']">change scene - agree</v-btn></v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3"><h2>Question</h2></v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6"><v-text-field v-model="question" label="Question?" ></v-text-field></v-col>
      <v-col cols="12" md="auto" ><v-btn color="#2a07ff" outlined v-on:click="setQuestion()" class="float-left float-md-right">Submit Question</v-btn></v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3"><h2>Answer</h2></v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6"><v-text-field v-model="answer" label="Answer!" ></v-text-field></v-col>
      <v-col cols="12" md="auto" ><v-btn color="#2a07ff" outlined v-on:click="setAnswer()" class="float-left float-md-right">Submit Answer</v-btn></v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="6"><h2>Was Answer correct: {{correct}}</h2></v-col>
      <v-spacer></v-spacer>
      <v-col cols="6" md="3" ><v-btn block color="#2a07ff" outlined 
      v-on:click="setCorrect(true)" 
      v-bind:class="[this.correct == 'Correct' ? 'selected':'']"
      class="float-none float-md-right">Correct</v-btn></v-col>
      <v-col cols="6" md="3" ><v-btn class="float-none float-md-right" block color="#2a07ff" outlined v-on:click="setCorrect(false)" v-bind:class="[this.correct == 'Incorrect' ? 'selected':'']">Incorrect</v-btn></v-col>    
    </v-row>
    <v-row align="center">
      <v-col cols="0" md="4"></v-col>
      <v-col cols="12" md="4"><v-btn color="#ff1862" elevation="4" block v-on:click="getRespones()">Get Responses</v-btn></v-col>
      <v-spacer></v-spacer>
      <v-col><v-checkbox v-model="autoPoll" label="Auto" @change="setTimer()"></v-checkbox></v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="5"><H2>Last merged ({{this.last.word1}}) into ({{this.last.word2}})</H2></v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="5"><v-btn block color="#2a07ff" outlined class="float-right" v-on:click="undoMerge()"><v-icon>mdi-undo</v-icon> Undo</v-btn></v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="6" sm="4" md="3" xl="2" v-for="(item,index) in items" :key="index" >
        <div class="item-div" v-on:click="itemSelect(item.word)" v-bind:class="[item1 == item.word ? 'first-word':'']"><p class="item-text">{{item.word}}---{{item.count}}</p></div>
      </v-col>
    </v-row>
    <!-- <ul>
      <li class="d-block" :class="item.word" v-for="(item,index) in items" :key="index" v-on:click="itemSelect(item.word)">
        <p>{{item.word}}---{{item.count}}</p>
      </li>
    </ul> -->
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
      correct:'unset',
      items:[],
      rules:{},
      item1:false,
      item2:false,
      last:{
        word1:'',
        word2:'',
        count:0
      },
      autoPoll: false,
      myInterval:''

    }
  },
  created() {
    TestService.getAWSdata()
      .then(
        (([scene,question,answer, correct]) => {
          this.$set(this, "scene", scene);
          this.$set(this, "question", question);
          this.$set(this, "answer", answer);
          if(correct==true){
            this.$set(this, "correct", "Correct");
          }else if(correct==false){
            this.$set(this, "correct", "Incorrect");
          }else{
            this.$set(this, "correct", "unset");
          }
        }).bind(this)
      )
    this.getRespones()
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
      TestService.setData("question",this.question.trim())
      .then(
        (res => {
          console.log(res)
          this.$set(this, "question", res);
          // this.setCorrect("unset")
        }).bind(this)
      )
    },
    async setAnswer(){
      TestService.setData("answer",this.answer.trim())
      .then(
        (res => {
          console.log(res)
          this.$set(this, "correct", "unset");
          // this.setCorrect("unset")
        }).bind(this)
      )
    },
    async setCorrect(ans){
      if(ans){
        console.log("Correct")
      }else{
        console.log("Incorrect")
      }
      TestService.setData("correct",ans)
        .then(
          (res => {
            console.log("++++",res)
            // this.$set(this, "scene", res);
            if(res==true){
              this.$set(this, "correct", "Correct");
            }else if(res==false){
              this.$set(this, "correct", "Incorrect");
            }else{
              this.$set(this, "correct", "unset");
            }
          }).bind(this)
        );
    },
    itemCombine(data){
      let hold = []
      for(let i = 0; i<data.length; i++){
        // console.log(data[i].word in this.rules)
        if(data[i].word in this.rules){
          let check = this.rules[data[i].word]
          // console.log(data[i].word,">>>>>",check)
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
      hold.sort((a, b) => (a.count<b.count)? 1 : -1)
      console.log("HOLD DATA2:::::", hold)
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
    },
    setTimer(){
      this.$nextTick(()=>{
        console.log(this.autoPoll)
        if(this.autoPoll){
          this.getRespones()
          this.myInterval = setInterval(function(){
            console.log("interval called")
            this.getRespones()
          }.bind(this), 30000)
        }else if(!this.autoPoll){
          clearInterval(this.myInterval)
        }
      })
    },
    undoMerge(){
      delete this.rules[this.last.word1]
      this.getRespones()
      this.last = {
        word1:'',
        word2:'',
        count:0
      }
      this.item1 = false;
      this.item2 = false;
      console.log("Merge undone")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-div{
  border: 2px solid black;
}
.item-div:hover{
  background: #d6f7fc;
}
.item-text{
  text-align: center;
  font-size: 20px;
  padding: 10px;
  margin: 5px;
}
.first-word{
  background: #731baa85 !important;
  color: white !important;
}
.selected{
  color:green !important;
  background: lightgreen !important; 
}
#hello{
  background:#d3fffe;
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
