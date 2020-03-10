import FlashMessages from './FlashMessages';
import {flash} from './FlashMessages';

const notifications = [1,2];

export default {
    install(Vue, options) {
        Vue.component('flash-messages', FlashMessages);
        Vue.$flash = Vue.prototype.$flash = flash;
    }

}