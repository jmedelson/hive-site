<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <v-card>
                <v-card-title class="headline red darken-2">
                    Confirm Deletion
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-2">
                    <h2>{{selectedQuestion}}</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn text color="red darken-4"
                    @click="deleteItem()">
                        Delete Question
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary"
                    @click="dialog = false"
                    >
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-tabs v-model="tab">
            <v-tab>Delete Questions</v-tab>
            <v-tab>Blocked Words</v-tab>
            <v-tab>Mapped Words</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <ul>
                    <li v-for="item in questions" :key="item"
                        v-on:click="openDialog(item)"
                    >
                        <h3 class="d-inline-block">{{item}}</h3><span class="float-right"><v-icon class="icon-hover">mdi-delete-forever</v-icon></span>
                    </li>
                </ul>
            </v-tab-item>
            <v-tab-item>
                <h1>Add/Delete Blocked Words</h1>
                <v-row>
                    <v-col>
                        <v-text-field
                            label="Add Blocked Word"
                            v-model="newBlockedWord"
                            v-bind:loading="blockSent" 
                            v-bind:disabled="blockSent" 
                            @keyup.enter="addBlockedWord()"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn @click="addBlockedWord()"
                            v-bind:loading="blockSent" 
                            v-bind:disabled="blockSent" >
                            Add
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="8">
                        <v-btn block
                            v-bind:loading="mapLoad" 
                            v-bind:disabled="mapLoad"
                            @click="getWordMap()">
                            Get blocked words
                        </v-btn>
                    </v-col>
                </v-row>
                 <ul>
                    <li v-for="(item,index) in blockedWords" :key="item.word"
                        @click="deleteBlock(index)"
                        ><h3 class="d-inline-block">{{item.word}}</h3>
                        <h3 class="d-inline-block float-right" v-if="item.selected">Click again to delete</h3></li>
                 </ul>
                
            </v-tab-item>
            <v-tab-item>
                <h1>Mapped Words</h1>
                <v-btn block
                    color="red accent-2"
                    v-bind:loading="mapLoad" 
                    v-bind:disabled="mapLoad"
                    @click="getWordMap()">
                    Get Mapped words
                </v-btn>
                <h2>New Word Map</h2>
                <v-row>
                    <v-col cols="12" md="4">
                        <h1>Word</h1>
                    </v-col>
                    <v-col cols="12" md="5">
                        <h1>Replace With</h1>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Old Word" v-model="oldWord">

                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="New Word" v-model="newWord">
                            
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-btn
                            block
                            @click="addWordMap()">
                            Add Word Map
                        </v-btn>
                    </v-col>
                </v-row>
                <div v-if="mappedWords.length>0">
                    <h2>Saved Mapped Words</h2>
                </div>
                <v-row v-for="(item,index) in mappedWords" :key="index">
                    <v-col cols="12" md="4">
                        <v-text-field label="Old Word" v-model="item.word" disabled>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="New Word" v-model="item.map"
                            v-bind:loading="item.loading" 
                            v-bind:disabled="item.loading"
                            @keyup.enter="editWordMap(index)">       
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" md="2">
                        <v-btn
                            block
                            v-bind:loading="item.loading" 
                            v-bind:disabled="item.loading"
                            @click="editWordMap(index)">
                            Save Map
                        </v-btn>
                    </v-col>
                    <v-col cols="6" md="2">
                        <v-btn
                            block
                            color="red"
                            @click="deleteMap(index)">
                            {{item.buttonText}}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>
