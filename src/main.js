import "./assets/main.scss";
import * as bootstrap from "bootstrap";
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
import VueAxios from "vue-axios";

import { createApp } from "vue";
import App from "./App.vue";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const app = createApp(App);
app.use(VueApexCharts);
app.use(VueAxios, axios);
app.mount("#app");
