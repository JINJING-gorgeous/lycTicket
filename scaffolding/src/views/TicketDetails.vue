<template>
  <div>
    <mt-header title="lyc演出详情" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
    </mt-header>
    <div class="main_contain">
        <div class="main_content_top">
          <div class="part1">
            <div class="part1_left">
              <img class="part1_left_image" src="../assets/1.jpg" />
            </div>
            <div class="part1_right">
              <div class="part1_right_top">{{this.singleTicket.title}}</div>
              <div class="part1_right_bottom">{{this.singleTicket.tk_price}}元</div>
            </div>
          </div>
          <div class="part2">
            <div class="part2_left">
              <div class="part2_time">{{moment
                    .unix(this.singleTicket.start_time)
                    .format("YYYY年MM月DD日")}}</div>
              <div>{{this.singleTicket.position}}</div>
            </div>
            <div class="part2_right">
              <img class="part2_img" src="../assets/common/location.png" />
            </div>
          </div>
          <div class="part3">
            <div class="part3_content">
              <div>
                <img
                  class="part3_img"
                  src="../assets/common/guanfang.png"
                />
                <span>官方票</span>
              </div>
              <div>
                <img
                  class="part3_img"
                  src="../assets/common/xianchang.png"
                /><span>现场取票</span>
              </div>
            </div>
          </div>
          <div class="part4">
            <div class="part4_content">
              <div class="part4_button">
                  <img class="part4_img" v-if="lay_type" src="../assets/common/heart.png" @click="chargeImg"/>
                  <img class="part4_img" v-else src="../assets/common/red_heart.png" @click="chargeImg"/>
                <span>想看</span>
              </div>
              <div class="part4_button">
                  <img class="part4_img" src="../assets/common/share.png" />
                <span>分享</span>
              </div>
            </div>
          </div>
        </div>
        <div class="main_content_bottom">
            <h1>演出详情</h1>
            <div class="bottom_content">
                <span>演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情演出详情</span></div>
        </div>
        
      </div>
    <div class="footer">
            <div class="footer_content">
                <div>
        <!-- <router-link :to="`/details?atid=${item.atid}`"> -->
                    <router-link :to="`/orderTicket?tkid=${this.singleTicket.tkid}&title=${this.singleTicket.title}`">
                    <span>立即购票</span>
                    </router-link>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      singleTicket: [],
      lay_type:1
    };
  },
  mounted() {
    //获取请求参数id   /article?id=1111
    let tkid = this.$route.query.tkid;
    console.log(tkid);

    //通过tkid发送请求获取详情数据
    this.axios.post("/ticketsByTkid", `tkid=${tkid}`).then((res) => {
      console.log(res);

      this.singleTicket = res.data.results[0];
      console.log(this.singleTicket)
    });
  },
  methods: {
      chargeImg(){
          console.log(this.lay_type)
if(this.lay_type==0){
    this.lay_type=1
}else{
    this.lay_type=0
}
      }
  },
};
</script>
<style scoped>
@media (min-width: 320px) {
  .main_contain {
    margin: 40px 0 100px;
  }
  .footer_right_icon {
    width: 2rem;
  }
  .top_left_img {
    width: 2rem;
  }
  .part1_left {
    margin-right: 2%;
  }
  .part1_left_image {
    width: 6rem;
  }
  .part2 {
    display: flex;
    justify-content: space-between;
    background-color: #2d2b41;
    border: 1px solid #2d2b41;
    border-radius: 10px;
    margin-bottom: 5%;
    padding-right: 2%;
  }
  .part2_left{
      margin: 3%;
  }
  .part2_right{
      display: flex;
      align-items: center;
  }
  .part2_time{
      margin-bottom: 5%;
  }
  .part2_img {
    width: 2rem;
  }
  .part3{
      color: #d9a46f;
      margin-bottom: 5%;
      width: 45%;
      padding-left: 5%;
  }
  .part3_img {
    width: 1rem;
    height: 1rem;
  }
  .main_content_top {
    padding: 5%;
    color: #fff;
    background-image: linear-gradient(to right, #383170, #585579, #383170,#585579);
  }
  .part1 {
    display: flex;
    margin-bottom: 5%;
  }
  .part1_right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .part1_right_top {
    font-weight: bolder;
  }
  .part3_content {
    display: flex;
    justify-content: space-between;
  }
  .part3 span{
      font-size: 60%;
  }
  .part4_content {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .part4_button {
    border: 1px solid red;
    width: 40%;
    display: flex;
    justify-content: center;
    background-color: #585579;
    border: 1px solid #585579;
    border-radius: 5px;
    padding: 2% 4%;
  }
  .part4_img {
    width: 1rem;
    height: 1rem;
  }
  .part4_icon{
      width: 1rem;
      margin-right: 2%;
  }
  .part4_button span{
      margin-left: 3%;
  }
  .main_content_bottom{
      padding: 5% 5% 0% 5%;
  }
  .bottom_content{
      padding: 5% 2%;
      text-indent:2em
  }
  .main_content_bottom h1{
      font-size: 120%;
      font-weight: bolder;
  }
  .bottom_content span{
      word-wrap:break-word;
      line-height: 150%
  }
  .footer{    
      right: 0;
    bottom: 1%;
    left: 0;
    position: fixed;
      width: 100%;
      height: 50px;
  }
  .footer_content{
      font-size: 150%;
      height: 100%;
      border-radius: 50px;
      line-height: 50px;
      width: 80%;
      margin:0 auto;
      background-color: #A80000;
      text-align: center;
  }
  .footer_content a{
      color: #fff;
  }
}
@media (min-width: 768px) {
    .main_contain{
    margin: 55px 0 100px;
    font-size: 180%;
    }
    
  .part1_left_image {
    width: 12rem;
  }
  .part3{
      font-size: 140%;
  }
  
  .part3_img {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .part4_img {
    width: 2rem;
    height: 2rem;
  }
  .part2_img{
      width: 3rem;
  }
  .footer{
      font-size: 140%;
      height: 65px;
  }
  .footer_content{
      line-height: 65px;
  }
}
</style>
