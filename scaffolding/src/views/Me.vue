<template>
  <div>
    <mt-header title="个人中心" fixed>
      <router-link to="/login" slot="right" v-if="$store.state.isLogin == '1'">
        <mt-button @click="userQuit">退出</mt-button>
      </router-link>
      <router-link to="/login" slot="right" v-else>
        <mt-button>登录</mt-button>
      </router-link>
    </mt-header>
    <div class="main_content">
      <div class="me_top">
        <div class="top_user">
          <div class="top_user_left">
            <img style="
    width: 4rem;
    height: 4rem;
    border: 2px solid #d68b0a;
    border-radius: 50%;" class="user_img" :src="this.$store.state.userInfo.avatar"  v-if="this.$store.state.isLogin == '1'"/>
          </div>
          <div class="top_user_right">
            <div class="user_right_name">
              <span class="user_name" v-if="this.$store.state.isLogin == '1'">
                {{ $store.state.userInfo.uname }}</span
              >
              <span
                class="user_type"
                v-if="this.$store.state.userInfo.vip_id == '1'"
                >vip用户</span
              >
            </div>
            <div class="user_right_vip">
              <div class="vip_time">
                <span v-if="this.$store.state.userInfo.vip_id == '1'">{{
                  moment
                    .unix(this.vipEndTime)
                    .format("YYYY年MM月DD日")
                }}</span>
                <span v-if="this.$store.state.userInfo.vip_id == '1'"
                  >到期</span
                >
              </div>
              <div class="xufei" @click="chongzhi">
                <span style="
    border: 1px solid #a80000;
    border-radius: 10px;
    padding: 2px;" v-if="this.$store.state.userInfo.vip_id == '1'"
                  >续费</span
                >
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="me_bot">
        <div class="me_bottom">
          <div class="three_top">
            <div class="collect three_top_bor">
              <div v-if="this.$store.state.isLogin == '1'">{{this.collectionCount}}</div>
              <div v-else>0</div>
              <div>收藏</div>
            </div>
            <div class="nice three_top_bor">
              <div  v-if="this.$store.state.isLogin == '1'">{{this.thumbsCount}}</div>
              <div v-else>0</div>
              <div>点赞</div>
            </div>
            <div class="vip_center three_top_bor">
              <div>VIP</div>
              <div>会员</div>
            </div>
          </div>
        </div>
        <div class="me_bot_or">
          <h1>我的订购</h1>
          <div class="order_tic">
            <div>
              <div>
                <img class="order_logo" src="../assets/common/movie.png" />
              </div>
              <div>电影票</div>
            </div>
            <div>
              <div>
                <img class="order_logo" src="../assets/common/tick.png" />
              </div>
              <div>演出票</div>
            </div>
            <div>
              <div>
                <img class="order_logo" src="../assets/common/linewatch.png" />
              </div>
              <div>在线观影</div>
            </div>
            <div>
              <div>
                <img class="order_logo" src="../assets/common/package.png" />
              </div>
              <div>周边</div>
            </div>
          </div>
        </div>
      </div>
      <div class="me_others">
        <div class="me_others_title">
          <h1>其他</h1>
        </div>
        <div class="me_others_content">
          <div class="me_others_flex">
            <div class="me_it">
              <div>
                <img class="me_others_icon" src="../assets/common/kefuy.png" />
              </div><router-link to="/online">
              <div class="me_others_text">在线客服</div></router-link>
            </div>
            <div class="me_arrow">></div>
          </div>
          <div class="me_others_flex">
            <div class="me_it">
              <div>
                <img
                  class="me_others_icon"
                  src="../assets/common/messagey.png"
                />
              </div><router-link to="/messback">
              <div class="me_others_text">意见反馈</div>
              </router-link>
            </div>
            <div class="me_arrow">></div>
          </div>
          <div class="me_others_flex">
            <div class="me_it">
              <div>
                <img class="me_others_icon" src="../assets/common/emaily.png" />
              </div>
              <router-link to="/call"><div class="me_others_text">联系我们</div></router-link>
              
            </div>
            <div class="me_arrow">></div>
          </div>
          <div class="me_others_flex">
            <div class="me_it">
              <div>
                <img class="me_others_icon" src="../assets/common/adminy.png" />
              </div>
              <div class="me_others_text" @click="cancelUser">账号注销</div>
            </div>
            <div class="me_arrow">></div>
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
import { MessageBox } from "mint-ui";
import moment, { now } from 'moment'

