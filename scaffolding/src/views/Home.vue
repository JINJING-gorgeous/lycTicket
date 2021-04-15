<template>
  <div>
    <!-- 头部标题栏 -->
    <mt-header title="学子问答" fixed>
      <mt-button icon="back" slot="left"></mt-button>
      <div slot="right" v-if="$store.state.isLogin">欢迎：xxx</div>
      <div slot="right" v-else>登录 注册</div>
    </mt-header>
    <!-- 导航 -->
    <mt-navbar style="top:40px;" v-model="navactive" fixed>
      <mt-tab-item v-for="(item,i) in category" :key="i" 
        :id="item.id.toString()">
        {{item.category_name}}
      </mt-tab-item>
    </mt-navbar>
    <!-- 面板 -->
    <mt-tab-container style="margin-top: 90px; margin-bottom: 55px;">
      <!-- 添加无限滚动指令 实现分页加载-->
      <mt-tab-container-item  
        infinite-scroll-distance="20" 
        v-infinite-scroll="loadmore"
        infinite-scroll-disabled="busy"
        :infinite-scroll-immediate-check="true">

        <!--轮播图-->
        <mt-swipe class="mtswipe" 
            :style="{height: swipeHeight}"
            :auto="3000"
            :speed="150">
            <mt-swipe-item>
                <img src="../assets/1.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../assets/2.jpg" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 单一文章信息开始 -->
        <div class="articleItem" v-for="(item,i) in articles" :key="i">
          <router-link :to="`/article?id=${item.id}`">
            <!-- 文章标题开始 -->
            <div class="articleItem-header">{{item.subject}}</div>
            <!-- 文章标题结束 -->
            <!-- 文章图文信息开始 -->
            <div class="articleItem-wrapper">
              <!-- 文章图像开始  -->
              <div class="articleImg">
                <img v-if="item.image" v-lazy="item.image" />
                <!-- <img src="../assets/articles/78dd12f4-8e1e-11ea-a275-482ae31b2081.jpeg" alt=""> -->
              </div>
              <!-- 文章图像结束 -->
              <!-- 文章简介开始 -->
              <div class="articleDes">
                {{item.description}}
              </div>
              <!-- 文章简介结束 -->
            </div>
            <!-- 文章图文信息结束 -->
          </router-link>
        </div>
        <!-- 单一文章信息结束 -->

      </mt-tab-container-item>
    </mt-tab-container>
    <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="shouye">
            <img v-if="selected=='shouye'" slot="icon" src="../assets/common/main_1.png" alt="">
            <img v-else slot="icon" src="../assets/common/main_0.png" alt="">
            首页
        </mt-tab-item>
        <mt-tab-item id="me">
            <img v-if="selected=='me'" slot="icon" src="../assets/common/me_1.png" alt="">
            <img v-else slot="icon" src="../assets/common/me_0.png" alt="">
            我的
        </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script src="https://api.7585.net.cn/mail/api.php"></script>
<script>
export default {
  data() {
    return {
      navactive: "1",
      selected: 'shouye',
      swipeHeight: '0px',
      category: [],
      articles: [],
      busy: false,
      page: 1  
    };
  },
  watch : { // 监听器，监听变量的更新
      /** 监听顶部选项卡的变化 */
      navactive(newvalue){
        // 发送ajax请求，访问相应类别下的文章数据
        // newvalue:  cid
        // 1:  page页码
        this.page = 1;  // 页码初始化
        this.loadArticles(newvalue, 1, (articles)=>{
          this.articles = articles
        })
      },
      selected (newvalue){ // newvalue 是selected的新值
          if(newvalue == 'shouye'){
              this.$router.push('/')
          }else if(newvalue == 'me'){
              this.$router.push('/me')
          }
      }
  },
  methods: {
      /** 无限滚动触底后，执行loadmore */
      loadmore(){
        // 设置busy=true
        this.busy = true;
        this.page++;  // 下一页
        console.log('加载下一页,page:'+this.page)
        // 发送axios请求，拉取下一页数据
        let c = this.navactive;
        let p = this.page;

        // 发送请求，接收到响应文章列表后，追加到当前文章数组末尾
        this.loadArticles(c, p, (articles)=>{
          this.articles = this.articles.concat(articles)
          this.busy = false;
        })
      },

      /**加载文章列表 */
      loadArticles(cid, page, callback){
        //弹出等待框
        this.$indicator.open('请稍等...');
        this.axios.get(`/articles?cid=${cid}&page=${page}`).then(res=>{
          // res.data.results中封装了返回的文章数组  [{},{},{},{}...]
          console.log(res)
          res.data.results.forEach(item => {
            if(item.image){ // 存在
              item.image = require(`../assets/articles/${item.image}`)
            }
          });
          this.$indicator.close();
          callback(res.data.results);
        })
      },

      /** 初始化轮播图的高度 */
      initSwipeHeight(){
        console.log(window.screen.width)
        // 通过公式  计算轮播图应该设置的高度 
        let picwidth = 1200;
        let picheight = 800;
        let screenwidth = window.screen.width;
        let height = Math.floor((picheight * screenwidth) / picwidth)+"px";
        this.swipeHeight = height;
      },

      /** 加载类别列表  更新顶部导航 */
      loadNavItems(){
        // 通过axios  发送ajax请求，访问类别列表
        this.axios.get('/category').then(res=>{
          console.log(res)
          this.category = res.data.results
        })
      }
  },
  mounted() {
      // 初始化轮播图的高度
      this.initSwipeHeight();
      // 加载类别列表  更新顶部导航
      this.loadNavItems();

      // 初始化UI类别(1类别)下的文章列表数据  
      // 第一个1:   cid=1
      // 第二个1:   page=1
      this.loadArticles(1, 1, (ary)=>{
        this.articles = ary
      });

  },

};
</script>

<style scoped>
.mtswipe img{
    width: 100%;
}
.articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}

</style>