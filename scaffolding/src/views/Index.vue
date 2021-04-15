<template>
  <div>
    <div class="header">
      <router-link to="/me" class="router_left"> 位置 </router-link>

      <div class="search">
        <img class="header_img" src="../assets/search.png" />
        <input type="text" placeholder="搜索" />
      </div>
    </div>
    <!--轮播图-->
        <mt-swipe class="mtswipe" 
            :style="{height: swipeHeight}"
            :auto="3000"
            :speed="150">
            <mt-swipe-item>
                <img src="../assets/lun1.png" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../assets/lun2.png" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../assets/lun3.png" alt="">
            </mt-swipe-item>
        </mt-swipe>
<div class="main_contain">
<div class="big_type">
  <div class="big_type_border" v-for="(item,i) in type" :key="i" 
        :id="item.id" >
    <div class="big_type_cir">
        <router-link :to="`/classify?tyid=${item.ty1id}`">
        <span class="big_type_name">{{item.type_name}}</span>
        </router-link>
    </div>
</div>

    
</div>
<div class="news">
    <h1>最新动态</h1>
    <div class="news_content">
      
        <div class="news_content_items"  v-for="(items,i) in articles" :key="i" 
        :id="items.id">
        <router-link :to="`/details?atid=${items.atid}`">
            <div class="news_img_border">
                <img class="news_img" :src="items.author_image">
            </div>
            <div class="news_title">
                <span>{{items.title}}</span></div>
            <div class="news_articles">
              <img class="news_articles_img" :src="items.ar_image">
                
                <div class="news_articles_name">
                    <div class="articles_name">{{items.author_name}}</div>
                    <span class="articles_type" v-if="items.vip_id=='1'">VIP</span>
                    <span class="articles_type" v-else>LYC</span>
                </div>
            </div>
        </router-link>
        </div>
    </div>
