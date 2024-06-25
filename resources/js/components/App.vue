<template>
    <main>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand">INNYX - Desafio</router-link>
                <button v-if="isLoggedIn" class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div v-if="isLoggedIn" class="collapse navbar-collapse" id="navbarNav">
                    <div class="navbar-nav">
                        <router-link to="/" class="nav-item nav-link" exact-active-class="active">Início</router-link>
                        <router-link to="/category" class="nav-item nav-link"
                            :class="{ active: isActiveCategoryRoute }">Categorias</router-link>
                        <router-link to="/product" class="nav-item nav-link"
                            :class="{ active: isActiveProductRoute }">Produtos</router-link>
                        <router-link v-if="isAdmin" to="/user" class="nav-item nav-link"
                            :class="{ active: isActiveUserRoute }">Usuários</router-link>
                    </div>
                    <div class="navbar-nav ms-auto">
                        <span class="nav-item nav-link disabled">{{ userName }} | {{ role }}</span>
                        <button @click="logout" class="nav-item nav-link btn btn-link">
                            Logout
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                <path fill-rule="evenodd"
                                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg></button>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isLoggedIn = ref(false);
const isAdmin = ref(false);
const userName = ref('');
const router = useRouter();
const route = useRoute();
const role = ref('');


const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    userName.value = localStorage.getItem('user');
    role.value = localStorage.getItem('role');
    isLoggedIn.value = token !== null;
    isAdmin.value = localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'master';
};

const isActiveCategoryRoute = ref(false);
const isActiveProductRoute = ref(false);
const isActiveUserRoute = ref(false);

const updateActiveRoutes = () => {
    const categoryRoutes = ['categoryList', 'categoryAdd', 'categoryEdit'];
    const productRoutes = ['productList', 'productAdd', 'productEdit'];
    const userRoutes = ['userList', 'userAdd', 'userEdit'];

    isActiveCategoryRoute.value = categoryRoutes.includes(route.name);
    isActiveProductRoute.value = productRoutes.includes(route.name);
    isActiveUserRoute.value = userRoutes.includes(route.name);
};

onMounted(() => {
    checkLoggedIn();
    updateActiveRoutes();
});

watch(route, () => {
    checkLoggedIn();
    updateActiveRoutes();
});

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    isLoggedIn.value = false;
    isAdmin.value = false;
    userName.value = '';
    router.push('/login');
};
</script>

<style scoped></style>
