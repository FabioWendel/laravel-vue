<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="d-none d-md-inline mb-3">Categorias</h4>
        <form @submit.prevent="searchCategories">
          <div style="width: 25rem">
            <div class="input-group mb-3">
              <input type="search" v-model="searchQuery" class="form-control form-control-sm"
                placeholder="Pesquisar Categoria" aria-label="Pesquisar Categoria" aria-describedby="button-addon2">
              <div class="input-group-append">
                <button class="btn btn btn-outline-dark btn-sm" type="submit" id="button-addon2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-search" viewBox="0 0 16 16">
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
        <router-link :to="{ name: 'categoryAdd' }" class="btn btn-outline-dark btn-sm mb-3">
          <span class="d-none d-sm-inline">Nova Categoria</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus"
            viewBox="0 0 16 16">
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </router-link>
      </div>
      <div class="shadow p-2 mb-5 bg-white rounded">
        <div v-if="loading" class="col-12 d-flex justify-content-center align-items-center" style="min-height: 15vh;">
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
        <div class="card-body" v-if="!loading">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody v-if="categories.length > 0">
                <tr v-for="(category, key) in categories" :key="key">
                  <td>{{ category.id }}</td>
                  <td>{{ category.name }}</td>
                  <td style="width:8rem">
                    <router-link :to="{ name: 'categoryEdit', params: { id: category.id } }"
                      class="btn btn-success btn-sm" style="margin-right: 15px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path
                          d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                      </svg>
                    </router-link>
                    <button type="button" @click="deleteCategory(category)" class="btn btn-danger btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path
                          d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" align="center">Nenhuma categoria encontrada.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav v-if="lastPage > 1">
            <ul class="pagination pagination-sm justify-content-end p-3">
              <li :class="['page-item', { disabled: currentPage === 1 }]">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                    class="bi bi-arrow-left-short" viewBox="0 0 15 15">
                    <path fill-rule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                  </svg>
                </a>
              </li>
              <li v-for="page in lastPage" :key="page" :class="['page-item', { active: currentPage === page }]">
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li :class="['page-item', { disabled: currentPage === lastPage }]">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                    class="bi bi-arrow-right-short" viewBox="0 0 15 15">
                    <path fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div id="confirmDeleteModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Exclusão</h5>
            <button type="button" class="btn-close" @click="hideModal()" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Tem certeza de que deseja excluir {{ categoryName }}?
          </div>
          <div class="modal-footer">
            <button type="button" @click="hideModal()" class="btn btn-secondary">Cancelar</button>
            <button type="button" @click="confirmDelete" class="btn btn-danger">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const categories = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const router = useRouter();
const loading = ref(false);

const selectedCategoryId = ref(null);
const categoryName = ref('');
const searchQuery = ref('');

const getCategories = async (page = 1) => {
  try {
    loading.value = true;
    const response = await axios.get(`/api/categories?page=${page}`);
    categories.value = response.data.data;
    currentPage.value = response.data.current_page;
    lastPage.value = response.data.last_page;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    categories.value = [];
  } finally {
    loading.value = false;
  }
};

const searchCategories = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/api/categories-search', {
      params: {
        query: searchQuery.value
      }
    });
    categories.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    categories.value = [];
  } finally {
    loading.value = false;
  }
};


watch(searchQuery, () => {
  if (searchQuery.value === '') {
    getCategories();
  }
});

onMounted(() => {
  getCategories();
});

const deleteCategory = (category) => {
  selectedCategoryId.value = category.id;
  categoryName.value = category.name;
  showModal();
};

const confirmDelete = async () => {
  try {
    loading.value = true;
    await axios.delete(`/api/categories/${selectedCategoryId.value}`);
    getCategories(currentPage.value);
    hideModal();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const showModal = () => {
  const modal = document.getElementById('confirmDeleteModal');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
  }
};

const hideModal = () => {
  const modal = document.getElementById('confirmDeleteModal');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
};

const changePage = (page) => {
  if (page > 0 && page <= lastPage.value) {
    getCategories(page);
  }
};
</script>

<style scoped>
.active .page-link {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
}
</style>