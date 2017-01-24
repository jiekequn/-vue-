<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="brands">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>

      </div>
      <div  v-if="seller.supports"class="support-count">
          <span class="count">{{seller.supports.length}}个</span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showdetail">
          <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
          <i class="icon iconfont icon-zuoyoujiantou"></i>
    </div>
    <div class="background">
      <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" style="width:100%;height:100%">
    </div>
    <transition name="fade-enter">
       <div v-show="detailShow" class="detail" @click="hidedetail">
         <div class="detail-wrapper clearFix">
           <div class="detail-main">
             <h1 class="name">{{seller.name}}</h1>
             <div class="star-wrapper">
               
             </div>
             <div class="title">
               <div class="line"></div>
               <div class="text">优惠信息</div>
               <div class="line"></div>
             </div>
             <ul v-if="seller.supports" class="supports">
               <li class="support-item" v-for="(item, index) in seller.supports">
                 <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                 <span class="text">{{seller.supports[index].description}}</span>
               </li>
             </ul>
             <div class="title">
               <div class="line"></div>
               <div class="text">商家公告</div>
               <div class="line"></div>
             </div>
             <div class="bulletin">
               <p class="content">{{seller.bulletin}}</p>
             </div>
           </div>
         </div>
         <div class="detail-close" @click="hidedetail">
           <i class="iconfont icon-cha"></i>
         </div>
       </div>
       </transition>
  </div>
  
</template>
<script>
  export default {
    props: {
    seller: {
      type:Object
    }
    },
    data(){
      return {
        detailShow:false
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      showdetail: function () {
        this.detailShow=true
      },
      hidedetail: function () {
        this.detailShow=false
      }
    }
  }
</script>

<style>
  .header{
  color:#fff;
  position:relative;
  background:rgba(7,17,27,0.5)
  }
  .content-wrapper{
    padding:24px 12px 18px 24px;
    font-size:0;
    overflow:hidden;
    position:relative;
  }
  .avatar{
    display:inline-block;
    float:left
  }
  .content{
    float:left;
    font-size:16px;
    margin-left:16px;
  }
  .title{
    margin:2px 0 8px 0;
  }
  .brand{
    display:inline-block;
    height:20px;
    width:40px;
    background:url("brand@2x.png") no-repeat;
    background-size:100%;
  }
  .support .icon{
    display:inline-block;
    width:12px;
    height:12px;
    margin-right:4px;
    background-size:12px 12px;
    background-repeat:no-repeat; 
  }
  .decrease{
    background:url("decrease_1@2x.png") no-repeat;
  }
  .discount{
    background:url("discount_1@2x.png") no-repeat;
  }
  .guarantee{
    background:url("guarantee_1@2x.png") no-repeat;
  }
  .invoice{
    background:url("invoice_1@2x.png") no-repeat;
  }
  .special{
    background:url("special_1@2x.png") no-repeat;
  }
  .support-count{
    position:absolute;
    right:12px;
    bottom:18px;
    padding:0 8px;
    height:24px;
    line-height:24px;
    border-radius:14px;
    background:rgba(0,0,0,0.2);
    text-align:center;
    font-size:16px;
    color:#fff;
  }

  .header .bulletin-wrapper {
    position: relative;
    background-color: rgba(7,17,27,0.2);
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header .bulletin-wrapper .bulletin-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    background-image: url("bulletin@2x.png");
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
  .header .bulletin-wrapper .bulletin-text {
  vertical-align: top;
  margin: 0 4px;
  font-size: 10px;
}

  .header .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    -webkit-backdrop-filter: blur(10px);
  }
  .header .detail.fade-enter-active {
    animation: bounce-in 0.5s;
  }
  .header .detail.fade-leave-active {
    animation: bounce-out 0.5s;
  }
  @keyframes bounce-in {
  0% {
      transform: scale(0);
  }
  50% {
      transform: scale(1.5);
  }
  100% {
      transform: scale(1);
  }
  }
  @keyframes bounce-out {
  0% {
      transform: scale(1);
  }
  50% {
      transform: scale(1.5);
  }
  100% {
      transform: scale(0);
  }
  }
  .detail-wrapper {
    width: 100%;
    min-height: 100%;
  }
  .detail-wrapper .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .detail-wrapper .detail-main .name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700px;
  }
  .detail-wrapper .detail-main .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .detail-wrapper .detail-main .title {
    width: 80%;
    display: -ms-flexbox;
    display: flex;
    margin: 28px auto 0 auto;
  }
  .detail-wrapper .detail-main .title .line {
    -ms-flex: 1;
        flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .detail-wrapper .detail-main .title .text {
    padding: 0px 12px;
    font-size: 16px;
    font-weight: 700px;
  }
  .detail-wrapper .detail-main .supports {
    width: 80%;
    margin: 22px auto;
  }
  .detail-wrapper .detail-main .supports .support-item {
    padding: 0 12px;
    font-size: 0px;
    margin-bottom: 12px;
  }
  .detail-wrapper .detail-main .supports .support-item:last-child {
    margin-bottom: 0px;
  }
  .detail-wrapper .detail-main .supports .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .detail-wrapper .detail-main .supports .support-item .icon.decrease {
    background-image: url("decrease_2@2x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio) {
  .detail-wrapper .detail-main .supports .support-item .icon.decrease {
      background-image: url("decrease_2@3x.png");
  }
  }
  .detail-wrapper .detail-main .supports .support-item .icon.discount {
    background-image: url("discount_2@2x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio) {
  .detail-wrapper .detail-main .supports .support-item .icon.discount {
      background-image: url("discount_2@3x.png");
  }
  }
  .detail-wrapper .detail-main .supports .support-item .icon.guarantee {
    background-image: url("guarantee_2@2x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio) {
  .detail-wrapper .detail-main .supports .support-item .icon.guarantee {
      background-image: url("guarantee_2@3x.png");
  }
  }
  .detail-wrapper .detail-main .supports .support-item .icon.invoice {
    background-image: url("invoice_2@2x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio) {
  .detail-wrapper .detail-main .supports .support-item .icon.invoice {
      background-image: url("invoice_2@3x.png");
  }
  }
  .detail-wrapper .detail-main .supports .support-item .icon.special {
    background-image: url("special_2@2x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio) {
  .detail-wrapper .detail-main .supports .support-item .icon.special {
      background-image: url("special_2@3x.png");
  }
  }
  .detail-wrapper .detail-main .supports .support-item .text {
    line-height: 12px;
    font-size: 12px;
    color: #fff;
  }
  .detail-wrapper .detail-main .bulletin {
    width: 80%;
    height: 200px;
    margin: 22px auto;
  }
  .detail-wrapper .detail-main .bulletin .content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }

  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);

  }
</style>
