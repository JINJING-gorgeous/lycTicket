<template>
  <div>
    我的个人信息内容
    <mt-tabbar v-model="selected">
      <mt-tab-item id="shouye">
        <img v-if="selected=='shouye'" slot="icon" src="../assets/common/main_1.png" alt="" />
        <img v-else slot="icon" src="../assets/common/main_0.png" alt="" />
        首页
      </mt-tab-item>
      <mt-tab-item id="gouwuche">
        <img v-if="selected=='gouwuche'" slot="icon" src="../assets/common/cart_1.png" alt="" />
        <img v-else slot="icon" src="../assets/common/cart_0.png" alt="" />
        购物车</mt-tab-item
      >
      <mt-tab-item id="wode">
        <img v-if="selected=='wode'" slot="icon" src="../assets/common/me_1.png" alt="" />
        <img v-else slot="icon" src="../assets/common/me_0.png" alt="" />
        我的</mt-tab-item
      >
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "wode",
    };
  },
  watch: {
    //监听器
    selected(newvalue) {
      //newvalue是selected的新值
      if (newvalue == "shouye") {
        this.$router.push("/tabbar");
      } else if (newvalue == "gouwuche") {
        this.$router.push("/gouwuche");
      } else if (newvalue == "wode") {
        this.$router.push("/wode");
      }
    }
  }
};
</script>