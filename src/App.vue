<!--
 * @Descripttion : 
 * @Author       : wuhaidong
 * @Date         : 2024-03-10 20:17:10
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-27 21:16:19
-->
<!--
 * @Descripttion : 
 * @Author       : wuhaidong
 * @Date         : 2024-03-10 20:17:10
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-27 15:27:23
-->
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <div>
      <audio controls :src="audioUrl"></audio>
      <div id="zoomview-container"></div>
      <div id="overview-container"></div>
      <AudioWaveform />
    </div> -->
    <!-- <AudioWaveform /> -->
    <!-- <ChartLine /> -->
    <ElCharts2 />


  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import AudioWaveform from "./components/AudioWaveform.vue";
// import ElCharts from "./components/ELCharts1.vue";
import ElCharts2 from "./components/ELCharts2.vue";
// import ChartLine from "./components/ChartLine.vue";
import yinyue from "./assets/aa.mp3";

export default {
  name: "App",
  components: {
    // HelloWorld,
    // AudioWaveform,
    ElCharts2,
    // ChartLine,
  },
  data() {
    return {
      audioUrl: yinyue,
    };
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
  margin-top: 60px;
}
#zoomview-container,
#overview-container {
  width: 1000px;
  height: 100px;
}
</style>