export default {
  data() {
    return {
      selected: "me",
      collectionCount: [],
      thumbsCount:[],
      userInfos:[],
      vipEndTime:''
    };
  },
  watch: {
    //监听器
    selected(newvalue) {
      //newvalue是selected的新值
      if (newvalue == "shouye") {
        this.$router.push("/index");
      } else if (newvalue == "me") {
        this.$router.push("/me");
      }else if (newvalue == "dingpiao") {
        this.$router.push("/order");
      }
    },
  },
  beforeCreate() {
    this.$store.state.isLogin = sessionStorage.getItem("isLogin");
  },
  mounted() {
this.getEndTime();



this.axios.post("/collectionCount", `orid=${ this.$store.state.userInfo.orid}`).then((res) => {
        console.log(res);
        this.collectionCount = res.data.results;
        console.log(this.collectionCount)
        
      });
this.axios.post("/thumbsCount", `orid=${ this.$store.state.userInfo.orid}`).then((res) => {
        console.log(res);
        this.thumbsCount = res.data.results;
        console.log(this.thumbsCount)
        
      });

    this.$store.state.userInfo.avatar = require(`../assets/${this.$store.state.userInfo.avatar}`);
  },
  methods: {
    //拿到到期时间
    getEndTime(){
//拿到到期时间
//getUserInfos
this.axios.post("/getUserInfos", `orid=${ this.$store.state.userInfo.orid}`).then((res) => {
        console.log(res);
        this.userInfos = res.data.results;
        console.log(this.userInfos)
        console.log(this.userInfos[0].end_time)
        let endTime=this.userInfos[0].end_time;
        console.log(endTime)
        if(endTime)
        this.vipEndTime=endTime
        else
        this.vipEndTime='';
        console.log(this.vipEndTime)
      });
    },
    chongzhi(){
      MessageBox.prompt('请输入充值码').then(({ value, action }) => {
  console.log(value)
  this.axios.post("/findCZM", `czcode=${value}`).then((res) => {
        console.log(res);
        var aData = new Date();
        let nowDate=Date.parse(aData) / 1000;
        console.log(nowDate)
this.axios.post("/chongzhiVIP", `orid=${ this.$store.state.userInfo.orid}&start_time=${nowDate}`).then((res) => {
  if (res.data.code == 200) {
          this.getEndTime();
              this.$toast({
                message: "充值成功", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
        }

});

      
      });
});
    },
    userQuit() {
      window.sessionStorage.setItem("isLogin", 0);
      this.$store.state.userInfo.vip_id = 0;
      this.$router.push("/login");
    },
    cancelUser() {
      MessageBox.confirm("确定执行此操作?").then((action) => {
        console.log(this.$store.state.userInfo.uname);
        //执行注销业务
        this.axios
          .post("/deleteUser", `uname=${this.$store.state.userInfo.uname}`)
          .then((res) => {
            console.log(res);
            //判断res.data.code是否200
            if (res.data.code == 200) {
              //修改vuex中的状态信息

              //成功，给出提示
              this.$router.push("/register");
            } else {
              //失败
              this.$toast({
                message: "服务器错误错误", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
            }
          });
      });
    },
  },
};
</script>
<style scoped>
@media (min-width: 320px) {
  .main_content {
    font-size: 100%;
    width: 100%;
  }
  .me_top {
    width: 100%;
    background-color: rgb(250, 160, 10, 0.8);
    color: #a80000;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 15%;
    padding-bottom: 10%;
  }
  .top_user {
    width: 90%;
    margin: 0 auto;
    display: flex;
  }
  .top_user_left {
    margin: 3%;
    width: 30%;
  }
  .top_user_right {
    margin: 5% 0%;
    width: 100%;
  }
  .user_right_name {
    margin-bottom: 7%;
  }
  .user_name {
    font-size: 160%;
    margin-right: 5%;
  }
  .user_type {
    font-size: 50%;
    border: 1px solid #a80000;
    border-radius: 10px;
    padding: 2px;
  }
  .user_right_vip {
    font-size: 30%;
    display: flex;
    justify-content: space-between;
  }
  .vip_time {
    margin: 3px 0;
  }
  .me_bot {
    position: relative;
    top: -30px;
  }
  .me_bottom {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  .three_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: rgb(250, 160, 10, 0.3);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 1px 0px 2px 0px #888888;
  }
  .three_top_bor {
    text-align: center;
    padding: 10px 15px;
  }
  .me_bot_or {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 1px 0px 2px 0px #888888;
    padding: 5% 0;
  }
  .order_tic {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    margin-top: 5%;
    text-align: center;
  }
  .order_logo {
    width: 2rem;
    height: 2rem;
  }
  .me_others {
    width: 90%;
    margin: 0 auto;
    font-size: 100%;
  }
  .me_others_title {
    margin-bottom: 5%;
  }
  .me_others_icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  .me_others_flex {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #faa00a;
    line-height: 120%;
    font-size: 100%;
    border-bottom: 1px solid #ddd;
    line-height: 200%;
    color: #a80000;
  }
  .me_it {
    display: flex;
    width: 80%;
  }
  .me_it a{
    color: #A80000;
    width: 100%;
  }
  .me_arrow {
    color: rgb(116, 110, 110);
  }
  .me_others_text {
    margin-left: 2%;
  }
}
@media (min-width: 375px) {
  .me_bot {
    top: -40px;
  }
  .me_bottom {
    margin: 2% auto 10%;
  }
  .me_others {
    font-size: 110%;
  }
}
@media (min-width: 768px) {
  .top_user {
    width: 90%;
  }
  .user_img {
    width: 8rem;
    height: 8rem;
    border: 2px solid #d68b0a;
  }
  .top_user_left {
    margin: 2%;
    width: 40%;
  }
  .top_user_right {
    margin: 3% 0;
    width: 80%;
    padding-right: 8%;
  }
  .user_name {
    font-size: 280%;
  }
  .user_type {
    font-size: 120%;
  }
  .user_right_vip {
    font-size: 150%;
  }
  .me_bot {
    position: relative;
    top: -60px;
    font-size: 160%;
  }
  .me_bottom {
    width: 80%;
  }
  .me_bot_or {
    padding: 3% 0;
    width: 80%;
    font-size: 100%;
  }
  .order_tic {
    font-size: 120%;
  }
  .order_logo {
    width: 3.5rem;
    height: 3.5rem;
  }
  .me_others {
    position: relative;
    top: -30px;
    width: 80%;
    margin: 0 auto;
  }
  .me_others_title {
    margin-bottom: 3%;
    font-size: 160%;
  }
  .me_others_icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  .me_others_flex {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #faa00a;

    line-height: 100%;
    font-size: 180%;
    border-bottom: 1px solid #ddd;
    line-height: 200%;
    color: #a80000;
  }
  .me_it {
    display: flex;
    width: 30%;
  }
  .me_arrow {
    color: rgb(116, 110, 110);
  }
  .me_others_text {
    margin-left: 2%;
  }
}
@media (min-width: 1000px) {
  .top_user {
    width: 85%;
  }
  .me_top {
    padding-bottom: 5%;
  }
  .me_bot {
    top: -60px;
    font-size: 220%;
  }
  .me_others {
    font-size: 130%;
  }

  .user_img {
    width: 10rem;
    height: 10rem;
    border: 2px solid #d68b0a;
  }
}
</style>