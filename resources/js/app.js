import { createApp } from 'vue';
import App from './components/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'vue3-toastify/dist/index.css';




const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token');
    if (!loggedIn) {
        if (to.name !== 'login') {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const app = createApp(App);


app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
