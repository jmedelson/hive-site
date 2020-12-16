import axios from "axios";


// import { get } from "core-js/fn/dict";

export default {
    async getVotedata(){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"question-data"
        })
        console.log(res);
        res = JSON.parse(res.data)
        res = res.message
        return res
    },
    async getAWSdata(){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.get(link)
        res = JSON.parse(res.data)
        res = res.message
        console.log("res",res)
        return([res.scene,res.question,res.answer,res.correct,res.limit,res.displayLimit,res.displayQuestion])
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
    async getResponse(question){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"getResponses",
            catagory:"placeholder",
            payload:"placeholder",
            question: question
        })
        // console.log(res.data)
        res = JSON.parse(res.data)
        res = res.message
        // console.log(res)
        res = res.Items
        // console.log(res)
        return(res)
    },
    async sendReset(){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"sendReset",
            catagory:"reset",
            payload:"reset"
        })
        console.log(res.data)
        res = JSON.parse(res.data)
        if(res.id=="reset-results" && res.message=="DONE"){
            console.log("SUCCESS")
            return(0)
        }
    },
    async getControlPanelData(){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"cpanelData",
            payload:"placeholder"
        })
        console.log(res)
        res = JSON.parse(res.data)
        res = res.message.Item
        return res
    },
    async setConsoleData(field, value){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"setCpanel",
            payload: value,
            field: field
        })
        console.log(res)
        res = JSON.parse(res.data)
        res = res.message
        return res
    },
    async setAllConsole(data){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"setAllCpanel",
            payload: data,
        })
        console.log(res)
        res = JSON.parse(res.data)
        res = res.message
        return res
    },
    async answerHistory(question){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag:"answer-data",
            payload:question
        })
        console.log(res)
        res = JSON.parse(res.data)
        if(res.message.Count<1){
            return "502error"
        }
        res = res.message
        let hold = {}
        try{
            res = res.Items
            // console.log("res1", res)
            res.forEach(function(item){
                // console.log("res2", item)
                let holder = item.word
                // console.log("res3", holder)
                holder = holder.split("//")
                let channel = holder[0];
                let word = holder[1];
                item["word"] = word
                item['channel']
                if(!item['agree']){
                    item.agree = 0
                }
                if(!item['disagree']){
                    item.disagree = 0
                }
                hold[channel] = hold[channel] || []
                hold[channel].push(item)
                
            })
        }catch(err){
            console.error("error :", err)
        //     // res = []
        }
        const oauth = await this.requestOauth();
        console.log("oauth",oauth)
        const users = await this.requestUsers(Object.keys(hold),oauth);
        console.log("users",users)
        console.log("hold", hold)
        for(let item of users){
            hold[item.login] = hold[item.id]
            delete hold[item.id]
        }
        return hold
        // return res.Items
    },
    async requestOauth(){
        const link = "https://id.twitch.tv/oauth2/token?client_id=" + "552mdyt25wnm6v5oqddfk7102clylf" + "&client_secret=" + "honubqy3o1jpu30rrbkgqotfg08m2m" + "&grant_type=client_credentials";
        try {
            const response = await axios.post(link);
            // console.log(response.data, link);
            // console.log(response.data.explanation);
            return response.data.access_token;
        } catch (error) {
            // console.log(error.response.body, link);
            return error;
        }
    },
    async requestUsers(users, oauth){
        console.log("recieved #ids:", users, oauth)
        let search = ""
        for(let item of users){
            search = search + item + "&id="
        }
        search = search.slice(0,-4)
        // console.log("search:", search)
        const link = "https://api.twitch.tv/helix/users?id=" + search
        // console.log("link:", link)
        let res = await axios.get(link,{
            headers:{
                'Authorization': 'Bearer ' + oauth,
                'Client-ID' : "552mdyt25wnm6v5oqddfk7102clylf"
            }
        })
        console.log("RES!!:", res)
        console.log("DATA!!:", res.data.data)
        return res.data.data
    },
    async removeQuestion(question){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "removeQuestion",
            payload: question
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    },
    async addBlockedWord(word){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "addBlocked",
            payload: word
        })
        console.log(res)
    },
    async getWordMap(){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "wordMap",
            payload: "placeholder"
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    },
    async setWordMap(word,map){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "setMapWord",
            payload: word,
            map:map
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    },
    async deleteMap(word){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "deleteMap",
            payload: word,
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    },
    async addQuestion(question){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "add-question",
            payload: question,
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    },
    async mergeAnswer(question, mergeItem, mergeTarget){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "mergeAnswer",
            payload: question,
            mergeItem: mergeItem,
            mergeTarget: mergeTarget
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    },
    async undoMerge(question, word, unmerge){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "undoMerge",
            payload: question,
            word: word,
            unmerge: unmerge
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    },
    async rename(question, original, word){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "renameWord",
            payload: question,
            word: word,
            original: original
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    },
    async editCount(question, word, count){
        let link = "https://c6qsh7k1l1.execute-api.us-east-2.amazonaws.com/default/hiveMind"
        let res = await axios.post(link,{
            flag: "editCount",
            payload: question,
            word: word,
            count: count
        })
        console.log(res)
        res = JSON.parse(res.data)
        return res.message
    }
}