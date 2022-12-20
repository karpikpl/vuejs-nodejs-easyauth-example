<template>
  <div id="app">
    <a href="#/">Home</a> |
    <a href="#/ping">Ping</a> |
    <a href="#/non-existent-path">Broken Link</a>
    <component :is="currentView" />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Dashboard from './components/Dashboard.vue'
import Ping from './components/Ping.vue'
import NotFound from './components/NotFound.vue'

const routes = {
  '/': Dashboard,
  '/ping': Ping
}

export default {
  name: 'App',
  components: {
    Dashboard
  },
  data() {
    return {
      settings: false,
      currentPath: window.location.hash
    }
  },
  mounted() {
    console.log("I am in mounted!!!")
    this.settings = true
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  setup() {
    console.log("I am in setup!!!")
  }
}
</script>

<style>
@import './assets/styles/global.css';
</style>