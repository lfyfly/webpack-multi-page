<template>
  <div id="app">
    <h1>from App.vue</h1>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>

export default {
  name: 'App',
  data:{
    msg: 'app msg'
  }
}
</script>

<style lang="scss">
#app {
  color: $global-color;
}
</style>
