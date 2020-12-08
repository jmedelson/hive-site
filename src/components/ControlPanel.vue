<template>
    <div>
        <H1>Control Panel</H1>
        <v-row>
            <v-col cols="12" sm="6" class="playerCard">
                <v-row align="center">
                    <v-col cols="6">
                        <h1>Player 1</h1>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field  
                            label="Player 1 Name" v-model="main.stream1name"
                            v-bind:loading="stream1name" 
                            v-bind:disabled="stream1name" 
                            :append-outer-icon="stream1name ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'stream1name', main.stream1name)"
                            @click:append-outer="sendClick( 'stream1name', main.stream1name)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h2>Player 1 Score</h2>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field type="number" 
                            label="Player 1 Score" v-model="main.p1score" 
                            v-bind:loading="p1score" 
                            v-bind:disabled="p1score" 
                            :append-outer-icon="p1score ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'p1score', main.p1score)"
                            @click:append-outer="sendClick( 'p1score', main.p1score)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h2>Player 1 Life</h2>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field type="number" 
                            label="Player 1 Life" v-model="main.p1life"
                            v-bind:loading="p1life" 
                            v-bind:disabled="p1life" 
                            :append-outer-icon="p1life ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'p1life', main.p1life)"
                            @click:append-outer="sendClick( 'p1life', main.p1life)"></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="6" class="playerCard">
                <v-row align="center">
                    <v-col cols="6">
                        <h1>Player 2</h1>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field  
                            label="Player 2 Name" v-model="main.stream2name"
                            v-bind:loading="stream2name" 
                            v-bind:disabled="stream2name" 
                            :append-outer-icon="stream2name ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'stream2name', main.stream2name)"
                            @click:append-outer="sendClick( 'stream2name', main.stream2name)">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h2>Player 2 Score</h2>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field type="number" 
                            label="Player 2 Score" v-model="main.p2score"
                            v-bind:loading="p2score" 
                            v-bind:disabled="p2score" 
                            :append-outer-icon="p2score ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'p2score', main.p2score)"
                            @click:append-outer="sendClick( 'p2score', main.p2score)">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h2>Player 2 Life</h2>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field type="number" 
                            label="Player 2 Life" v-model="main.p2life"
                            v-bind:loading="p2life" 
                            v-bind:disabled="p2life" 
                            :append-outer-icon="p2life ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'p2life', main.p2life)"
                            @click:append-outer="sendClick( 'p2life', main.p2life)"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="6" class="playerCard">
                <v-row align="center">
                    <v-col cols="6">
                        <h1>Player 3</h1>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field  
                            label="Player 3 Name" v-model="main.stream3name"
                            v-bind:loading="stream3name" 
                            v-bind:disabled="stream3name" 
                            :append-outer-icon="stream3name ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'stream3name', main.stream3name)"
                            @click:append-outer="sendClick( 'stream3name', main.stream3name)">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h2>Player 3 Score</h2>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field type="number" 
                            label="Player 3 Score" v-model="main.p3score"
                            v-bind:loading="p3score" 
                            v-bind:disabled="p3score" 
                            :append-outer-icon="p3score ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'p3score', main.p3score)"
                            @click:append-outer="sendClick( 'p3score', main.p3score)">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h2>Player 3 Life</h2>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field type="number" 
                            label="Player 3 Life" v-model="main.p3life"
                            v-bind:loading="p3life" 
                            v-bind:disabled="p3life" 
                            :append-outer-icon="p3life ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'p3life', main.p3life)"
                            @click:append-outer="sendClick( 'p3life', main.p3life)">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="6" class="playerCard">
                <v-row align="center">
                    <v-col cols="6">
                        <h1>Player 4</h1>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field  
                            label="Player 4 Name" v-model="main.stream4name"
                            v-bind:loading="stream4name" 
                            v-bind:disabled="stream4name" 
                            :append-outer-icon="stream4name ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'stream4name', main.stream4name)"
                            @click:append-outer="sendClick( 'stream4name', main.stream4name)">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h2>Player 4 Score</h2>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field type="number" 
                            label="Player 4 Score" v-model="main.p4score"
                            v-bind:loading="p4score" 
                            v-bind:disabled="p4score" 
                            :append-outer-icon="p4score ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'p4score', main.p4score)"
                            @click:append-outer="sendClick( 'p4score', main.p4score)">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h2>Player 4 Life</h2>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field type="number" 
                            label="Player 4 Life" v-model="main.p4life"
                            v-bind:loading="p4life" 
                            v-bind:disabled="p4life" 
                            :append-outer-icon="p4life ? 'mdi-send-clock-outline' : 'mdi-send'"
                            @keyup.enter="sendClick( 'p4life', main.p4life)"
                            @click:append-outer="sendClick( 'p4life', main.p4life)">
                            </v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col cols="auto">
                <v-btn
                    elevation="3"
                    icon
                    fab
                    dark
                    color="teal"
                    v-bind:loading="loadingQuestions" 
                    v-bind:disabled="loadingQuestions" 
                    v-on:click="getQuestions()"
                ><v-icon>mdi-refresh</v-icon></v-btn>
            </v-col>
            <v-col cols="6">
                <v-select
                    :items="questions"
                    label="Select Question Filter"
                    v-model="selected"
                    v-on:change="changeQuestion()"
                ></v-select>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col  cols="12" sm="3" ><v-btn v-on:click="reset()" block color="red lighten-1">Reset</v-btn></v-col>
            <v-col cols="0" sm="1" class="d-none d-sm-block"></v-col>
            <v-col cols="12" sm="3"><v-btn v-on:click="save()" block color="green accent-4" :loading="loading">Save All</v-btn></v-col>
        </v-row>
        
    </div>
