import axios from "axios";


// import { get } from "core-js/fn/dict";

export default {
    async getEvents() {
        let res = await axios.get("/events");
        return res.data;
    },
    async getAws(){
        let res = await axios.get("https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind");
        console.log(res.data)
        res = JSON.parse(res.data)
        console.log(res.data)
        return res.data;
    },
    // async sendTwitch(scene){
    //     let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind/scene/" + scene;
    //     console.log(link)
    //     let res = await axios.get(link);
    //     console.log(res.data)
    //     res = JSON.parse(res.data)
    //     console.log(res.data)
    //     return res.data;
    // },
    async sendTwitch(scene){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"scene",
            payload:scene
        })
        console.log(res.data)
        res = JSON.parse(res.data)
        console.log(res.data)
        return scene;
    }
}