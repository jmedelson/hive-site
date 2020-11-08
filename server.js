const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const cors = require('cors')

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
const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)