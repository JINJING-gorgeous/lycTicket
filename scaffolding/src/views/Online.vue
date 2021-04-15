<template>
  <div>
    <mt-header title="在线客服" fixed>
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="main_contain">
        <div class="main_content">
      <h1>努力开发中。。。</h1>
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