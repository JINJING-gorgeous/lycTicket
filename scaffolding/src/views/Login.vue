<template>
  <div>
    <mt-header title="登录" fixed>
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="main_contain">
      <div class="main_top">
        <h1>梨园春</h1>
        <mt-field
          label="用户名"
          placeholder="请输入用户名"
          v-model="username"
          :state="usernameState"
        ></mt-field>
        <mt-field
          label="密码"
          placeholder="请输入密码"
          type="password"
          v-model="pwd"
          :state="pwdState"
        ></mt-field>
        <mt-field label="验证码" v-model="captcha">
          <div
            class="ValidCode disabled-select"
            :style="`width:${width}; height:${height}`"
            @click="refreshCode"
          >
            <span
              v-for="(item, index) in codeList"
              :key="index"
              :style="getStyle(item)"
              >{{ item.code }}</span
            >
          </div>
        </mt-field>
        <h5 class="forgetPwd">
          <router-link to="/findpwd">忘记密码?</router-link>
        </h5>
      </div>
      <div class="main_bottom">
      <mt-button type="primary" @click="checkForm">登录</mt-button>
      <router-link to="/register"
        ><mt-button type="primary"> 去注册</mt-button>
      </router-link>
    </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "validCode",
  props: {
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "40px",
    },
    length: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      username: "",
      usernameState: "",
      pwd: "",
      pwdState: "",
      codeList: [],
      captcha: "",
    };
  },
  beforeCreate() {
    this.$store.state.isLogin = sessionStorage.getItem("isLogin");
  },
  mounted() {
    this.createdCode();
  },
  methods: {
    refreshCode() {
      this.createdCode();
      console.log(this.codeList);
    },
    createdCode() {
      let len = this.length,
        codeList = [],
        chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
        charsLen = chars.length;
      // 生成
      for (let i = 0; i < len; i++) {
        let rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200),
        ];
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${
            Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)
          }deg)`,
        });
      }
      // 指向
      this.codeList = codeList;
      // 将当前数据派发出去
      this.$emit("update:value", codeList.map((item) => item.code).join(""));
    },
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`;
    },
    //验证用户名
    checkUsername() {
      //汉字 英文字母 数字 下划线组成，3-20位
      let exp = /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,20}$/;
      if (exp.test(this.username)) {
        //验证成功
        this.usernameState = "success";
        return true;
      } else {
        //验证失败
        this.usernameState = "error";
        return false;
      }
    },
    //验证密码
    checkPwd() {
      //4到16位（字母，数字，下划线，减号）
      let exp = /^[a-zA-Z0-9_-]{4,16}$/;
      if (exp.test(this.pwd)) {
        //验证成功
        this.pwdState = "success";
        return true;
      } else {
        //验证失败
        this.pwdState = "error";
        return false;
      }
    },
    //验证验证码
    checkYan() {
      let str = "";
      for (let i = 0; i < this.codeList.length; i++) {
        str += this.codeList[i].code;
      }
      console.log(this.codeList);
      console.log(str);
      console.log(this.captcha);
      if (str.toLowerCase() == this.captcha.toLowerCase()) return true;
      else return false;
    },
    checkForm() {
      if (this.checkUsername() && this.checkPwd() && this.checkYan()) {
        //执行注册业务
        this.axios
          .post("/login", `uname=${this.username}&upassword=${this.pwd}`)
          .then((res) => {
            console.log(res);
            //判断res.data.code是否200
            if (res.data.code == 200) {
              //修改vuex中的状态信息
              let userInfo = res.data.result;
              this.$store.commit("loginSuccess", userInfo);

              //把当前登录状态（isLogin,userInfo）存入sessionStorage
              let ss = window.sessionStorage;
              ss.setItem("isLogin", 1); //1代表已登录
              ss.setItem("userInfo", JSON.stringify(userInfo)); //存入用户的完整数据

              
              //成功，给出提示
              this.$router.push("/me");
            } else {
              //失败
              this.$toast({
                message: "登录失败,账号密码错误", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
            }
          });
      } else {
        console.log("登录失败");
      }
    },
  },
};
</script>
<style scoped>
@media (min-width: 320px) {
  .main_contain{
    margin-top: 30%;
  }
  .main_top h1{
    font-size: 30px;
  color: #a80000;
  margin-bottom: 10%;
  font-weight: bolder;
  text-align: center;
  letter-spacing: 20px;
  text-indent: 20px;
  }
  .mint-cell{
    margin-top: 3%;
    padding:0 7%;
    color: #A80000;
    font-weight: bolder;
  }
  .forgetPwd{
    float: right;
    padding-right: 7%;
  }
  .forgetPwd a{
    color: #ccc;
  }
  .main_bottom{
    clear: right;
    display: flex;
    flex-direction:column;
    margin-top: 13%;
    width: 100%;
  }
  .main_bottom button{
    width: 90%;
    margin: 3% auto 0;
    background-color: #a80000;
    color: #faad00;
    border: 1px solid #faad00;
    border-radius: 0.5rem;
  }
  .main_bottom a{
    width: 90%;
    margin: 3% auto 0;
  }
  .main_bottom a button{
    width: 100%;
  }
  
}
@media (min-width: 375px) {
  .main_contain{
    margin-top: 30%;
    }
  .main_top h1{
  margin-bottom: 20%;
  }
  .main_bottom{
    margin-top: 14%;
  }
  
  .mint-cell{
    margin-top: 5%;
  }
}
@media (min-width: 768px) {
  
  .main_contain{
    margin-top: 27%;
  }
  .main_top h1{
    font-size: 40px;
  margin-bottom: 14%;
  font-weight: bolder;
  text-align: center;
  letter-spacing: 45px;
  text-indent: 45px;
  }
  .forgetPwd{
    padding-right: 6%;
  }
  
  .main_bottom{
    margin-top: 13%;
  }
  .main_bottom button{
    font-size: 26px;
  }
  .mint-button{
    height: 50px;
  }
  
}
@media (min-width: 1000px) {
  .main_bottom button{
    font-size: 28px;
  }
  .mint-button{
    height: 60px;
  }
}
</style>