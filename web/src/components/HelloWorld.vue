<template>
  <div class="hello">
    <div class="first" v-show="first">
      <b-container class="bv-example-row">
        <div class="black">
          <b-jumbotron>
            <template slot="header">Tweet Sentiment Analysis</template>

            <template slot="lead">Analyse tweet stream based on #hashtags.</template>

            <hr class="my-4">

            <a>Built on Azure Cognitive Service, Vue.JS, Socket.IO, twit npm.</a>

            <b-input-group size="lg" style="position:center" class="col-md-4">
              <b-form-input v-model="text" placeholder="enter keywords.."/>
              <b-input-group-append>
                <b-button variant="outline-secondary success" v-on:click="sendMessage">Stream</b-button>
              </b-input-group-append>
            </b-input-group>
            <!-- 
            <b-button variant="success" href="#">Do Something Else</b-button>-->
          </b-jumbotron>
        </div>
      </b-container>
    </div>
    <div id="second" v-show="second">
      <h1>{{text}}</h1>
      <div class="container">
        <p v-if="isConnected" class="success">We're connected to the server!</p>
        <p v-else>You're not connected to the server. 😢</p>

        <div class="row" id="dashboard">
          <div class="col-sm-3 jumbotron" style="margin:20px">
            <i>
              <h3>Recent Tweet</h3>
            </i>
            <p>{{tweet}}</p>
          </div>
          <div class="col-sm-3 jumbotron" style="margin:20px">
            <i>
              <h3>Tweets Live Streamed</h3>
            </i>
            <h1>{{count}}</h1>
          </div>
          <div class="col-sm-3 jumbotron" style="margin:20px">
            <i>
              <h3>Average Sentiment</h3>
            </i>
            <p>{{avgsentiment}}</p>
            <h1 v-if="avgsentiment>0.5">positive (😇)</h1>
            <h1 v-if="avgsentiment<0.5&&avgsentiment!=0.0">negative (😭)</h1>
          </div>
        </div>
      </div>
    </div>
    <footer style="top:0; left:0; margin-top:100px;">
      Made with ❤️ by
      <div id="grad1">
        <h4>
          <a href="https://heyayush.dev/" class="cols" id="name">Ayush</a>
        </h4>
      </div>
    </footer>
  </div>
</template>

<script>
import io from "socket.io-client";
var axios = require("axios");
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "",
      first: true,
      text: "",
      second: false,
      isConnected: false,
      tweet: "",
      count: "",
      avgsentiment: ""
    };
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      var socketMessage = JSON.parse(data);
      this.count = socketMessage.count;
      this.tweet = socketMessage.tweet;
      this.avgsentiment = socketMessage.avgsentiment;
    }
  },

  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("pingServer", "PING!");
    },
    sendMessage(e) {
      e.preventDefault();
      this.second = true;
      this.first = false;

      this.$socket.emit("messageChannel", {
        message: this.text
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  width: 50%;
  padding-left: 50px;
  margin: 50px auto !important;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.cols {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);   -webkit-background-clip: text;
  color: transparent;
}

.second.h1 {
  color: white !important
}

p {
  color: black
}


</style>
