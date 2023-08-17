import WeatherPage from '@/views/WeatherPage.ce.vue'
import SettingsPage from '@/views/SettingsPage.ce.vue'
import CityCard from '@/components/CityCard.ce.vue'
import DropPlace from '@/components/DropPlace.ce.vue'
import SettingsCityItem from '@/components/SettingsCityItem.ce.vue'

/*
 * Fix for issue https://github.com/vuejs/core/issues/4662.
 * Vue defineCustomElement() does not add inner components styles by default.
 */
export const innerStylesIntoRootComponent = (rootComponent) => {
  rootComponent.styles = [
    rootComponent,
    WeatherPage,
    SettingsPage,
    CityCard,
    DropPlace,
    SettingsCityItem
  ].reduce((acc, component) => {
    return acc.concat(component.styles)
  }, [])
}
