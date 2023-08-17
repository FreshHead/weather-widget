import { createPinia } from 'pinia'
import { createApp, defineCustomElement } from 'vue'

import { innerStylesIntoRootComponent } from '@/utils.js'

import App from './WeatherWidget.ce.vue'

// Feel free to ask in an interview why I chose this workaround.
innerStylesIntoRootComponent(App)

createApp(App).use(createPinia())
const app = defineCustomElement(App)

customElements.define('weather-widget', app)

document.body.append(document.createElement('weather-widget'))
