import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import "default-passive-events";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);

app.config.globalProperties.$axios = axios;
axios.defaults.baseURL = "/api";

app.mount("#app");
