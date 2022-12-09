import { createApp } from 'vue';
import App from './app.vue';
import { createPinia } from 'pinia';
import router from './router';
import './styles/index.scss';
import ElementPlus from 'element-plus';
import '@/common/components/twice/element-reset';

const app = createApp(App).use(router).use(createPinia()).use(ElementPlus);
app.mount('#app');
