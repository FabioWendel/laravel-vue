<template>
    <div class="row">
        <div class="col-12">
            <div v-if="loading" class="col-12 d-flex justify-content-center align-items-center"
                style="min-height: 15vh;">
                <div class="spinner-border text-dark" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
            </div>
            <div class="card" v-if="!loading">
                <div class="card-header">
                    <h4>Cadastrar Produto</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="create">
                        <div class="mb-3">
                            <label for="name" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="name" v-model="product.name" required>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Descrição</label>
                            <textarea class="form-control" id="description" v-model="product.description"
                                rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Preço</label>
                            <input type="number" class="form-control" id="price" v-model="product.price" required>
                        </div>
                        <div class="mb-3">
                            <label for="date_validate" class="form-label">Data de Validade</label>
                            <input type="date" class="form-control" id="date_validate" v-model="product.date_validate"
                                required>
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Imagem</label>
                            <input type="file" class="form-control-file" id="image" @change="onFileChange">
                        </div>
                        <div class="mb-3">
                            <label for="category_id" class="form-label">Categoria</label>
                            <select class="form-control" id="category_id" v-model="product.category_id" required>
                                <option disabled value="">Selecione uma categoria</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">{{
                                    category.name }}</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-dark">
                            Cadastrar
                        </button>
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
const loading = ref(false);


const product = ref({
    name: "",
    description: "",
    price: null,
    date_validate: "",
    image: null,
    category_id: null,
});

const categories = ref([]);

const create = async () => {
    try {
        let formData = new FormData();
        formData.append('name', product.value.name);
        formData.append('description', product.value.description);
        formData.append('price', product.value.price);
        formData.append('date_validate', product.value.date_validate);
        formData.append('category_id', product.value.category_id);
        formData.append('image', product.value.image);

        await axios.post('/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        notify('Produto cadastrado com sucesso!', 'success');
        setTimeout(() => {
            router.push({ name: "productList" });
        }, 3000);

    } catch (err) {
        if (err.response && err.response.status === 422) {
            error.value = 'Um ou mais campos são inválidos.';
        } else {
            error.value = 'Um erro ocorreu. Por favor, tente novamente.';
        }
        notify(error, 'error');
        console.error(err);
    }
};

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        product.value.image = file;
    }
};

const getCategories = async () => {
    try {
        loading.value = true;
        const response = await axios.get('/api/categoriesAll');
        categories.value = response.data;
    } catch (error) {
        console.log(error);
        categories.value = [];
    } finally {
        loading.value = false;
    }
};

getCategories();
</script>
