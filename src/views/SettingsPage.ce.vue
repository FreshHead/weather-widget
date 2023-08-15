<script setup lang="ts">
import { ref } from "vue";
import { useWeatherStore } from "../stores/WeatherStore";
import closeIconPath from "../assets/icons/close.svg";
import enterIconPath from "../assets/icons/enter.svg";
import SettingsCityItem from "../components/SettingsCityItem.ce.vue";
import DropPlace from "@/components/DropPlace.ce.vue";

const store = useWeatherStore();

const newCity = ref("");

const emit = defineEmits<{
  (e: "close-settings-clicked"): void;
}>();

const onCloseClicked = () => {
  emit("close-settings-clicked");
};

const addNewCity = () => {
  store.addCity(newCity.value);
  newCity.value = "";
};

const removeCity = (cityName: string) => {
  store.removeCity(cityName);
};
</script>
<template>
  <div class="settings-page">
    <div class="settings-page__title">Settings</div>
    <button
      class="btn settings-page__close-btn"
      :style="{ backgroundImage: `url(${closeIconPath})` }"
      aria-label="Settings"
      @click="onCloseClicked"
    ></button>
    <div
      v-for="(cityWeather, idx) in store.cityWeatherList"
      :key="cityWeather.cityName"
    >
      <DropPlace :index="idx" />
      <SettingsCityItem
        :index="idx"
        :cityName="cityWeather.cityName"
        @remove-city="removeCity"
      />
    </div>
    <DropPlace :index="store.cityWeatherList.length" />
    <label class="settings-page__label" for="settings-page__input">
      Add Location:
    </label>
    <div class="settings-page__input-container">
      <input
        id="settings-page__input"
        v-model="newCity"
        @keyup.enter="addNewCity"
      />
      <button
        class="btn"
        :style="{ backgroundImage: `url(${enterIconPath})` }"
        aria-label="Settings"
        @click="addNewCity"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  background-color: var(--primary);
  border-radius: 20px;
  padding: 1rem;
}
.settings-page__title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.settings-page__close-btn {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

#settings-page__input {
  flex: 1;
  font-size: 1.1rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}

.settings-page__label {
  font-weight: bold;
}

.settings-page__input-container {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}
</style>
