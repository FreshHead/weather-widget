import { createApp, defineCustomElement } from "vue";
import { createPinia } from "pinia";

import App from "./WeatherWidget.ce.vue";
import { innerStylesIntoRootComponent } from "@/utils.js";

// Feel free to ask in an interview why I chose this workaround.
innerStylesIntoRootComponent(App);

createApp(App).use(createPinia());
const app = defineCustomElement(App);

customElements.define("weather-widget", app);

document.body.append(document.createElement("weather-widget"))