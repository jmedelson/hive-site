import axios from "axios";


// import { get } from "core-js/fn/dict";

export default {
    async getAWSdata(){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.get(link)
        res = JSON.parse(res.data)
        res = res.message
        console.log("res",res)
        return([res.scene,res.question,res.answer])
    },
    async setScene(scene){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"scene",
            payload:scene
        })
        console.log(res.data)
        // res = JSON.parse(res.data)
        // console.log("=====",res.data)
        return scene;
    },
    async setQuestion(question){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"question",
            payload:question
        })
        console.log(res.data)
    },
    async setData(type,data){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"SET",
            catagory:type,
            payload:data
        })
        console.log(res.data)
        return(data)
    },
    async getResponse(){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"getResponses",
            catagory:"placeholder",
            payload:"placeholder"
        })
        console.log(res.data)
        res = JSON.parse(res.data)
        res = res.message
        console.log(res)
        res = res.Items
        console.log(res)
        return(res)
    }
}