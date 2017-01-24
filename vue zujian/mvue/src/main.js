// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VueResource from 'vue-resource';
Vue.use(VueResource);
import goods from './components/goods.vue';
import ratings from './components/ratings.vue';
import seller from './components/seller.vue';



const routes = [
  {path: '/', name: 'index', component: App, children: [{path: '/goods', component: goods}, {path: '/ratings', component: ratings}, {path: '/seller', component: seller}]}
];

const router = new VueRouter({
  'linkActiveClass': 'active',
   routes // ï¼ˆç¼©å†™ï¼‰ç›¸å½“äºŽ routes: routes
});


const app = new Vue({
  router,
  created () {
      this.getCustomers()
  },
  methods: {
      getCustomers: function() { 
      }
  }, 
   render: h => h('router-view')
}).$mount('#app');
  
  router.push('/goods');


   

  export default app;

