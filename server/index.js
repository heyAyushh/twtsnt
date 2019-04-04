var express = require("express");
var app = express();
var Twit = require("twit");
var axios = require("axios");
require("dotenv").config();
/* const { Kafka } = require('kafkajs') */

// Websocket Init
var server = require('http').Server(app);
var io = require('socket.io')(server);


//KAFKA
/* 
const kafka = new Kafka({
    clientId: 'srvr',
    brokers: [],
    // authenticationTimeout: 1000,
    sasl: {
      mechanism: '', // scram-sha-256 or scram-sha-512
      username: '',
      password: ''
    },
  }) */

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});

/* 
// Producing
const producer = kafka.producer()
*/

// Serve all the files in '/dist' directory
app.use(express.static("dist"));

// get word from websocket
io.on("connection", function(socket) {

  var _stream = {};

  socket.on("messageChannel", function(reqmsg) {
    var count = 0;
    var totalsentiment = 0.0;
    var avgsentiment = 0.0;
    var data = {
      text: "tweet",
      score: "0.0"
    };
    console.log(reqmsg.message);
    if (reqmsg.message) {
      var track = reqmsg.message;
      /*         io.emit('MESSAGE', data) */

      var stream = T.stream("statuses/filter", { track: track });

      _stream = stream;

      stream.on("tweet", function(tweet) {
        if (1 /* tweet.text.substring(0,1)=='RT' */) {
          // get tweets scored

          data = getSentiment(tweet.text);
          // calculate stuff
          data
            .then(function(result) {
              totalsentiment += result.score;
              avgsentiment = totalsentiment / ++count;
              console.log(tweet.text.substring(0, 40), count, avgsentiment);
              //prepare message and emit
              msg = {
                tweet: tweet.text.substring(0,70),
                count: count,
                avgsentiment: avgsentiment
              };

              socket.emit("messageChannel", JSON.stringify(msg));
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
      socket.on("disconnect", function() {
        _stream.stop();
      });
    }

  });
});

server.listen(process.env.PORT||3000);

async function getSentiment(text) {
  var data = {
    documents: [
      {
        language: "en",
        id: "1",
        text: text
      }
    ]
  };

  return await axios({
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.textkey
    },
    url:
      "https://eastasia.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment",
    data: data
  })
    .then(data => {
      var sentiment = data.data.documents[0].score;
      var res = {
        text: text,
        score: sentiment
      };
      return res;
    })
    .catch(function(error) {
      // handle error
      var res = {
        text: text,
        score: error.response.data
      };
      return res;
    });
}

// History
/* 
    T.get('search/tweets', { q: 'banana', count: 2 }, function(err, data, response) {
        console.log(data.statuses[0].text)
    })
    */

var sendtoClient = function(text) {
  /*     
   using kafka
       text = text.toString();
       await producer.connect()
       await producer.send({
       topic: '9h2xx0qs-test',
       messages: [
       { value: text},
     ],
   }) */
};
