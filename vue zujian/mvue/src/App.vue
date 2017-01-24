<template>
  <div id="app">
   

    <v-header :seller="seller"></v-header>
    <div class="tab">
    <router-link :to="{ path: '/goods'}">
          商品

        </router-link>
      <router-link :to="{ path: '/ratings'}" replace>
          评论

        </router-link>
      <router-link :to="{ path: '/seller'}">
          商家

        </router-link>
    </div>
    <transition>

   <router-view :seller="seller" keep-alive></router-view>
   </transition>

  </div>
</template>


<script>
    const ERR_OK=0
    import header from 'components/header/header.vue';
    export default {
      data() {
        return {
        seller:{}
        };
      },
      created() {
      this.$http.get('/api/seller').then((response)=>{
        response=response.body;
        if(response.errno === ERR_OK){
          this.seller = response.data;
          console.log(this.seller);
        }
      })  
      },
      components: {
      'v-header': header
    }
    };
</script>
<style rel="stylesheet" href="static/css/reset.css"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.tab{
  display:flex;
  width:100%;
  height:40px;
  line-height:40px;
  text-align:center;
}
.tab a{
  flex:1
}
.active{
color:red;
}
</style>
