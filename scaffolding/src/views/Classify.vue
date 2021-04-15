<template>
  <div>
    <div class="header">
      <router-link to="/index" slot="left" class="router_left">
        <mt-button icon="back"></mt-button>
      </router-link>

      <div class="search">
        <img class="header_img" src="../assets/search.png" />
        <input type="text" placeholder="搜索" />
      </div>
    </div>
    <div class="main_contain">
      <div class="main_contain_left" :style="{height: borderHeight}">
        <div class="left_items" v-for="(item,i) in type2" :key="i" 
        :id="item.id">
        <h1 @click="showArticles2(item.ty2id)">{{item.type_name}}</h1>
        </div>
          
      </div>
      <div class="main_contain_right">
        
          <div class="right_items" v-for="(item,i) in articles" :key="i" 
        :id="item.id" >
        <router-link :to="`/details?atid=${item.atid}`">
              <div class="right_items_border">
                  <img :src="item.ar_image" class="items_img">
                  <div class="items_text">
                      <div class="items_title">{{item.title}}</div>
                      
                  </div>
              </div>
          </router-link>
          </div>
      </div>
    </div>
    
    <!-- <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="shouye">
        <img
          v-if="selected == 'shouye'"
          slot="icon"
          src="../assets/common/index_0.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/common/index_1.png" alt="" />
        首页
      </mt-tab-item>
      <mt-tab-item id="dingpiao">
        <img
          v-if="selected == 'dingpiao'"
          slot="icon"
          src="../assets/common/ticket_0.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/common/ticket_1.png" alt="" />
        订票</mt-tab-item
      >
      <mt-tab-item id="me">
        <img
          v-if="selected == 'me'"
          slot="icon"
          src="../assets/common/me_0.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/common/me_1.png" alt="" />
        我的</mt-tab-item
      >
    </mt-tabbar> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      type2: [],
      articles: [],
      borderHeight:'0px'
    };
  },
  mounted() {
      this.initBorderHeight();
    //获取请求参数id   /article?id=1111
    let tyid = this.$route.query.tyid;
    console.log(tyid);
    //通过tyid发送请求获取详情数据

    this.axios.post("/category2", `tyid=${tyid}`).then((res) => {
      console.log(res);

      this.type2 = res.data.results;
    });
this.axios.post("/articlesByType1", `tyid=${tyid}`).then((res) => {
        console.log(res);
        this.articles = res.data.results;
        console.log(this.articles)
        for(var i=0;i<this.articles.length;i++)
          {
            this.articles[i].ar_image=require(`../assets/${this.articles[i].ar_image}`)
          }
      });

  },
  methods: {
       /** 初始化轮播图的高度 */
      initBorderHeight(){
        // 通过公式  计算轮播图应该设置的高度 
        let screenheight = window.screen.height;
        console.log(screenheight)
        let height = Math.floor(screenheight)+"px";
        console.log(height)
        this.borderHeight = height;
      },
    showArticles2: function (e) {
      console.log(e);
      this.axios.post("/articlesByType2", `tyid=${e}`).then((res) => {
        console.log(res);
        this.articles = res.data.results;
        console.log(this.articles)
        for(var i=0;i<this.articles.length;i++)
          {
            this.articles[i].ar_image=require(`../assets/${this.articles[i].ar_image}`)
          }
      });
    },
  },
};
</script>
<style scoped>
@media (min-width: 320px) {
  .main_contain {
    margin: 0% 0;
    display: flex;
  }
  .main_contain_left {
    width: 30%;
    border-right: 1px solid #ccc;
  }
  .left_items h1 {
    margin: 20% 5%;
    font-size: 120%;
    color: #A80000;
    font-size: 100%;
  }
  .main_contain_right {
    width: 70%;
  }
  .right_items_border{
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
  }
  .right_items{
    margin: 5% 0;
  }
  .right_items a{
    color: #a80000;
  }
  .items_img{
      margin:auto 0;
      width: 4rem;
      height: 4rem;
      border-radius: 10px;
  }
  .items_text{
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .items_title{
      width:100%;
      overflow-wrap: break-word;
      }
  .header {
    height: 40px;
    background-color: #a80000;
    position: relative;
  }
  .router_left {
    color: #faad00;
  }
  .search {
    height: 100%;
    position: relative;
    top: -40px;
    line-height: 40px;
    width: 80%;
    margin-left: 20%;
  }
  .search input {
    position: absolute;
    height: 60%;
    top: 15%;
    width: 70%;
    padding-left: 10%;
    border: 1px solid #faad00;
    border-radius: 5px;
  }
  .header_img {
    position: absolute;
    z-index: 10;
    left: 0%;
    top: 10%;
    width: 2rem;
    height: 2rem;
  }
  .mint-button--default {
    color: #faad00;
    background-color: transparent;
  }


  
}
@media (min-width: 375px) {

  
}
@media (min-width: 768px) {
  .main_contain{
      font-size: 150%;
      padding:0 5%;
  }
  .main_contain_left{
    font-size: 120%;
    width: 25%;
    padding-top: 5%;
  }
  .main_contain_right{
    font-size: 120%;
    padding-top: 5%;
  }
  .mint-button--default{
      position: relative;
      top: 10px;
  }
  .items_img{
      margin:auto 0;
      width: 8rem;
      height: 8rem;
  }
.search input {
    font-size: 120%;
    padding-left: 7%;
    top: 17%;
  }
  .header_img {
    top: 7%;
    width: 3rem;
    height: 3rem;
  }

}

@media (min-width: 1000px) {
    
  .main_contain{
      font-size: 200%;
  }
  .search input {
      font-size: 150%;
    top: 15%;
    padding-left: 7%;
  }
  .header_img {
    top: 2%;
    width: 4rem;
    height: 4rem;
  }
}
</style>