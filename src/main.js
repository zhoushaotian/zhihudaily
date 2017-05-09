// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

import latest from './components/latest/latest';
import theme from './components/theme/theme';
import about from './components/about/about';
import './common/stylus/base.styl';
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MuseUI);
/* eslint-disable no-new */
const routes = [
    { path: '/latest', component: latest },
    { path: '/theme', component: theme },
    { path: '/about', component: about }
];
const router = new VueRouter({ routes });
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router
});
router.push('/latest');