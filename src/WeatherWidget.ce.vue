<script setup lang="ts">
import WeatherPage from "@/views/WeatherPage.ce.vue";
import SettingsPage from "@/views/SettingsPage.ce.vue";
import { useWeatherStore } from "@/stores/WeatherStore";
import { ref } from "vue";
import loadingGifPath from "@/assets/loading.gif";

const store = useWeatherStore();
store.initCityWeatherList();

const showSettings = ref(false);
</script>
<template>
  <div class="weather-widget">
    <div v-if="store.loading" class="weather-widget__loading-overlay">
      <img :src="loadingGifPath" />
    </div>
    <WeatherPage v-if="!showSettings" @settings-clicked="showSettings = true" />
    <SettingsPage v-else @close-settings-clicked="showSettings = false" />
  </div>
</template>

<style>
.weather-widget {
  max-width: 300px;
  position: relative;
}
.weather-widget__loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  /* background-color: rgba(60, 60, 60, 0.2); */
}
.weather-widget__loading-overlay img {
  width: 100%;
  object-fit: contain;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
<style src="@/assets/main.css"></style>