</template>
<script>
import TestService from '../services/TestService.js';
export default {
    name: 'ControlPanel',
    props: {
        msg: String
    },
    data(){
        return{
            main:{},
            loading: false,
            stream1name:false,
            stream2name:false,
            stream3name:false,
            stream4name:false,
            p1score:false,
            p2score:false,
            p3score:false,
            p4score:false,
            p1life:false,
            p2life:false,
            p3life:false,
            p4life:false,
            questions:[],
            selected:"",
            loadingQuestions:false
        }
    },
    computed: {
        
    },
    created() {
        TestService.getControlPanelData()
        .then(
            (res=>{
                console.log(res)
                 this.$set(this, "main", res);
            }).bind(this)
        )
        this.getQuestions()
        TestService.getAWSdata()
        .then(
            (res => {
                console.log("AWS DATA")
                console.log(res)
                console.log(res[6])
                this.$set(this, "selected", res[6]);
            }).bind(this)
        )
    },
    methods: {
        async sendClick(field, value){
            this[field] = true
            console.log("Control panel do something")
            TestService.setConsoleData(field, value)
            .then(
                (res=>{
                    console.log(res)
                    if(res == "success"){
                        this[field] = false
                    }
                }).bind(this)
            )
        },
        reset(){
            this.main = {
                data: "controlpanel",
                p1life: null,
                p1score: null,
                p2life: null,
                p2score: null,
                p3life: null,
                p3score: null,
                p4life: null,
                p4score: null,
                stream1name: null,
                stream2name: null,
                stream3name: null,
                stream4name: null
            }
        },
        save(){
            this.loading=true
            TestService.setAllConsole(this.main)
            .then(
                (res=>{
                    console.log(res)
                    if(res == "success"){
                        this.loading=false
                    }
                }).bind(this)
            )
        },
        changeQuestion(){
            TestService.setData("displayQuestion",this.selected)
            .then(
                (res=>{
                    console.log(res)
                }).bind(this)
            )
        },
        getQuestions(){
            this.loadingQuestions = true
            TestService.getVotedata()
            .then(
                (res=>{
                    console.log(res)
                    res = res.reverse()
                    this.$set(this, "questions", res);
                    this.loadingQuestions = false
                }).bind(this)
            )
        }
    },
}
</script>
<style scoped>
.playerCard{
    border: 3px solid black
}
</style>