<script setup lang="ts">
import type { CityWeather } from '@/types'
import { computed } from 'vue'
import windArrowIconPath from '../assets/icons/wind-arrow.svg'

type PropTypes = {
  cityWeather: CityWeather
}
const props = defineProps<PropTypes>()

const capitalizedDescription = computed(() => {
  return (
    props.cityWeather.weather.description[0].toUpperCase() +
    props.cityWeather.weather.description.slice(1)
  )
})
</script>
<template>
  <div class="city-card">
    <span class="city-card__cityName">{{ cityWeather.cityName }}</span>
    <img
      class="city-card__icon"
      :src="`https://openweathermap.org/img/wn/${cityWeather.weather.iconCode}@2x.png`"
    />
    <span class="city-card__temperature">{{ cityWeather.weather.temperature }}℃</span>
    <span class="city-card__description"
      >Feels like {{ cityWeather.weather.feelsLike }}℃. {{ capitalizedDescription }}</span
    >
    <div class="city-card__wind-container">
      <div
        class="city-card__wind-arrow"
        :style="{
          backgroundImage: `url(${windArrowIconPath})`,
          transform: `rotate(${cityWeather.weather.windDegree}deg)`
        }"
      ></div>
      <div>{{ cityWeather.weather.windSpeed }}m/s</div>
    </div>
    <span>{{ cityWeather.weather.pressure }}hPa</span>
    <span>Humidity: {{ cityWeather.weather.humidity }}%</span>
    <span>Visibility: {{ cityWeather.weather.visibility }}km</span>
  </div>
</template>
<style scoped>
.city-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  line-height: 2;
  margin-bottom: 1rem;

  background-color: var(--primary);
  border-radius: 20px;
  padding: 1rem;
}

.city-card__cityName {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1;
}

.city-card__cityName,
.city-card__description {
  grid-column: 1/3;
}

.city-card__icon {
  justify-self: center;
}

.city-card__temperature {
  align-self: center;
  font-weight: bold;
  font-size: 2rem;
}

.city-card__wind-container {
  display: flex;
}

.city-card__wind-arrow {
  align-self: center;
  width: 1.5rem;
  height: 1.5rem;
  background-size: cover;
}
</style>
