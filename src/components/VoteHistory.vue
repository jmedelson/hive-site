<template>
    <div>
        <H1>New vue view</H1>
        <v-select
        :items="questions"
        label="Select Question Filter"
        v-model="selected"
        v-on:change="doSomething()"
        >
        </v-select>
        <v-select
        v-if="channels.length"
        :items="channels"
        label="Select Answer Filter"
        v-model="selected2"
        v-on:change="doSomething2()"
        >
        </v-select>
        <div v-if="display.length">
            <h2>Showing results for {{selected2}}</h2>
            <ul>
                <li v-for="(item, index) in display" v-bind:key="index">
                    <h4>{{item.word}} = {{item.agree/(item.agree+item.disagree)*100}}%</h4> 
                    <v-progress-linear
                        background-color="error"
                        color="success"
                        height="25"
                        v-bind:value="item.agree/(item.agree+item.disagree)*100"
                    ></v-progress-linear>
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
import TestService from '../services/TestService.js';
export default {
    name: 'VoteHistory',
    props: {
        msg: String
    },
    data(){
        return{
            test:0,
            questions:[],
            selected:"",
            selected2:"",
            answers:{},
            channels:[],
            display:[]

        }
    },
    computed: {
        
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
        async doSomething(){
            console.log(this.selected)
            TestService.answerHistory(this.selected)
            .then(
                (res=>{
                    console.log(res)
                    this.$set(this, "answers", res);
                    this.$set(this, "selected2", "");
                    this.$set(this, "display", [])
                    this.$set(this, "channels", Object.keys(res))
                }).bind(this)
            )
        },
        async doSomething2(){
            console.log(this.answers[this.selected2])
            this.$set(this, "display", this.answers[this.selected2])
            
        }
    },
}
</script>
<style scoped>

</style>