<template>
  <div class="hello">
    
    <v-row align="center">
      <v-col cols="12" sm="12" md="auto"><h2>Current Scene: <span v-html="scene"></span></h2></v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="3" md="auto"><v-btn color="#2a07ff" outlined v-on:click="setScene('hide')" v-bind:class="[this.scene == 'hide' ? 'selected':'']">change scene - hide</v-btn></v-col>
      <v-col cols="12" sm="3" md="auto"><v-btn color="#2a07ff" outlined v-on:click="setScene('wait')" v-bind:class="[this.scene == 'wait' ? 'selected':'']">change scene - wait</v-btn></v-col>
      <v-col cols="12" sm="3" md="auto"><v-btn color="#2a07ff" outlined v-on:click="setScene('poll')" v-bind:class="[this.scene == 'poll' ? 'selected':'']">change scene - poll</v-btn></v-col>
      <v-col cols="12" sm="3" md="auto"><v-btn color="#2a07ff" outlined v-on:click="setScene('agree')" v-bind:class="[this.scene == 'agree' ? 'selected':'']">change scene - agree</v-btn></v-col>
      <v-col cols="12" sm="3" md="auto"><v-btn color="#2a07ff" outlined v-on:click="setScene('choice')" v-bind:class="[this.scene == 'choice' ? 'selected':'']">change scene - choice</v-btn></v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3"><h2>Question</h2></v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6">
        <v-text-field v-model="newQuestion" label="Question?" 
          @keyup.enter="addQuestion()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="auto" ><v-btn color="#2a07ff" outlined 
        v-bind:loading="newQuestionLoading" 
        v-bind:disabled="newQuestionLoading" 
        v-on:click="addQuestion()" class="float-left float-md-right">{{newQuestionButton}}</v-btn></v-col>
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
    <v-col cols="12" md="6"><h2>Choice Settings:</h2></v-col>
    <v-spacer></v-spacer>
    <v-col cols="6" md="2" ><v-btn block color="#2a07ff" outlined 
      v-on:click="choicenum = 2; choiceChange = true" 
      v-bind:class="[this.choicenum == 2 ? 'selected':'']">2</v-btn></v-col>
    <v-col cols="6" md="2" ><v-btn block color="#2a07ff" outlined 
      v-on:click="choicenum = 4; choiceChange = true" 
      v-bind:class="[this.choicenum == 4 ? 'selected':'']">4</v-btn></v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="6"><v-text-field v-model="op1" label='Choice 1' outlined clearable  @input.native="choiceChange = true"></v-text-field></v-col>
      <v-col cols="6"><v-text-field v-model="op2" label='Choice 2' outlined clearable @input.native="choiceChange = true"></v-text-field></v-col>
      <v-col cols="6" v-if="this.choicenum  == 4"><v-text-field v-model="op3" label='Choice 3' outlined clearable @input.native="choiceChange = true"></v-text-field></v-col>
      <v-col cols="6" v-if="this.choicenum  == 4"><v-text-field v-model="op4" label='Choice 4' outlined clearable @input.native="choiceChange = true"></v-text-field></v-col>
    </v-row>
    <v-row align="center">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn block color="#2a07ff" outlined :disabled="!choiceChange" @click="saveChoices()">{{this.choiceChange == false ? 'No Change':'Save'}}</v-btn>
      </v-col>
    </v-row>
    <v-row align="center">
    <v-col cols="auto">
      <h2>Limit respones: </h2>
    </v-col>
    <v-col cols="auto">
      <v-text-field type="number" label="Respone Limit #"
        v-model="limit"
        hint="Set to 0 to not enforce a limit" 
        persistent-hint
        :append-outer-icon="limitSent ? 'mdi-send-clock-outline' : 'mdi-send'"
        v-bind:loading="limitSent" 
        v-bind:disabled="limitSent" 
        @keyup.enter="setLimit()"
        @click:append-outer="setLimit()"
      >
      </v-text-field>
    </v-col>
    <v-col cols="auto">
      <v-checkbox v-model="displayLimit" label="Display Limit" @change="setDisplayLimit()"></v-checkbox>
    </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="4">
        <v-select
        :items="orderQuestions"
        label="Select Question Filter"
        v-model="question"
        v-on:change="setQuestion()"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="4"><v-btn color="#ff1862" elevation="4" block v-on:click="getRespones()">Get Responses</v-btn></v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-text-field
          type="number" 
          label="Auto Refresh Rate"
          v-model="refreshRate">
        </v-text-field>
      </v-col>
      <v-col>
        <v-checkbox v-model="autoPoll" label="Auto" @change="setTimer()">
        </v-checkbox>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-switch class="center-switch"
          v-model="displayComplex"
          :label="`Show Edit View: ${displayComplex.toString()}`"
        ></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <H2>
          Last merged ({{this.last.word1}}) into ({{this.last.word2}})
        </H2>
      </v-col>
      <v-col cols="12" md="4"><v-btn block color="#2a07ff" outlined class="float-right" v-on:click="undoMerge()"><v-icon>mdi-undo</v-icon> Undo</v-btn></v-col>
    </v-row>
    <v-row>
      <v-col cols="6" sm="4" md="3" xl="2" v-for="(item,index) in topResults" :key="index" align="stretch">
        <div v-if="displayComplex" class="complex-item">
          <v-text-field
            label="Word"
            class="complex-input"
            outlined
            v-bind:loading="index==savingIndex" 
            v-bind:disabled="index==savingIndex" 
            v-model="items[index]['word']"
            @keyup.enter="rename(index)"
          ></v-text-field>
          <v-text-field
            label="Count"
            class="complex-input"
            outlined
            v-bind:loading="index==savingIndex" 
            v-bind:disabled="index==savingIndex" 
            v-model="items[index]['count']"
            @keyup.enter="editCount(index)"
          ></v-text-field>
          <ul>
            <li v-for="key in parseKeys(item)" :key="key" class="sublist">
              <span class="mergeItem">&#9679; {{key.substring(5)}} : {{item[key]}}</span>
              <v-btn icon rounded color="red" class="float-right list-item-btn"
              @click="unmerge(item.word,key)"> 
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
            </li>
          </ul>
        </div>
        <div class="item-div" v-on:click="itemSelect(item)" v-bind:class="[item1.word == item.word ? 'first-word':'']" v-else>
          <p class="item-text">
            {{item.word}}---{{item.count}}
          </p>
        </div>
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
      itemsCopy:[],
      rules:{},
      item1:false,
      item2:false,
      last:{
        word1:'',
        word2:'',
        count:0
      },
      autoPoll: false,
      myInterval:'',
      questionHistory:[],
      selectedQuestion:"",
      displayLimit: false,
      limit: 1000,
      limitSent: false,
      newQuestion: "",
      newQuestionButton: "Add Question",
      newQuestionLoading:false,
      displayComplex:false,
      refreshRate:30,
      savingIndex:null,
      choicenum: 2,
      op1:"unloaded",
      op2:"unloaded",
      op3:"unloaded",
      op4:"unloaded",
      choiceChange:false
    }
  },
  created() {
    TestService.getAWSdata()
    .then(
      (([scene,question,answer, correct, limit, displayLimit,choicenum,choice1,choice2,choice3,choice4]) => {
        this.$set(this, "scene", scene);
        this.$set(this, "question", question);
        this.$set(this, "answer", answer);
        this.$set(this, "limit", limit);
        this.$set(this, "displayLimit", displayLimit);
        this.$set(this, "choicenum", choicenum);
        this.$set(this, "op1", choice1);
        this.$set(this, "op2", choice2);
        this.$set(this, "op3", choice3);
        this.$set(this, "op4", choice4);
        if(correct==true){
          this.$set(this, "correct", "Correct");
        }else if(correct==false){
          this.$set(this, "correct", "Incorrect");
        }else{
          this.$set(this, "correct", "unset");
        }
      }).bind(this)
    )
    this.updateQuestionList()
  },
  computed: {
    orderQuestions(){
      let questions = this.questionHistory
      console.log("Ordering questions----",questions.sort())
      return questions
    },
    topResults(){
      let items = this.items
      return items.slice(0,30)
    }
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
    async addQuestion(){
      this.newQuestionLoading = true
      TestService.addQuestion(this.newQuestion.trim())
      .then(
        (res =>{
          console.log("add question:", res)
          this.newQuestionLoading = false
          if(res){
            this.newQuestionButton = "Question Added"
            this.questionHistory.unshift(this.newQuestion)
          }else{
            this.newQuestionButton = "Already Exists"
          }
          this.newQuestion = ""
          setTimeout(() => this.newQuestionButton = "Add Question", 3000);
        }).bind(this)
      )
    },
    async setQuestion(){
      this.$nextTick(()=>{
        console.log("SET QUESTION: ", this.question)
        TestService.setData("question",this.question)
        .then(
          (res => {
            console.log(res)
            this.$set(this, "question", res);
            // this.setCorrect("unset")
            // this.updateQuestionList()
          }).bind(this)
        )
        this.getRespones()
      })
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
    async setLimit(){
      this.limitSent = true
      TestService.setData("limit",this.limit)
      .then(
        (res => {
          console.log(res)
          this.$set(this, "limitSent", false);
          // this.setCorrect("unset")
        }).bind(this)
      )
    },
    async setDisplayLimit(){
      this.$nextTick(()=>{
        TestService.setData("displayLimit",this.displayLimit)
        .then(
          (res => {
            console.log("display limit res:", res)
          })
        )
      })
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
    updateQuestionList(){
      TestService.getVotedata()
      .then(
        (res=>{
            console.log(res)
            res= res.reverse()
            this.$set(this, "questionHistory", res);
            this.$set(this, "selectedQuestion", this.questionHistory[0]);
            this.getRespones()
        }).bind(this)
      ) 
    },
    async getRespones(){
      TestService.getResponse(this.question)
      .then(
        (res => {
          console.log("RESPONSE DATA: ", res)
          // res = this.itemCombine(res)
          this.$set(this, "items", res);
          this.$set(this, "itemsCopy", JSON.parse(JSON.stringify(res)));
        }).bind(this)
      )
      console.log("items", this.items)
    },
    async sendReset(){
      TestService.sendReset()
    },
    async saveChoices(){
      TestService.sendChoices(this.choicenum, this.op1,this.op2,this.op3,this.op4)
      .then(
        (res=>{
          console.log(res)
          if(res  == 'success4'){
            this.$set(this, "choiceChange", false);
          }
        })
      )
    },
    itemSelect(word){
      if(!this.item1){
        this.item1 = word;
        console.log(word,this.item1.word, this.item2.word)
      }else if(!this.item2){
        this.item2 = word;
        console.log(word,this.item1.word, this.item2.word)
        if(this.item1 == this.item2){
          console.log("dup item protection")
          this.item1= false;
          this.item2= false;
          return
        }
        TestService.mergeAnswer(this.question, this.item1, this.item2)
        .then(
          (res=>{
            console.log("merged res:", res)
            this.getRespones()
          }).bind(this)
        )
        this.item1= false;
        this.item2= false;

        // this.items = this.itemCombine(this.items)
      }
    },
    setTimer(){
      this.$nextTick(()=>{
        console.log(this.autoPoll)
        let refreshRate = this.refreshRate
        if(refreshRate < 2){
          refreshRate = 2
        }
        if(refreshRate>60){
          refreshRate = 60
        }
        refreshRate = refreshRate * 1000
        if(this.autoPoll){
          this.getRespones()
          this.myInterval = setInterval(function(){
            console.log("interval called")
            this.getRespones()
          }.bind(this), refreshRate)
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
    },
    unmerge(word,unmerge){
      console.log(word,unmerge)
      TestService.undoMerge(this.question, word, unmerge)
      .then(
        (res=>{
          console.log("unmerge res:", res)
          this.getRespones()
        }).bind(this)
      )
    },
    rename(index){
      this.savingIndex = index
      console.log(this.items[index].word, "///", this.itemsCopy[index].word)
      if(this.items[index].word == this.itemsCopy[index].word){
        console.log("dup protection check triggered")
        return
      }
      TestService.rename(this.question, this.itemsCopy[index].word, this.items[index].word)
      .then(
        (res=>{
          console.log("Rename res:", res)
          this.savingIndex = null
        }).bind(this)
      )
    },
    editCount(index){
      this.savingIndex = index
      TestService.editCount(this.question, this.itemsCopy[index].word, this.items[index].count)
      .then(
        (res=>{
          console.log("Rename res:", res)
          this.savingIndex = null
          this.getRespones()
        }).bind(this)
      )
    },
    parseKeys(item){
      let keys = Object.keys(item)
      let parsed = keys.filter(key =>key.includes("merge"))
      return parsed
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
.complex-item{
  border: 2px solid black;
  padding: 6px;
}
.complex-input{
  text-align: center;
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
.sublist{
  border: none;
  margin: 0;
  width: 98%;
  line-height: 26px;
}
.list-item-btn{
  height: 26px !important;
  width: 26px !important;
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
.center-switch{
  display: flex;
  justify-content: center;
}
.mergeItem{
  max-width: 80%;
  display: inline-block;
}
</style>
