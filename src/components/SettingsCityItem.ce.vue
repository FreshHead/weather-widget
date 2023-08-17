<script setup lang="ts">
import { ref } from 'vue'
import hamburgerMenuIconPath from '../assets/icons/hamburger-menu.svg'
import trashBinIconPath from '../assets/icons/trash-bin.svg'

const props = defineProps<{
  cityName: string
  index: number
}>()

const emit = defineEmits<{
  (e: 'remove-city', cityName: string): void
}>()

const hamburgerClicked = ref(false)

const removeCity = () => {
  emit('remove-city', props.cityName)
}

const itemDragStart = (event: DragEvent) => {
  if (!hamburgerClicked.value) {
    event.preventDefault()
  } else {
    event.dataTransfer?.setData('text/plain', String(props.index))
  }
}
</script>
<template>
  <div
    class="settings-city-item"
    draggable="true"
    @dragstart="itemDragStart"
    @dragend="hamburgerClicked = false"
  >
    <div
      class="settings-city-item__drag-icon"
      :style="{ backgroundImage: `url(${hamburgerMenuIconPath})` }"
      @mousedown="hamburgerClicked = true"
    ></div>
    <span>{{ cityName }}</span>
    <button
      class="btn settings-city-item__trash-bin"
      :style="{ backgroundImage: `url(${trashBinIconPath})` }"
      @click="removeCity"
    ></button>
  </div>
</template>
<style scoped>
.settings-city-item {
  padding: 0.5rem;
  background-color: white;
  border-radius: 5px;

  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.settings-city-item__drag-icon {
  width: 32px;
  height: 32px;
  background-size: cover;
}

.settings-city-item__trash-bin {
  margin-left: auto;
}
</style>
