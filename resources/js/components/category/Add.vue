<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Cadastrar Categoria</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="create">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Nome</label>
                                    <input type="text" class="form-control" v-model="category.name" required>
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

const category = ref({
    name: "",
});

const create = async () => {
    try {
        await axios.post('/api/categories', category.value);
        notify('Categoria cadastrado com sucesso!', 'success');
        setTimeout(() => {
            router.push({ name: "categoryList" });
        }, 3000);
    } catch (err) {
        if (err.response && err.response.status === 422) {
            error.value = 'Nome da Categoria já existente.';
        } else {
            error.value = 'Um erro ocorreu. Por favor, tente novamente.';
        }
        notify(error, 'error');
        console.log(err);
    }
};
</script>