</div>
</div>
    <mt-tabbar v-model="selected" fixed>
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
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "shouye",
      swipeHeight: '0px',
      type: [],
      articles: [],
      key:'',
      location:''
    };
  },
  created(){
     this.getLocation();
  },
  mounted(){
      this.initSwipeHeight();
      this.loadNavItems();
      this.loadArticlesItems();
      this.key='6SYLAmZnwy5QSezOzBZz7uWD3ihm29Wo';
    this.location='34.79458,113.67899';
    console.log(this.location)
    console.log(`http://api.map.baidu.com/reverse_geocoding/v3/?ak=${this.key}&output=json&coordtype=wgs84ll&location=${this.location}`)
    this.getCityName();
  },
  methods:{
    getCityName(){
      this.axios.get(
            '/reverse_geocoding/v3',{
              params:{
                location:'34.79458,113.67899',
                output:'json',
                key:'6SYLAmZnwy5QSezOzBZz7uWD3ihm29Wo'
              }
            }
          ).then(res=>{
          console.log(res)
          //console.log(res.data)
          
        })
    },
    // getCityName(){
    //   this.axios.get(
    //         "http://api.map.baidu.com/reverse_geocoding/v3/?",`ak=${this.key}&output=json&coordtype=wgs84ll&location=${this.location}`
    //       ).then(res=>{
    //       console.log(res)
    //       //console.log(res.data)
          
    //     })
    // },
    getLocation() {
        const self = this
        AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
            })

            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete);
            AMap.event.addListener(geolocation, 'error', onError);

            function onComplete(data) {
                // data是具体的定位信息
                console.log('定位成功信息：', data);
            }

            function onError(data) {
                // 定位出错
                console.log('定位失败错误：', data);
                // 调用ip定位
                self.getLngLatLocation();
            }
        })
    },
    /** 加载文章列表   */
      loadArticlesItems(){
        // 通过axios  发送ajax请求，访问类别列表
        this.axios.get('/articles').then(res=>{
          console.log(res)
          this.articles = res.data.results
          for(var i=0;i<this.articles.length;i++)
          {
            this.articles[i].author_image=require(`../assets/${this.articles[i].author_image}`)
            this.articles[i].ar_image=require(`../assets/${this.articles[i].ar_image}`)
          }

        })
      },
       /** 加载类别列表  更新类别 */
      loadNavItems(){
        // 通过axios  发送ajax请求，访问类别列表
        this.axios.get('/category').then(res=>{
          console.log(res)
          this.type = res.data.results
        })
      },
      /** 初始化轮播图的高度 */
      initSwipeHeight(){
        console.log(window.screen.width)
        // 通过公式  计算轮播图应该设置的高度 
        let picwidth = 1280;
        let picheight = 720;
        let screenwidth = window.screen.width;
        let height = Math.floor((picheight * screenwidth) / picwidth)+"px";
        this.swipeHeight = height;
      },

  },
  watch: {
    //监听器
    selected(newvalue) {
      //newvalue是selected的新值
      if (newvalue == "shouye") {
        this.$router.push("/index");
      } else if (newvalue == "dingpiao") {
        this.$router.push("/order");
      } else if (newvalue == "me") {
        this.$router.push("/me");
      }
    },
  },
};
</script>
<style scoped>
@media (min-width: 320px) {
    .news h1{
      margin-top: 5%;
      margin-left: 3%;
      color: #faad00;
      font-size: 120%;
    }
    .news_content{
        width: 95%;
        margin: 3% auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    text-align: justify;
    }

    .news_content:after{
        
    content: '';
    width: 30%;
    border:1px solid transparent;
    }
    .news_content_items{
    
    width:48%;
    text-align: center;
    display: flex;
    flex-direction: column;
    }
    .news_content_items a{
      color: #000;
    }
    .news_img{
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .news_title{
      width: 90%;
      margin: 0 auto;
      margin-top: 5%;
      text-align: left;
    }
    .news_articles{
      width: 90%;
      display: flex;
      margin: 5% 5%;
    }
    .news_articles_name{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .news_articles_img{
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 6%;
      border: 1px solid #faad00;
    }
    .articles_name{
      font-size: 100%;
    }


.articles_type{
  width: 40%;
    padding: 1% 15%;
    border-radius: 10px;
    float: left;
    color: #a80000;
    border: 2px solid #a80000;
}
  .header {
    height: 40px;
    background-color: #a80000;
    position: relative;
  }
  .router_left {
    color: #faad00;
    line-height: 40px;
    margin-left: 5%;
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
    top: 14%;
    width: 70%;
    padding-left: 10%;
    border: 1px solid #faad00;
    border-radius: 5px;
  }
  .header_img {
    position: absolute;
    z-index: 10;
    left: 0%;
    top: 8%;
    width: 2rem;
    height: 2rem;
  }
.mtswipe img{
    width: 100%;
}
.main_contain{
  widows: 100%;
    margin: 2% 0 55px;
}
.big_type{
  width: 100%;
  margin: 0 auto;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.big_type_border{
  width: 25%;
}
.big_type_cir{
  margin: 5% auto;
    background-image: url("../assets/3.jpg");
	background-repeat:no-repeat;
	background-size:100% 100%;
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    border: 1px solid #faad00;
}
.big_type_name{
  width:100%;
    color: #A80000;
}
}
@media (min-width: 375px) {
  .main_contain{
    font-size: 120%;
  }
  .big_type_cir{
    width: 60px;
    height: 60px;
    line-height: 60px;
  }
}
@media (min-width: 768px) {
   
.big_type_cir{
    width: 100px;
    height: 100px;
    font-size: 150%;
    line-height: 100px;
}
     .header {
    height: 55px;
    background-color: #a80000;
    position: relative;
  }
  
  .router_left {
    font-size: 180%;
    line-height: 60px;
  }
  .search {
    height: 100%;
    position: relative;
    line-height: 60px;
    top: -60px;
    width: 80%;
  }
  .search input{
      font-size: 150%;
  }
  .header_img {
    width: 3rem;
    height: 3rem;
  }
  .news h1{
      margin-top: 5%;
      margin-left: 3%;
      color: #faad00;
      font-size: 140%;
    }
    .main_contain{
    font-size: 180%;
    
    margin: 5% 0 75px;
  }
  
  .news_articles_img{
      width: 5rem;
      height: 5rem;
    }
}

@media (min-width: 1000px) {
    .big_type_cir{
    width: 120px;
    height: 120px;
    font-size: 180%;
    line-height: 120px;
}
    .main_contain{
    font-size: 200%;
  }
}
</style>