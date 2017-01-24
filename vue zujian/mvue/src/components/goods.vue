<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="text">
                        <span v-show="item.type>0" class="icon"  :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
           <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                     <h1 class="title">{{item.name}}</h1>
                     <ul>
                       <li v-for="food in item.foods" class="food-item" @click="selectFood(food, $event)">
                         <div class="icon">
                           <img :src="food.icon" alt="" width="57">
                         </div>
                         <div class="content">
                           <h2 class="name">{{food.name}}</h2>
                           <p class="desc">{{food.description}}</p>
                           <div class="extra">
                             <span class="count">月售{{food.sellCount}}</span><span class="count">好评{{food.rating}}</span>
                           </div>
                           <div class="price">
                             <span class="now">￥{{food.price}}</span><span class="old"">￥{{food.oldPrice}}</span>
                           </div>
                           <div class="cartControl-wrapper">
                             
                           </div>
                         </div>
                       </li>
                     </ul>
               </li>
            </ul>
        </div>
    </div>
    
</template>

<script>

import  BScroll from 'better-scroll'
const ERR_OK=0;
export default {
  props:{
    seller:{
        type:Object
    }
  },
  data() {
    return {
        goods:[],
        listHeight:[],
        scrollY:0
    }
  },
  computed:{
    currentIndex (){
        for( let i = 0; i < this.listHeight.length; i++){
            let height1=this.listHeight[i];
            let height2=this.listHeight[i+1];
            if(!height2||this.scrollY>=height1&&this.scrollY<height2){
                return i;
            }
        }
        return 0;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response)=>{
      response=response.body;
      if(response.errno === ERR_OK){
        this.goods = response.data;
        this.$nextTick(()=>{
           this._initScroll();
           this._calculate();
        })
        
      }
    })  
  },
  methods : {
    selectMenu(index,event){
        if(!event._constructed){
            return;
        }
        console.log(index);
        let foodList= this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        let el=foodList[index];
        this.foodScroll.scrollToElement(el,300);
        
    },
    _initScroll () {
       console.log(this.$refs.menuWrapper)
       this.menuScroll =new BScroll(this.$refs.menuWrapper,{
            click:true
       })
       this.foodScroll =new BScroll(this.$refs.foodsWrapper,{
        click:true,
        probeType:3
       })
       this.foodScroll.on("scroll",(pos)=>{
            this.scrollY=Math.abs(Math.round(pos.y))
       })
    },
    _calculate () {
        let foodList= this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        let height = 0;
        this.listHeight.push(height);
        for(let i= 0;i<foodList.length; i++){
            let item = foodList[i];
            height +=item.clientHeight;
            this.listHeight.push(height);
        }
        console.log(this.listHeight);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .goods{
        display:flex;
        position:absolute;
        top:174px;
        bottom:46px;
        width:100%;
        overflow:hidden
    }
    .menu-wrapper{
        flex:0 0 80px;
        width:80px;
        background:#f3f5f7;
    }
    .menu-item{
        display:table;
        height:54px;
        width:56px;
        line-height:14px;
        padding:0 12px;
    }
    .current {
      position: relative;
      z-index: 10;
      margin-top: -1px;
      background: #fff;
      font-weight: 700;
    }
    .icon{
      display:inline-block;
      width:12px;
      height:12px;
      margin-right:4px;
      background-size:12px 12px;
      background-repeat:no-repeat; 
    }
    .decrease{
      background:url("header/decrease_1@2x.png") no-repeat;
    }
    .discount{
      background:url("header/discount_1@2x.png") no-repeat;
    }
    .guarantee{
      background:url("header/guarantee_1@2x.png") no-repeat;
    }
    .invoice{
      background:url("header/invoice_1@2x.png") no-repeat;
    }
    .special{
      background:url("header/special_1@2x.png") no-repeat;
    }
    .goods .text{
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        position: relative;
        font-size: 12px;
    }
    .goods .foods-wrapper {
      -ms-flex: 1;
          flex: 1;
    }
    .goods .foods-wrapper .food-list .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: #93999f;
      background: #f3f5f7;
    }
    .goods .foods-wrapper .food-list .food-item {
      display: -ms-flexbox;
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      position: relative;
    }
    .goods .foods-wrapper .food-list .food-item:after {
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: 1px solid rgba(7,17,27,0.1);
      width: 100%;
      content: '';
    }
    .goods .foods-wrapper .food-list .food-item:last-child {
      margin-bottom: 0px;
    }
    .goods .foods-wrapper .food-list .food-item:last-child:after {
      display: none;
    }
    .goods .foods-wrapper .food-list .food-item .icon {
      -ms-flex: 0 0 57px;
          flex: 0 0 57px;
      margin-right: 10px;
    }
    .goods .foods-wrapper .food-list .food-item .content {
      -ms-flex: 1;
          flex: 1;
    }
    .goods .foods-wrapper .food-list .food-item .content .name {
      margin: 2px 0 8px 0;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      color: #07111b;
    }
    .goods.foods-wrapper .food-list .food-item .content .desc,
    .goods .foods-wrapper .food-list .food-item .content .extra {
      font-size: 10px;
      line-height: 10px;
      color: #93999f;
    }
    .goods .foods-wrapper .food-list .food-item .content .desc {
      margin-bottom: 8px;
      line-height: 12px;
    }
    .goods .foods-wrapper .food-list .food-item .content .extra .count {
      margin-right: 12px;
    }
    .goods.foods-wrapper .food-list .food-item .content .price {
      font-weight: 700px;
      line-height: 24px;
    }
    .goods .foods-wrapper .food-list .food-item .content .price .now {
      margin-right: 8px;
      font-size: 14px;
      color: #f01414;
    }
    .goods .foods-wrapper .food-list .food-item .content .price .old {
      font-size: 10px;
      color: #93999f;
      text-decoration: line-through;
    }
    .goods .foods-wrapper .food-list .food-item .content .cartControl-wrapper {
      position: absolute;
      right: 0;
      bottom: 12px;
    }
</style>