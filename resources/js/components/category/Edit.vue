<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Editar Categoria</h4>
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
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="category.name">
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


const route = useRoute();
const router = useRouter();
const category = ref({ name: "", _method: "patch" });
const error = ref(null);
const loading = ref(false);


const showCategory = async () => {
    try {
        loading.value = true;
        const response = await axios.get(`/api/categories/${route.params.id}`);
        category.value.name = response.data.name;
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
};

const update = async () => {
    try {
        await axios.post(`/api/categories/${route.params.id}`, category.value);
        notify('Categoria atualizado com sucesso!', 'success');
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

onMounted(showCategory);
</script>

<style scoped></style>
