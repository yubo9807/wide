import { createApp } from 'vue';
import App from './app.vue'
import router from './router';
import ElementPuls from 'element-plus';
import '../common/components/twice/element-reset';
import 'element-plus/dist/index.css';
import './styles/index.scss';

const app = createApp(App).use(router).use(ElementPuls);
app.mount('#app');