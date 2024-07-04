<!--
 * @Descripttion : 
 * @Author       : wuhaidong
 * @Date         : 2024-03-10 20:17:10
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-07-03 00:57:39
-->
<template>
  <div id="app">
    <Mapbox />
  </div>
</template>

<script>
import Mapbox from "./components/Mapbox.vue";

export default {
  name: "App",
  components: {
    Mapbox
  },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding:0;
}
</style>
