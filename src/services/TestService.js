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
    async sendTwitch(){
        console.log("twitch get")
        let res = await axios.get("/message/wait");
        console.log("RES", res)
        return res.status;
    }
}