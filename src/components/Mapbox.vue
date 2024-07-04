<template>
  <div class="HomeViewPage">
    <div ref="MyMapContainer" id="MyMapContainer"></div>
    <div class="Selectbox">
      <el-select
        v-model="SelectValue"
        placeholder="请选择"
        @change="ChangeMapType"
      >
        <el-option
          v-for="item in MapList"
          :key="item.layerId"
          :label="item.name"
          :value="item.layerId"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker"; // Load worker code separately with worker-loader
mapboxgl.workerClass = MapboxWorker; // Wire up loaded worker to be used instead of the default
mapboxgl.accessToken =
  "pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ";
export default {
  name: "HomeViewPage",
  components: {},
  data() {
    return {
      MapList: [
        { name: "高德地图 矢量地图", layerId: "gd-vector" },
        { name: "高德地图 卫星影像", layerId: "gd-satellite" },
        { name: "天地图 矢量注记", layerId: "tian-cvaw" },
        { name: "天地图 影像注记", layerId: "tian-ciaw" },
        { name: "天地图 卫星影像", layerId: "tian-satellite" },
        { name: "天地图 矢量地图", layerId: "tian-vector" },
        { name: "天地图 地形晕渲", layerId: "tian-terw" },
        { name: "天地图 地形注记", layerId: "tian-ctaw" },
        { name: "天地图 全球境界", layerId: "tian-ibow" },
        { name: "bingmap 卫星影像", layerId: "bing-satellite" },
        { name: "bingmap 矢量地图", layerId: "bing-vector" },
        { name: "mapbox 卫星影像", layerId: "mapbox-satellite" },
      ],
      SelectValue: "gd-vector",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.InitMap();
    });
  },
  methods: {
    InitMap() {
      const map = new mapboxgl.Map({
        container: this.$refs.MyMapContainer,
        style: {
          version: 8,
          sources: {
            "gd-vector": {
              type: "raster",
              tiles: [
                // 高德地图 矢量地图
                "http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7",
              ],
              tileSize: 256,
            },
            "gd-satellite": {
              type: "raster",
              tiles: [
                // 高德地图 卫星影像
                "http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6",
              ],
              tileSize: 256,
            },
            "tian-cvaw": {
              type: "raster",
              tiles: [
                // 天地图 矢量注记
                "http://t0.tianditu.gov.cn/cva_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
              ],
              tileSize: 256,
            },
            "tian-ciaw": {
              type: "raster",
              tiles: [
                // 天地图 影像注记
                "http://t0.tianditu.gov.cn/cia_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
              ],
              tileSize: 256,
            },
            "tian-satellite": {
              type: "raster",
              tiles: [
                // 天地图 卫星影像
                "http://t0.tianditu.gov.cn/img_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
              ],
              tileSize: 256,
            },
            "tian-vector": {
              type: "raster",
              tiles: [
                // 天地图 矢量地图
                "http://t0.tianditu.gov.cn/vec_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
              ],
              tileSize: 256,
            },

            "tian-terw": {
              type: "raster",
              tiles: [
                // 天地图 地形晕渲
                "http://t0.tianditu.gov.cn/ter_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
              ],
              tileSize: 256,
            },
            "tian-ctaw": {
              type: "raster",
              tiles: [
                // 天地图 地形注记
                "http://t0.tianditu.gov.cn/cta_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
              ],
              tileSize: 256,
            },
            "tian-ibow": {
              type: "raster",
              tiles: [
                // 天地图 全球境界
                "http://t0.tianditu.gov.cn/ibo_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
              ],
              tileSize: 256,
            },
            // "tian-evaw": {
            //   type: "raster",
            //   tiles: [
            //     // 天地图 矢量英文注记
            //     "http://t0.tianditu.gov.cn/eva_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=eva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
            //   ],
            //   tileSize: 256,
            // },
            // "tian-eiaw": {
            //   type: "raster",
            //   tiles: [
            //     // 天地图 影像英文注记
            //     "http://t0.tianditu.gov.cn/eia_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=eia&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
            //   ],
            //   tileSize: 256,
            // },

            "bing-satellite": {
              type: "raster",
              tiles: [
                // bingmap 卫星影像
                "http://ak.dynamic.t0.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&it=A,G,L&og=819&n=z",
              ],
              tileSize: 256,
            },
            "bing-vector": {
              type: "raster",
              tiles: [
                // bingmap 矢量地图
                "http://ak.dynamic.t0.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&it=G,L&shading=hill&og=819&n=z",
              ],
              tileSize: 256,
            },
            "mapbox-satellite": {
              type: "raster",
              tiles: [
                // mapbox 卫星影像
                "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?sku=101wZp4uNMRnl&access_token=pk.eyJ1Ijoidm9sb2R5YW4iLCJhIjoiY2xwYnc4enk0MGdhaTJpcW9odWppNXcwOSJ9.g598xmjqTXnpvZ1FztOsGg",
              ],
              tileSize: 256,
            },
            "gaode-tile": {
              type: "raster",
              tiles: [
                // mapbox 卫星影像
                "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "gd-vector",
              type: "raster",
              source: "gd-vector",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "gd-satellite",
              type: "raster",
              source: "gd-satellite",
              layout: {
                visibility: "visible",
              },
              minzoom: 0,
              maxzoom: 22,
            },

            {
              id: "tian-cvaw",
              type: "raster",
              source: "tian-cvaw",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "tian-ciaw",
              type: "raster",
              source: "tian-ciaw",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "tian-satellite",
              type: "raster",
              source: "tian-satellite",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "tian-vector",
              type: "raster",
              source: "tian-vector",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "tian-terw",
              type: "raster",
              source: "tian-terw",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "tian-ctaw",
              type: "raster",
              source: "tian-ctaw",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "tian-ibow",
              type: "raster",
              source: "tian-ibow",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            // {
            //   id: "tian-evaw",
            //   type: "raster",
            //   source: "tian-evaw",
            //   layout: {
            //     visibility: "none",
            //   },
            //   minzoom: 0,
            //   maxzoom: 22,
            // },
            // {
            //   id: "tian-eiaw",
            //   type: "raster",
            //   source: "tian-eiaw",
            //   layout: {
            //     visibility: "none",
            //   },
            //   minzoom: 0,
            //   maxzoom: 22,
            // },
            {
              id: "bing-satellite",
              type: "raster",
              source: "bing-satellite",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "bing-vector",
              type: "raster",
              source: "bing-vector",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "mapbox-satellite",
              type: "raster",
              source: "mapbox-satellite",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        }, // mapbox底图
        center: [121.25994, 31.376757], // 初始化中心点
        zoom: 11, // 初始化层级
        language: "zh-Hans",
        accessToken: mapboxgl.accessToken,
      });
      this.map = map;
      map.on("load", (e) => {
        console.log("地图加载完成", e);
        // 切换地图
        this.ChangeMapType(this.SelectValue);

        // 初始化-圆
        const circle = {
          lat: 31.376757,
          lng: 121.25994,
          radius: 5,
        };
        this.drawCircle([circle.lng, circle.lat], circle.radius);

        // 初始化-矩形
        this.drawRectangle();

        // 初始化-多边形
        this.drawPolygon();

        // 绘制-点线面
        this.autoDrawCircle();

        // this.drawCustomCircle();
      });
    },

    ChangeMapType(layerId) {
      this.MapList.forEach((item) => {
        const showStatus = item.layerId === layerId ? "visible" : "none";
        this.map.setLayoutProperty(item.layerId, "visibility", showStatus);
      });
    },
    autoDrawCircle() {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        circle: {
          radiusUnits: "meters", // 圆形半径单位
        },
        controls: {
          polygon: true,
          point: true,
          line_string: true,
          trash: true,
        },
        defaultMode: "draw_polygon",
      });

      // Add this draw object to the map when map loads
      this.map.addControl(draw);
      this.map.on("draw.create", updateArea);
      this.map.on("draw.delete", updateArea);
      this.map.on("draw.update", updateArea);

      function updateArea(e) {
        console.log("🚀 ~ updateArea ~ e:", e);
        const data = draw.getAll();
        console.log("🚀 ~ 绘制的数据:", data);
        // var feature = e.features[0];
        // draw.changeMode('direct_select', { featureId: feature.id });
      }
    },

    // 绘制圆
    drawCustomCircle() {
      var that = this;
      var centerPoint = null;
      // var circleLayer = null;
      this.map.on("click", function (e) {
        var lngLat = e.lngLat;

        if (centerPoint) {
          that.map.removeLayer("circleLayer");
          that.map.removeSource("circleSource");
          centerPoint = null;
        }

        centerPoint = turf.point([lngLat.lng, lngLat.lat]);
        var options = {
          steps: 64,
          units: "kilometers",
        };
        var circle = turf.circle(centerPoint, 5, options); // 以指定半径（单位为公里）创建圆形

        that.map.addSource("circleSource", {
          type: "geojson",
          data: circle,
        });

        that.map.addLayer({
          id: "circleLayer",
          type: "fill",
          source: "circleSource",
          layout: {},
          paint: {
            "fill-color": "#f00",
            "fill-opacity": 0.5,
          },
        });
      });
    },

    // 画圆  createGeoJSONCircle参数（[经度，纬度]，圆的半径单位km）
    drawCircle(center, radiusInKm, points) {
      if (!points) points = 64;

      var coords = {
        latitude: center[1],
        longitude: center[0],
      };

      var km = radiusInKm;

      var ret = [];
      var distanceX =
        km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
      var distanceY = km / 110.574;

      var theta, x, y;
      for (var i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
      }
      ret.push(ret[0]);

      const circlejson = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [ret],
              },
            },
          ],
        },
      };

      this.map.addSource("circle", circlejson);
      this.map.addLayer({
        id: "circle",
        type: "fill",
        source: "circle",
        layout: {},
        paint: {
          "fill-color": "blue",
          "fill-opacity": 0.6,
        },
      });
    },
    // 绘制矩形的逻辑
    drawRectangle() {
      const initData = [
        {
          lat: 31.410239527638304,
          lng: 121.4325177966203,
        },
        {
          lat: 31.379468283410848,
          lng: 121.38925912962812,
        },
      ];

      // 假设的矩形宽度和高度（单位：度）
      const rectWidth = 0.01; // 经度
      const rectHeight = 0.01; // 纬度

      // 排序点以确保它们是矩形的对角点
      const [point1, point2] = initData.sort(
        (a, b) => a.lng - b.lng || a.lat - b.lat
      );

      // 计算矩形的四个顶点
      const sw = {
        lat: Math.min(point1.lat, point2.lat) - rectHeight / 2,
        lng: Math.min(point1.lng, point2.lng) - rectWidth / 2,
      }; // 西南角
      const se = {
        lat: Math.min(point1.lat, point2.lat) - rectHeight / 2,
        lng: Math.max(point1.lng, point2.lng) + rectWidth / 2,
      }; // 东南角
      const nw = {
        lat: Math.max(point1.lat, point2.lat) + rectHeight / 2,
        lng: Math.min(point1.lng, point2.lng) - rectWidth / 2,
      }; // 西北角
      const ne = {
        lat: Math.max(point1.lat, point2.lat) + rectHeight / 2,
        lng: Math.max(point1.lng, point2.lng) + rectWidth / 2,
      }; // 东北角

      // 构造rectangle数组
      const rectangle = [
        [
          [sw.lng, sw.lat], // 西南角
          [se.lng, se.lat], // 东南角
          [ne.lng, ne.lat], // 东北角
          [nw.lng, nw.lat], // 西北角
          [sw.lng, sw.lat], // 闭合到西南角
        ],
      ];

      console.log(rectangle);

      this.map.addSource("rectangle", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: rectangle,
          },
        },
      });

      this.map.addLayer({
        id: "rectangle-fill",
        type: "fill",
        source: "rectangle",
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.5,
        },
      });
    },
    drawPolygon() {
      const initData = [
        {
          lat: "31.427086172525815",
          lng: "121.31475809203046",
        },
        {
          lat: "31.42327763057653",
          lng: "121.36385324583905",
        },
        {
          lat: "31.39807876504448",
          lng: "121.35973337279218",
        },
        {
          lat: "31.390459171232454",
          lng: "121.33810403929608",
        },
        {
          lat: "31.415074091808663",
          lng: "121.29587534056562",
        },
      ];

      // 将字符串形式的经纬度转换为数字
      const polygonCoordinates = initData.map((point) => [
        parseFloat(point.lng),
        parseFloat(point.lat),
      ]);

      // 添加闭合的起点（第一个点）以确保多边形闭合
      const closedPolygonCoordinates = [
        ...polygonCoordinates,
        polygonCoordinates[0],
      ];

      // 创建 polygon 数组
      const polygon = [closedPolygonCoordinates];

      console.log(polygon);

      this.map.addSource("polygon", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: polygon,
          },
        },
      });

      this.map.addLayer({
        id: "polygon-fill",
        type: "fill",
        source: "polygon",
        paint: {
          "fill-color": "green",
          "fill-opacity": 0.5,
        },
      });

      // this.map.addLayer({
      //   id: "line-circle",
      //   type: "line",
      //   source: "circle",
      //   layout: {
      //     "line-join": "round",
      //     "line-cap": "round",
      //   },
      //   paint: {
      //     "line-color": "#188bff",
      //     "line-width": 6,
      //     "line-dasharray": [1, 2],
      //   },
      // });
    },
  },
};
</script>
<style  scoped>
.HomeViewPage {
  padding: 0;
  margin: 0;
  width: 98vw;
  height: 98vh;
  position: relative;
  overflow: hidden;
}
#MyMapContainer {
  width: 100%;
  height: 100%;
}

.Selectbox {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>