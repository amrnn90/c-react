import VueRouter from 'vue-router';
import Vue from 'vue';
import ResourceIndex from './pages/ResourceIndex';
import ResourceCreate from './pages/ResourceCreate';
import ResourceEdit from './pages/ResourceEdit';
import store from '@/store';

Vue.use(VueRouter);

const resourceRoutes = store.getters['structure/routes'];

const routes = [
    ...resourceRoutes.index.map(route => ({ ...route, component: ResourceIndex })),
    ...resourceRoutes.create.map(route => ({ ...route, component: ResourceCreate })),
    ...resourceRoutes.edit.map(route => ({ ...route, component: ResourceEdit })),
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;