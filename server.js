const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express()
let events = 
{
id: 1,
name: 'Charity Ball',
category: 'Fundraising',
description: 'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
featuredImage: 'https://placekitten.com/500/500',
images: [
	'https://placekitten.com/500/500',
	'https://placekitten.com/500/500',
	'https://placekitten.com/500/500',
],
location: '1234 Fancy Ave',
date: '12-25-2019',
time: '11:30'
}

const makeServerToken = channelID => {
	const serverTokenDurationSec = 30;

	const payload = {
		exp: Math.floor(Date.now() / 1000) + serverTokenDurationSec,
		channel_id: channelID,
		user_id: '21314155',
		role: 'external',
		pubsub_perms: {
		send: ["broadcast"],
		},
	};
	const secret = Buffer.from("s8PcNsi/W/gJvwy0JOzYX+kEKbVEzqFTK74jQaj/WEg=", 'base64');
	return jwt.sign(payload, secret, { algorithm: 'HS256' });
};
//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})
app.get('/events', cors(), (req, res) => {
	console.log("send event")
	res.send(events);
});
app.get('/message/:scene', cors(), async(req, res) => {
	console.log("send message")
	const scene = req.params.scene;
	const link = `https://api.twitch.tv/extensions/message/21314155`
	const bearerPrefix = 'Bearer ';
    const request = {
        method: 'POST',
        url: link,
        headers : {
            'Client-ID': '9y4y2yf18g5v0q6gujymj8wd61p93k',
            'Content-Type': 'application/json',
            'Authorization': bearerPrefix + makeServerToken('21314155'),
        },
        data : JSON.stringify({
          content_type: 'application/json',
          message: scene,
          targets: ['broadcast']
        })
	}
	let hold = await axios(request)
	console.log(hold.status)
	return(hold)
});
const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)