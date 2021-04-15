<template>
  <div>
    <mt-header title="联系我们" fixed>
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="main_contain">
        <div class="main_content">
      <h1>地址:河南省郑州市金水区xx号</h1>
      <h1>联系方式:0371-123456</h1>
      <h1>电子邮箱:lyc@qq.com</h1>
      <h1>邮编:450000</h1>
        </div>
    </div>
  </div>
</template>
<style scoped>
@media (min-width: 320px) {
.main_contain {
  font-size: 130%;
  color: #A80000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.main_content{
    position: absolute;
    width: 90%;
    height: 40%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.main_content h1{
  padding: 5% 0;
}
}
@media (min-width: 768px) {

.main_contain {
  font-size: 200%;
  }
}
</style>