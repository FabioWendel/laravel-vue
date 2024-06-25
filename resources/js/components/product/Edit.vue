<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Editar Produto</h4>
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
                                    <input type="text" class="form-control" v-model="product.name">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Descrição</label>
                                    <input type="text" class="form-control" v-model="product.description">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Preço</label>
                                    <input type="text" class="form-control" v-model="product.price">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Data de Validade</label>
                                    <input type="text" class="form-control" v-model="product.date_validate">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Imagem</label><br>
                                    <input type="file" class="form-control-file" @change="onFileChange">
                                    <img :src="previewImageUrl ? previewImageUrl : `/storage/${product.image}`"
                                        style="max-width: 100px; max-height: 100px;">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Categoria</label>
                                    <select class="form-control" v-model="product.category_id">
                                        <option v-for="category in categories" :key="category.id" :value="category.id">
                                            {{ category.name }}</option>
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
const product = ref({
    name: "",
    description: "",
    price: "",
    date_validate: "",
    image: "",
    category_id: "",
    _method: "patch"
});
const categories = ref([]);
const error = ref(null);

const previewImageUrl = ref(null);

const showProduct = async () => {
    try {
        loading.value = true;
        const response = await axios.get(`/api/products/${route.params.id}`);
        const { name, description, price, date_validate, image, category_id } = response.data;
        product.value = {
            name,
            description,
            price,
            date_validate,
            image,
            category_id,
            _method: "patch"
        };
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
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

const update = async () => {
    try {
        let formData = new FormData();
        formData.append('name', product.value.name);
        formData.append('description', product.value.description);
        formData.append('price', product.value.price);
        formData.append('date_validate', product.value.date_validate);
        formData.append('category_id', product.value.category_id);
        formData.append('_method', 'patch');

        if (product.value.image instanceof File) {
            formData.append('image', product.value.image);
        }


        await axios.post(`/api/products/${route.params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        notify('Produto atualizado com sucesso!', 'success');
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
        console.log(err);
    }
};

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        product.value.image = file;
        previewImageUrl.value = URL.createObjectURL(file);
    }
};

onMounted(() => {
    showProduct();
    getCategories();
});
</script>

<style scoped></style>
