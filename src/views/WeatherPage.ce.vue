<script setup lang="ts">
import { useWeatherStore } from "../stores/WeatherStore";
import CityCard from "../components/CityCard.ce.vue";
import settingsIconPath from "../assets/icons/settings.svg";

const store = useWeatherStore();

const emit = defineEmits<{
  (e: "settings-clicked"): void;
}>();

const onSettingsClicked = () => {
  emit("settings-clicked");
};
</script>
<template>
  <div class="weather-widget">
    <button
      class="btn weather-page__settings-btn"
      :style="{ backgroundImage: `url(${settingsIconPath})` }"
      aria-label="Settings"
      @click="onSettingsClicked"
    ></button>
    <div
      class="weather-page__no-data"
      v-if="!store.cityWeatherList.length && !store.loading"
    >
      Please click gear button and choose a city...
    </div>
    <CityCard
      v-for="weather in store.cityWeatherList"
      :key="weather.cityName"
      :cityWeather="weather"
    />
  </div>
</template>
<style>
.weather-page__settings-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.weather-page__no-data {
  text-align: center;
  padding: 5rem 1rem;
}
</style>
