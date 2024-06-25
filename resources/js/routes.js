import Home from './components/Welcome.vue';
import Category from './components/category/List.vue';
import CategoryAdd from './components/category/Add.vue';
import CategoryEdit from './components/category/Edit.vue';
import Login from './components/user/Login.vue';
import Product from './components/product/List.vue';
import ProductAdd from './components/product/Add.vue';
import ProductEdit from './components/product/Edit.vue';
import User from './components/user/List.vue';
import UserAdd from './components/user/Add.vue';
import UserEdit from './components/user/Edit.vue';




export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, name: 'login' },

    { path: '/category', component: Category, name: 'categoryList' },
    { path: '/category/add', component: CategoryAdd, name: 'categoryAdd' },
    { path: '/category/edit/:id', component: CategoryEdit, name: 'categoryEdit', props: true },

    { path: '/product', component: Product, name: 'productList' },
    { path: '/product/add', component: ProductAdd, name: 'productAdd' },
    { path: '/product/edit/:id', component: ProductEdit, name: 'productEdit', props: true },

    { path: '/user', component: User, name: 'userList' },
    { path: '/user/add', component: UserAdd, name: 'userAdd' },
    { path: '/user/edit/:id', component: UserEdit, name: 'userEdit', props: true },
];
