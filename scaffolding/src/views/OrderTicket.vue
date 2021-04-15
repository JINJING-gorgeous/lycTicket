<template>
  <div>
    <div class="header">
      <div class="header_container">
        <div class="header_content">
          <router-link to="" class="router_left">
            <div  @click="$router.back(-1)">
              <img class="header_img" src="../assets/common/toLeft.png" />
            </div>
          </router-link>

          <div class="header_title">
            <span>{{ this.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main_contain">
      <div class="main_content">
        <div class="part1">
          <div class="part1_content">{{moment
                    .unix(this.singleTicket.start_time)
                    .format("YYYY年MM月DD日")}}</div>
        </div>
        <div class="part2">
          <div class="part2_content">{{this.singleTicket.tk_price}}元<br>现场票</div>
          <div class="ticket_count">
            <div class="ticket_count_left">
              <span>份数</span>
            </div>
            <div class="ticket_count_right">
              <div class="cal_count">
                <div class="minus cal" @click="count_minus">-</div>
                <div class="count">{{this.count}}</div>
                <div class="plus cal" @click="count_plus">+</div>
              </div>
            </div>
          </div>
        </div>
        <div class="part3">
          <div class="part3_content">
            <h1>猫眼自营</h1>
            <span>{{this.total}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_content">
        <div class="footer_content_left">
          <div><span class="footer_heji">合计：</span><span class="footer_price">{{this.total}}</span></div>
        </div>
        <div class="footer_content_right">
          <div class="right_button">
            <span>确认选票</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tkid: "",
      title: "",
      singleTicket:[],
      count:"1",
      total:""
    };
  },
  mounted() {
    //获取请求参数id   /article?id=1111
    let tkid = this.$route.query.tkid;
    this.title = this.$route.query.title;
    console.log(tkid);
    console.log(this.title);
    this.axios.post("/ticketsByTkid", `tkid=${tkid}`).then((res) => {
      console.log(res);

      this.singleTicket = res.data.results[0];
      console.log(this.singleTicket)
      this.total=this.singleTicket.tk_price
    });

  },
  methods: {
      //减法
      count_minus(){
          if(this.count>1)
          {
              this.count--;
          this.total=this.count*this.singleTicket.tk_price;
          }
          else{
              this.$toast({
                message: "不能再减少了哟", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 1000, //toast存在的时长
              });
          }
      },
      //加法
      count_plus(){
          this.count++;
          this.total=this.count*this.singleTicket.tk_price;
      },
  },
};
</script>
<style scoped>
@media (min-width: 320px) {
  .header {
    height: 40px;
    background-color: #a80000;
    position: relative;
  }
  .header_content {
    display: flex;
    line-height: 40px;
  }
  .header_img {
    width: 1.5rem;
  }
  .router_left {
    margin-left: 2%;
  }
  .header_title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #faa00a;
  }
  .main_contain {
    margin: 0 0 55px;
  }
  .footer {
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    background-color: #faa00a;
    height: 55px;
  }
  .part1 {
    background-color: rgb(250, 160, 10, 0.8);
    padding: 3%;
    margin: 3% 0;
  }
  .part1_content {
    width: 35%;
    padding: 2% 5%;
    font-size: 120%;
    border: 1px solid #a80000;
    color: #a80000;
    text-align: center;
  }
  .part2 {
    background-color: rgb(250, 160, 10, 0.8);
    padding: 3%;
    margin-bottom: 3%;
  }
  .part2_content {
    width: 35%;
    padding: 2% 5%;
    font-size: 120%;
    border: 1px solid #a80000;
    color: #a80000;
    text-align: center;
    margin-bottom: 5%;
  }
  .ticket_count {
    border-top: 1px solid #a80000;
    padding-top: 5%;
    font-size: 120%;
    display: flex;
    justify-content: space-between;
  }
  .ticket_count_left {
    display: flex;
    vertical-align: middle;
  }
  .cal_count {
    display: flex;
  }
  .cal {
    width: 1.5rem;
    border: 1px solid #a80000;
    text-align: center;
  }
  .count {
    margin: 0 10%;
  }

  .part3 {
    background-color: rgb(250, 160, 10, 0.8);
    padding: 3%;
    margin: 3% 0;
  }
  .part3_content {
    display: flex;
    justify-content: space-between;
    font-size: 140%;
  }
  .part3_content span {
    color: #a80000;
  }
  .footer_content{
      padding-left: 3%;
      line-height: 55px;
      display: flex;
      justify-content: space-between;
  }
  .footer_content_right{
      background-color: #a80000;
      color: #faa00a;
      font-size: 140%;
      padding:0 4%;
  }.footer_heji{
      font-size: 120%;
  }
  .footer_price{
      color: #a80000;
      font-size: 180%;
  }
}
@media (min-width: 768px) {
  .header_img {
    width: 2rem;
  }
  .header_content {
    line-height: 55px;
  }
  .header_title {
    font-size: 150%;
    left: 50%;
  }
  .ticket_count{
      font-size: 140%;
  }
  .main_contain{
      font-size: 140%;
  }
  .cal{
      width: 2.5rem;
  }
  .footer{
      font-size: 140%;
      height: 75px;
  }
  .footer_content{
      line-height: 75px;
  }
}

@media (min-width: 1000px) {
  .header_content {
    line-height: 65px;
  }
  .header_title {
    font-size: 180%;
  }
  .cal{
      width: 3rem;
  }
}
</style>