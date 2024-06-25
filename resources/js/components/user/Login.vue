<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h2 class="card-title text-center">Login</h2>
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" class="form-control" v-model="email" required />
              </div>
              <div class="form-group mb-3">
                <label for="password" class="form-label">Senha:</label>
                <input type="password" id="password" class="form-control" v-model="password" required />
              </div>
              <button type="submit" class="btn btn-dark w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { notify } from '../utils/notify';


const email = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('/api/login', { email: email.value, password: password.value });
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', response.data.user_name);
    localStorage.setItem('role', response.data.role);
    notify('Login realizado com sucesso!', 'success');
    setTimeout(() => {
      router.push('/');
    }, 1200);
  } catch (err) {
    if (err.response && err.response.status === 401) {
      error.value = 'Email ou senha inválidos';
    } else {
      error.value = 'Um erro ocorreu. Por favor, tente novamente.';
    }
    notify(error, 'error');
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>