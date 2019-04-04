// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

// Change socket url according to  your deployment
// Change it to localhost while running project locally
const SocketInstance = socketio.connect('http://twtsnt.azurewebsites.net/', {
    query: {
        token: window.localStorage.getItem('auth')
    }
});

import BootstrapVue from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
})
);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
