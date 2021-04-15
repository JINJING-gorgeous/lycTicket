<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>


@media (min-width: 320px) {
  
.mint-searchbar{
    background-color: transparent !important;
    top: -3px !important;
    padding: 0px 0px !important;
}
.mint-searchbar-inner{
  height: 20px !important;
}
.mint-searchbar-cancel{
  color: #faad00 !important;
}
  .mint-header {
    background-color: #a80000 !important;
    color: #faad00 !important;
    border: 1px solid #faad00;
  }
  .mint-cell-wrapper{
  background-image: none !important;
  }
  #app{
  height: 100%;
}
.mint-field-other{
  top: 5%;
  left: 15%;
}
  .mint-field-other span{
    font-size: 14px !important;
  }
  .picker-items{
     position: relative;
     top:-65px;
     left: 20px;
     height: 100px;
  }
  .forgetPwd{
     font-size: 12px !important;
  }
  .mint-tabbar{
    background-color: #a80000 !important;
    color: #faad00 ;
  }
 .mint-tabbar>.mint-tab-item.is-selected{
    background-color: #a80000 !important;
    color: #fff !important;
  }
  
  .mint-field .mint-cell-title{
    width: 25% !important;
  }
} 
@media (min-width: 375px) {
 
} 
@media (min-width: 768px) {
  
.mint-field-other{
  top: 5%;
  left: 0%;
}
  .mint-field-other span{
    font-size: 22px !important;
  }
  .header{
    height: 55px !important;
  }
 .mint-header{
    font-size: 26px !important;
    height: 55px !important;
  }
  .mint-tabbar{
    height: 75px !important;
  }
  .mint-tab-item-label{
    font-size: 26px !important;
  }
  .mint-tab-item-icon{
    width: 30px !important;
    height: 30px !important;
  }
 .forgetPwd{
     font-size: 18px !important;
  }
  .mint-cell-wrapper{
  font-size: 24px !important;
  }
  .mintui{
    font-size: 26px !important;
  }
  
  .mint-field .mint-cell-title{
    width: 20% !important;
  }
    .picker-slot{
    font-size: 34px !important;
    }
    .picker-items{
     position: relative;
     top:-72px;
     left: 20px;
     height: 110px;
  }
} 

@media (min-width: 1000px) {
  .header{
    height: 65px !important;
  }
  .mint-header{
    font-size: 30px !important;
    height: 65px !important;
  }
  .mint-cell-wrapper{
  font-size: 30px !important;
  }
  .mint-field .mint-cell-title{
    width: 170px !important;
  }
  .mint-field-other span{
    font-size: 28px !important;
  }
 .forgetPwd{
     font-size: 22px !important;
  }
  
  .mintui{
    font-size: 32px !important;
  }
} 
</style>


