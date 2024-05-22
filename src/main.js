import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import store from './state/store';

import BootstrapVue3 from 'bootstrap-vue-3';
import vClickOutside from 'click-outside-vue3';
import Maska from 'maska';

import VueFeather from 'vue-feather';
import Particles from 'particles.vue3';

import '@/assets/scss/config/default/app.scss';
import '@vueform/slider/themes/default.css';
import '@/assets/scss/mermaid.min.css';
import TableComponent from '@/components/Table.vue';
import Antd from 'ant-design-vue';
import '@/assets/css/ant-button.css';
import '@/assets/css/style.css';

AOS.init({
  easing: 'ease-out-back',
  duration: 1000,
});

const pinia = createPinia();

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(BootstrapVue3)
  .component(VueFeather.type, VueFeather)
  .use(Maska)
  .use(pinia)
  .use(Particles)
  .component('s-table', TableComponent)
  .use(vClickOutside)
  .mount('#app');
