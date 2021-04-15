<template>
  <div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="shouye">
        <img
          v-if="selected == 'shouye'"
          slot="icon"
          src="../assets/1.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/2.png" alt="" />
        首页
      </mt-tab-item>
      <mt-tab-item id="dingpiao">
        <img
          v-if="selected == 'dingpiao'"
          slot="icon"
          src="../assets/1.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/2.png" alt="" />
        订票</mt-tab-item
      >
      <mt-tab-item id="me">
        <img
          v-if="selected == 'me'"
          slot="icon"
          src="../assets/1.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/2.png" alt="" />
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
    };
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