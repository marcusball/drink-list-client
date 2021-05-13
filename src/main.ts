import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// Add Spectre.css
import "./assets/sass/main.scss";

createApp(App).use(router).mount('#app')