<script>
import TestService from '../services/TestService.js';
export default {
    name: 'DataPanel',
    props: {
        msg: String
    },
    data() {
        return {
            tab: null,
            questions:[],
            selectedQuestion:"",
            dialog: false,
            deleteLoading: false,
            newBlockedWord:"",
            blockedWords:[],
            mappedWords:[],
            mappedWordsCheck:[],
            mapLoad:false,
            blockSent: false,
            lastDeleteClickIndex:null,
            oldWord: "",
            newWord: "",
            lastBlockSelected:null,
        }
    },
    created() {
        TestService.getVotedata()
        .then(
            (res=>{
                console.log(res)
                res = res.reverse()
                this.$set(this, "questions", res);
            }).bind(this)
        )
    },
    methods: {
        deleteItem(){
            TestService.removeQuestion(this.selectedQuestion)
            .then(
                (res=>{
                    console.log(res)
                    if(res=="success"){
                        let index = this.questions.indexOf(this.selectedQuestion)
                        this.questions.splice(index,1)
                        this.dialog=false
                    }
                }).bind(this)
            )
        },
        openDialog(item){
            this.selectedQuestion = item
            this.dialog=true
        },
        addBlockedWord(){
            this.blockSent = true
            TestService.addBlockedWord(this.newBlockedWord)
            .then(
                (res=>{
                    console.log(res)
                    let tempItem={
                        word:this.newBlockedWord,
                        map:"XXXXX",
                        selected:false
                    }
                    this.blockedWords.push(tempItem)
                    this.newBlockedWord = ""
                    this.blockSent = false
                }).bind(this)
            )
        },
        getWordMap(){
            this.mapLoad=true
            TestService.getWordMap()
            .then(
                (res=>{
                    this.blockedWords = []
                    this.mappedWords = []
                    this.mappedWordsCheck = []
                    console.log(res)
                    for(let item of res){
                        if(item.map == "XXXXX"){
                            item["selected"] = false
                            this.blockedWords.push(item)
                        }else{
                            item["loading"] = false
                            item["buttonText"] = "Delete Map"
                            this.mappedWords.push(item)
                        }                    
                    }
                    this.mappedWordsCheck = JSON.parse(JSON.stringify(this.mappedWords))
                    this.mapLoad = false;
                    console.log(this.mappedWords)
                }).bind(this)
            )
        },
        addWordMap(){
            let oldWord = this.oldWord.trim()
            let newWord = this.newWord.trim()
            if(oldWord.length>0 && newWord.length>0){
                TestService.setWordMap(oldWord,newWord)
                .then(
                    (res=>{
                        console.log(res)
                        let item = {
                            word: oldWord,
                            map: newWord,
                            loading: false,
                            buttonText:"Delete Map"
                        }
                        this.mappedWords.push(item)
                        this.mappedWordsCheck = JSON.parse(JSON.stringify(this.mappedWords))
                        this.oldWord = ""
                        this.newWord = ""
                    }).bind(this)
                )
            }else{
                console.log("length limit not reached: ",oldWord,newWord)
            }
        },
        editWordMap(index){
            this.mappedWords[index].loading=true
            console.log(this.mappedWords[index].map,"//",this.mappedWordsCheck[index].map)
            if(this.mappedWords[index].map == this.mappedWordsCheck[index].map){
                console.log(true)
                this.mappedWords[index].loading=false
                return
            }else{
                if(this.mappedWords[index].map.length<1){
                    console.log("min word length not me")
                    this.mappedWords[index].loading=false
                    return
                }
                console.log(false)
                let mapWord = this.mappedWords[index].map
                mapWord = mapWord.trim()
                TestService.setWordMap(this.mappedWords[index].word, mapWord)
                .then(
                    (res=>{
                        console.log(res)
                        this.mappedWordsCheck = JSON.parse(JSON.stringify(this.mappedWords))
                        this.mappedWords[index].loading=false
                    })
                )
            }

        },
        deleteMap(index){
            if(this.lastDeleteClickIndex == index){
                console.log(true)
                TestService.deleteMap(this.mappedWords[index].word)
                 .then(
                    (res=>{
                        console.log(res)
                        this.mappedWords.splice(index, 1)
                        this.mappedWordsCheck.splice(index, 1)
                    })
                )
            }else{
                if(this.lastDeleteClickIndex == null){
                    this.lastDeleteClickIndex = index
                    this.mappedWords[this.lastDeleteClickIndex].buttonText = 'Click to Confirm'
                    return
                }
                this.mappedWords[this.lastDeleteClickIndex].buttonText = 'Delete Map'
                this.lastDeleteClickIndex = index
                this.mappedWords[this.lastDeleteClickIndex].buttonText = 'Click to Confirm'
                
                console.log(false)
            }
        },
        deleteBlock(index){
            if(!this.blockedWords[index].selected){
                this.blockedWords[index].selected = true
                if(this.lastBlockSelected != null){
                    this.blockedWords[this.lastBlockSelected].selected = false
                    this.lastBlockSelected = index
                }
                this.lastBlockSelected = index
                return
            }
            this.lastBlockSelected= null
            let word = this.blockedWords[index].word
            TestService.deleteMap(word)
            .then(
                (res=>{
                    console.log(res)
                    this.blockedWords.splice(index, 1)
                })
            )
            console.log(word)
        }
    },
}
</script>
<style scoped>
li:hover{
    background: red;
    color: white;
}
.icon-hover{
    transition: transform .2s ease-in-out; 
}
.icon-hover:hover{
    transform: scale(1.2);
}
</style>