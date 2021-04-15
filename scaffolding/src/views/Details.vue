<template>
  <div>
    <mt-header title="详情页面" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
    </mt-header>
    <div class="main_contain">
<div class="main_content">
    <div class="main_content_top">
        <div class="main_content_border">
        <div class="content_top_left">
            <img class="top_left_img" src="../assets/1.jpg">
        </div>
        <div class="content_top_right">
            <div class="content_title">
                <div class="article_title">{{this.singleArticle.title}}</div>
                <div class="article_type">
                    <span v-if="this.singleArticle.vip_id=='1'">vip</span>
                    <span v-else>lyc</span>
                </div>
            </div>
            <div class="content_desc">{{this.singleArticle.ar_description}}</div>
            <div class="content_majorRoles">主要角色：{{this.singleArticle.majorRoles}}</div>
        </div>
        </div>
    </div>
    <div class="main_content_bottom">
        
        <div class="bottom_content">
{{this.singleArticle.content}}
        </div>
    </div>
</div>


    </div>
    <div class="footer">
        <div class="footer_content">
        <div class="footer_left">
            <div class="left_input">
            <input type="text" class="coment_input" placeholder="请输入评论内容">
            </div>
        </div>
        <div class="footer_right">
            <div><img class="footer_right_icon" src="../assets/common/thumb_up0.png" @click="addThumbUp"></div>
            <div><img class="footer_right_icon" src="../assets/common/thumb_down0.png" @click="addThumbDown"></div>
            <div><img class="footer_right_icon" src="../assets/common/collection0.png" @click="addCollection"></div>
        </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      singleArticle: []
    };
  },
  mounted() {
      
    //获取请求参数id   /article?id=1111
    let atid = this.$route.query.atid;
    console.log(atid);
    //通过atid发送请求获取详情数据

    this.axios.post("/articlesByAtid", `atid=${atid}`).then((res) => {
      console.log(res);

      this.singleArticle = res.data.results;
      console.log(this.singleArticle)
    });
  },
  methods: {
      addThumbUp(){
          this.axios.post("/articlesByAtid", `atid=${this.singleArticle.atid}&orid=${this.$store.state.userInfo.orid}`).then((res) => {
      console.log(res);

    });
      },
      addThumbDown(){
          this.axios.post("/addThumbDown", `atid=${this.singleArticle.atid}`).then((res) => {
      console.log(res);

    });
      },
      addCollection(){
          this.axios.post("/addCollection", `atid=${this.singleArticle.atid}&orid=${this.$store.state.userInfo.orid}`).then((res) => {
      console.log(res);

    });
      },
  },
};
</script>
<style scoped>
@media (min-width: 320px) {
.main_contain{
    margin-top: 10%;
    font-size: 100%;
    position: absolute;
    top: 0%;
    left: 0;
    right: 0;
    bottom: 8%;
    padding: 5% 2% 15%;
}
.main_content{
    height: 100%;
}
.main_content_top{
    width: 100%;
}
    .main_content_bottom{
    width: 96%;
    margin: 0 auto;
    }
.main_content_border{
    padding: 2% 0;
    display: flex;
    justify-content: space-around;
}
.content_title{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.article_title{
    width: 80%;
    font-size: 150%;
}
.content_top_left{
    width: 35%;
    position: relative;
}
.top_left_img{
    width: 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.content_top_right{
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.article_type{
    width: 20%;
    margin-top: 2%;
    
}
.article_type span{
    
    border: 2px solid #A80000;
    color: #A80000;
    padding: 0 10px;
    border-radius: 10px;
}
.content_title{
    height: 30%;
    width: 90%;
}
.content_desc{
    height: 30%;
    margin: 5% 0;
    }
.content_majorRoles{
    height: 30%;
    font-size: 90%;
    }
    .footer{
        border: 1px solid orange;
        position: fixed;
        width: 100%; 
        bottom: 0;
        height: 55px;
        line-height: 53px;
        background-color: #A80000;
    }
    .footer_content{
        padding: 0 2%;
        display: flex;
        justify-content: space-around;
    }
    .footer_left{
        width: 60%;
    }
    .footer_right{
        width: 30%;
        display: flex;
        justify-content: space-around;
    }
    .footer_right_icon{
        width: 1.5rem;
    }
    .coment_input{
        border: 1px solid #faa00a;
        border-radius: 10px;
        padding-left: 5%;
    }
}
@media (min-width: 768px) {

}
</style>