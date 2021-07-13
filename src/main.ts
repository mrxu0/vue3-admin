import { createApp } from 'vue';
import routers from './plugins/routers';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import store from './plugins/store';
import i18n from './plugins/i18n/i18n';

const app = createApp(App);
app.use(routers);
app.use(store);
app.use(i18n);
// app.use(Antd)
app.mount('#app');
