<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Editar Usuário</h4>
                </div>
                <div v-if="loading" class="col-12 d-flex justify-content-center align-items-center"
                    style="min-height: 15vh;">
                    <div class="spinner-border text-dark" role="status">
                        <span class="visually-hidden">Carregando...</span>
                    </div>
                </div>
                <div class="card-body" v-if="!loading">
                    <form @submit.prevent="update">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Nome</label>
                                    <input type="text" class="form-control" v-model="user.name" required>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" v-model="user.email" required>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Nova Senha</label>
                                    <input type="password" class="form-control" v-model="user.newPassword">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Permissão</label>
                                    <select class="form-control" v-model="user.role" required>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-dark">
                                    Atualizar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { notify } from '../utils/notify';

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const user = ref({
    name: "",
    email: "",
    newPassword: "",
    role: "user",
});

const error = ref(null);
let currentPassword = '';

const showUser = async () => {
    try {
        loading.value = true;
        const response = await axios.get(`/api/users/${route.params.id}`);
        const userData = response.data;
        user.value.name = userData.name;
        user.value.email = userData.email;
        user.value.role = userData.role;
        user.value._method = 'patch'
        currentPassword = userData.password;
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
};

const update = async () => {
    try {
        if (user.value.newPassword) {
            user.value.password = user.value.newPassword;
        }

        await axios.post(`/api/users/${route.params.id}`, user.value);
        notify('Usuário atualizado com sucesso!', 'success');
        setTimeout(() => {
            router.push({ name: 'userList' });
        }, 3000);
    } catch (err) {
        if (err.response && err.response.status === 422) {
            error.value = 'Erro de validação. Por favor, verifique os campos.';
        } else {
            error.value = 'Um erro ocorreu. Por favor, tente novamente.';
        }
        notify(error, 'error');
        console.error(err);
    }
};

onMounted(showUser);
</script>

<style scoped></style>
