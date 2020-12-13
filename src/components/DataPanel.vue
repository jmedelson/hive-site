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
            <v-tab>Add Blocked Word</v-tab>
            <v-tab>Item Three</v-tab>
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
            <v-tab-item>content 2</v-tab-item>
            <v-tab-item>content 3</v-tab-item>
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