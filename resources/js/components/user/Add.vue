<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Cadastrar Usuário</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="create">
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
                                    <label>Senha</label>
                                    <input type="password" class="form-control" v-model="user.password" required>
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
                                    Cadastrar
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { notify } from '../utils/notify';

const error = ref(null);
const router = useRouter();

const user = ref({
    name: "",
    email: "",
    password: "",
    role: "user",
});

const create = async () => {
    try {
        await axios.post('/api/register', user.value);
        notify('Usuário cadastrado com sucesso!', 'success');
        setTimeout(() => {
            router.push({ name: 'userList' });
        }, 3000);
    } catch (err) {
        if (err.response && err.response.status === 422) {
            error.value = 'Erro de validação. Verifique os campos e tente novamente.';
        } else {
            error.value = 'Um erro ocorreu. Por favor, tente novamente.';
        }
        notify(error, 'error');
        console.log(err);
    }
};
</script>
