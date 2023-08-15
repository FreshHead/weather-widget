<script setup lang="ts">
import { useWeatherStore } from "@/stores/WeatherStore";
import { ref } from "vue";

const props = defineProps<{
  index: number;
}>();
const isDragover = ref(false);

const store = useWeatherStore();

const dragover = (event: DragEvent) => {
  isDragover.value = true;
  event.preventDefault();
};

const drop = (event: DragEvent) => {
  let indexOfDragged = Number(event.dataTransfer?.getData("text/plain"));
  store.cityWeatherList.splice(
    props.index,
    0,
    store.cityWeatherList[indexOfDragged]
  );
  if (indexOfDragged > props.index) {
    indexOfDragged++;
  }
  store.cityWeatherList.splice(indexOfDragged, 1);
  isDragover.value = false;
};
</script>

<template>
  <div
    class="drop-place"
    :class="{ 'drop-place_isDragover': isDragover }"
    @dragover="dragover"
    @dragleave="isDragover = false"
    @drop="drop"
  ></div>
</template>

<style scoped>
.drop-place {
  height: 1rem;
  transition-property: height;
  transition-duration: 0.4s;
}

.drop-place_isDragover {
  height: 3rem;
}
</style>
