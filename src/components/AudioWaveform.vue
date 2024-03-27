<!--
 * @Descripttion : peaks.js-音频波形demo
 * @Author       : wuhaidong
 * @Date         : 2024-03-10 20:24:22
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-13 10:33:17
-->
<template>
  <div id="peak-container">
    <div id="zoomview-container" ref="zoomview"></div>
    <div id="overview-container" ref="overview"></div>
    <audio ref="audio" id="audio" controls="controls">
      <source :src="audioUrl" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import Peaks from "peaks.js";
import yinyue from "../assets/aa.mp3";

export default {
  data() {
    return {
      audioUrl: yinyue,
    };
  },

  mounted() {
    const options = {
      zoomview: {
        container: this.$refs.zoomview, //缩略图
      },
      overview: {
        container: this.$refs.overview,
      },
      mediaElement: this.$refs.audio,
      webAudio: {
        audioContext: new AudioContext(),
      },
      emitCueEvents: true,
    };
    const peaksInstance = Peaks.init(options, (err, peaks) => {
      console.log("🚀 ~ Peaks.init ~ peaks:", peaks);
      if (err) return;
    });

    peaksInstance.on("zoom", (zoomData) => {
      console.log("Zoom data:", zoomData);
    });

    peaksInstance.on("select", (start, end) => {
      console.log("Selected region:", start, end);
    });
  },
};
</script>

<style>
#zoomview-container {
  height: 300px;
}
#overview-container {
  height: 300px;
}
</style>
