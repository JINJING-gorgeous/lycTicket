<template>
  <div>
    <mt-header title="注册" fixed>
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <div slot="left"></div>
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
        <mt-field
          label="确认密码"
          placeholder="请输入确认密码"
          type="password"
          v-model="confirmpwd"
          :state="confirmpwdState"
        ></mt-field>
        <mt-field
          label="电子邮箱"
          placeholder="请输入电子邮箱"
          type="email"
          v-model="uemail"
          :state="uemailState"
        ></mt-field>
        <mt-field
          label="联系方式"
          placeholder="请输入联系方式"
          type="tel"
          v-model="utel"
          :state="utelState"
        ></mt-field>
              <mt-picker class="district_picker"
                :slots="myAddressSlots"
                @change="onAddressChange"
              ></mt-picker>
       
         
        <div class="contain_bottom">
        <mt-button type="primary" @click="checkForm"> 注册</mt-button>
      </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import { city, privinceList, cityList } from "../../public/js/test1";
//引入省市区数据,数据内容在上一条博客中
export default {
  name: "LocationPicker",
  data() {
    return {
      username: "",
      usernameState: "",
      pwd: "",
      pwdState: "",
      confirmpwd: "",
      confirmpwdState: "",
      uemail: "",
      uemailState: "",
      utel: "",
      utelState: "",

      myprivinceList: [], //省的数组
      mycityList: [], //省对应城市的数组
      areapicker: "",
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 0,
          values: privinceList, //省份数组
          className: "slot1",
          textAlign: "center",
        },
        {
          pider: true,
          content: "-",
          className: "slot2",
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: cityList,
          className: "slot3",
          textAlign: "center",
        },
        {
          pider: true,
          content: "-",
          className: "slot4",
        },
      ],
      myAddressPrivince: "", //最后选中的省或直辖市
      myAddressCity: "", //最后选中的城市
      myAddressDistrict: "", //最后选中的区或者县
    };
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
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

    //验证确认密码
    checkConfirmpwd() {
      if (this.pwd == this.confirmpwd && this.confirmpwd != "") {
        //验证成功
        this.confirmpwdState = "success";
        return true;
      } else {
        //验证失败
        this.confirmpwdState = "error";
        return false;
      }
    },

    //验证电子邮箱
    checkUemail() {
      let exp = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (exp.test(this.uemail)) {
        //验证成功
        this.uemailState = "success";
        return true;
      } else {
        //验证失败
        this.uemailState = "error";
        return false;
      }
    },

    //验证联系方式
    checkUtel() {
      let exp = /^[1][3,4,5,7,8][0-9]{9}$/;
      console.log(this.utel);
      if (exp.test(this.utel)) {
        //验证成功
        this.utelState = "success";
        console.log(this.utelState);
        return true;
      } else {
        //验证失败
        this.utelState = "error";
        console.log(this.utelState);
        return false;
      }
    },
    checkForm() {
      if (
        this.checkUsername() &&
        this.checkPwd() &&
        this.checkConfirmpwd() &&
        this.checkUemail() &&
        this.checkUtel()
      ) {
        console.log(this.myAddressPrivince);
        console.log(this.myAddressCity);
        console.log(this.utelState);
        //执行注册业务
        this.axios
          .post(
            "/register",
            `uname=${this.username}&upassword=${this.pwd}&email=${this.uemail}&phone=${this.utel}&provice=${this.myAddressPrivince}&city=${this.myAddressCity}`
          )
          .then((res) => {
            console.log(res);
            //判断res.data.code是否200
            if (res.data.code == 200) {
              //修改vuex中的状态信息
              //成功，给出提示
              this.$toast({
                message: "注册成功", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
            } else if (res.data.code == 201) {
              this.$toast({
                message: "用戶名已存在", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
            } 
            else {
              //失败
              this.$toast({
                message: "注册失败", //弹出的消息内容
                position: "bottom", //弹出toast的位置
                duration: 3000, //toast存在的时长
              });
            }
          });
      } else {
        console.log("登录失败");
      }
    },
    onAddressChange: function (picker, values) {
      this.areapicker = picker;
      this.mycityList = [];
      this.mydistrictList = [];
      var chooseList = city.filter(function (item) {
        return item.name == values[0];
      });
      if (chooseList[0].sub) {
        for (var item of chooseList[0].sub) {
          this.mycityList.push(item.name);
        }
        //获取非直辖市数据
        if (chooseList[0].sub.length > 1) {
          var choosedisList = [];
          if (this.mycityList.indexOf(values[2]) > -1 && values[2] != "其他") {
            choosedisList = chooseList[0].sub.filter(function (item) {
              return item.name == values[2];
            });
            for (var item of choosedisList[0].sub) {
              this.mydistrictList.push(item.name);
            }
          } else {
            this.mydistrictList = [];
          }
        }
        //获取直辖市数据
        else {
          for (var item of chooseList[0].sub[0].sub) {
            this.mydistrictList.push(item.name);
          }
        }
      }
      this.myAddressPrivince = values[0];
      this.myAddressCity = values[2];
      this.myAddressDistrict = values[4];
      console.log("选中的市区是" + this.myAddressCity);
    },
  },
  watch: {
    myAddressPrivince(oldval, newval) {
      //省数据变化后，更新市的显示数据
      this.areapicker.setSlotValues(2, this.mycityList);
      this.areapicker.setSlotValue(2, this.mycityList[0]);
      console.log("选中的省是" + this.myAddressPrivince);
      console.log("选中的市区是" + this.myAddressCity);
    },
  },
  mounted() {
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
    });
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
  .district_picker{
    width: 100%;
    height: 40px;
    margin: 3% auto;
  }
  .main_contain {
    margin-top: 25%;
  }
  .main_top h1 {
    font-size: 30px;
    color: #a80000;
    margin-bottom: 8%;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 20px;
    text-indent: 20px;
  }
  .mint-cell {
    margin-top: 3%;
    padding: 0 5%;
    color: #a80000;
    font-weight: bolder;
  }
  .forgetPwd {
    float: right;
    padding-right: 7%;
    font-size: 14px !important;
  }
  .forgetPwd a {
    color: #ccc;
  }
}
@media (min-width: 375px) {
  .main_contain {
    margin-top: 25%;
  }
  .main_top h1 {
    margin-bottom: 20%;
  }

  .main_top h1 {
    margin-bottom: 8%;
  }
  .mint-cell {
    margin-top: 5%;
  }
  .contain_bottom{
    margin-top: 10%;
  }
}
@media (min-width: 768px) {
  .main_contain {
    margin-top: 22%;
  }
  .main_top h1 {
    font-size: 40px;
    margin-bottom: 12%;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 45px;
    text-indent: 45px;
  }
  .forgetPwd {
    padding-right: 6%;
  }

  .mint-button {
    height: 55px;
    font-size: 26px;
  }
  
  .district_picker{
    width: 100%;
    height: 40px;
    margin: 7% auto;
  }
}
</style>