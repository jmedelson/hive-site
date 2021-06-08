const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express()

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
// app.use('/', serveStatic(path.join(__dirname, '/dist')))
//login screen
app.use('/', serveStatic(path.join(__dirname, '/altdist')))
//main screen
app.use('/6T2fJBwzd6YtU86b', serveStatic(path.join(__dirname, '/dist')))
//login redirect
app.get('/auth/:pw', function(req,res){
	// console.log("send message", res)
	console.log(req.params.pw)
	if(req.params.pw != 'Qn4s7PNsg9Yneu6B'){
		res.redirect('/?valid=false')
	}
	else{
		res.redirect('/6T2fJBwzd6YtU86b')
	}
})
const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)