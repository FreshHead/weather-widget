<script setup lang="ts">

import { ref } from 'vue'

import closeIconPath from '@/assets/icons/close.svg'
import loadingGifPath from '@/assets/loading.gif'
import { useWeatherStore } from '@/stores/WeatherStore'
import SettingsPage from '@/views/SettingsPage.ce.vue'
import WeatherPage from '@/views/WeatherPage.ce.vue'

const store = useWeatherStore()
store.initCityWeatherList()

const onCloseErrorClicked = () => {
  store.errorMsg = ''
}

const showSettings = ref(false)
</script>
<template>
  <div class="weather-widget">
    <WeatherPage v-if="!showSettings" @settings-clicked="showSettings = true" />
    <SettingsPage v-else @close-settings-clicked="showSettings = false" />
    <div v-if="store.loading" class="weather-widget__loading-overlay">
      <img :src="loadingGifPath" />
    </div>
    <div v-if="store.errorMsg" class="weather-widget__error-msg">
      <button
        class="btn weather-widget__close-error-btn"
        :style="{ backgroundImage: `url(${closeIconPath})` }"
        @click="onCloseErrorClicked"
      ></button>
      <span>{{ store.errorMsg }}</span>
    </div>
  </div>
</template>

<style>
.weather-widget {
  margin: 0 auto;
  position: relative;
}
.weather-widget__loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
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
.weather-widget__error-msg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10001;
  background-color: rgba(150, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;

  font-size: 1.2rem;
  color: white;
}
.weather-widget__close-error-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  filter: brightness(0) invert(1); /* Making same svg white. */
}
@media (min-width: 550px) {
  .weather-widget {
    max-width: 300px;
  }
}
</style>
<style src="@/assets/main.css"></style>
