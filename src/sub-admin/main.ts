import { createApp } from 'vue';
import App from './app.vue'
import router from './router';
const app = createApp(App).use(router);
app.mount('#app');