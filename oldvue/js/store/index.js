import Vue from 'vue';
import Vuex from 'vuex';
import VuexDynamicModule from '@/plugins/vuex-dynamic-module';
import structure from './structure'; 

Vue.use(Vuex);
Vue.use(VuexDynamicModule);

const store = new Vuex.Store({
  modules: {
    structure: structure
  }
});

export default store;