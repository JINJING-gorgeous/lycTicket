<template>
  <div>
    <mt-header title="找回密码" fixed>
        <router-link to="/login" slot="left">
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
          label="联系方式"
          placeholder="请输入联系方式"
          type="tel"
          v-model="utel"
          :state="utelState"
        ></mt-field>
      <mt-field
        label="新密码"
        placeholder="请输入新密码"
        v-model="newmpwd"
        :state="newpwdState"
      ></mt-field>
      <mt-field
        label="再次输入"
        placeholder="请再次输入新密码"
        v-model="confirmnewmpwd"
        :state="confirmnewpwdState"
      ></mt-field>
      <div class="main_bottom"><mt-button size="normal" @click="checkForm">提交</mt-button></div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      usernameState: "",
      newmpwd:"",
      newpwdState:"",
      confirmnewmpwd:"",
      confirmnewpwdState:"",
      utel:"",
      utelState:"",
    };
  },
  methods: {
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
    
    //验证联系方式
    checkUtel() {
      let exp = /^[1][3,4,5,7,8][0-9]{9}$/;
      console.log(this.utel)
      if (exp.test(this.utel)) {
        //验证成功
        this.utelState = "success";
        console.log(this.utelState)
        return true;
      } else {
        //验证失败
        this.utelState = "error";
        console.log(this.utelState)
        return false;
      }
    },
    //验证密码
    checkPwd() {
      //汉字 英文字母 数字 下划线组成，3-20位
      let exp = /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,20}$/;
      if (exp.test(this.newmpwd)) {
        //验证成功
        this.newpwdState = "success";
        return true;
      } else {
        //验证失败
        this.newpwdState = "error";
        return false;
      }
    },
    //验证再次输入密码
    checkConfirmpwd() {
      if (this.newmpwd==this.confirmnewmpwd && this.confirmnewmpwd!='') {
        //验证成功
        this.confirmnewpwdState='success';
        return true;
      } else {
        //验证失败
        this.confirmnewpwdState='error'
        return false;
      }
    },
    checkForm() {
      if (this.checkUsername() && this.checkUtel() && this.checkPwd() && this.checkConfirmpwd()) {
        //执行注册业务
        //`uname:=${this.username}&upassword:=${this.pwd}`
        //uname:=${this.username}&upassword:=${this.newmpwd}&phone:=${this.utel}

        //uname=${this.username}&upassword=${this.pwd}&email=${this.uemail}&phone=${this.uemail}&provice=${this.myAddressPrivince}&city=${this.myAddressCity}
        //uname=${this.username}&upassword=${this.newmpwd}&phone=${this.utel}
        this.axios
          .post("/revisepwd", `uname=${this.username}&upassword=${this.newmpwd}&phone=${this.utel}`)
          .then((res) => {
            console.log(res);
            //判断res.data.code是否200
            if (res.data.code == 200) {
              //修改vuex中的状态信息
              //成功，给出提示
              this.$toast({
                message: "修改成功", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
              
            }else if(res.data.code == 201){
              this.$toast({
                message: "该用户不存在", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
            } 
            else {
              //失败
              this.$toast({
                message: "修改失败", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
            }
          });
      } else {
        console.log("修改失败");
      }
    },
  },
};
</script>
<style scoped>
@media (min-width: 320px) {
   .contain_bottom{
    width: 100%;
    text-align: center;
    margin-top: 7%;
  }
  .contain_bottom button{
    width: 90%;
    margin: 0 auto;
    background-color: #a80000;
    color: #faad00;
    border: 1px solid #faad00;
    border-radius: 0.5rem;
  }
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
    padding:0 5%;
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
  
  .contain_bottom{
    margin-top: 10%;
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