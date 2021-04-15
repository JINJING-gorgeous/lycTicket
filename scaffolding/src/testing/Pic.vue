<template>
  <div class="location_container">
    <mt-picker :slots="myAddressSlots" @change="onAddressChange"></mt-picker>
  </div>
</template>
 
<script>
  import {city, privinceList, cityList} from '../../public/js/test1'  
  //引入省市区数据,数据内容在上一条博客中
    export default {
        name: "LocationPicker",
        data() {
            return {
              myprivinceList: [],    //省的数组
              mycityList: [],        //省对应城市的数组
              areapicker:'',
              myAddressSlots: [
                {
                  flex: 1,
                  defaultIndex: 0,
                  values:privinceList, //省份数组
                  className: 'slot1',
                  textAlign: 'center'
                },
                {
                  pider: true,
                  content: '-',
                  className: 'slot2'
 
                }, {
                  flex: 1,
                  defaultIndex: 0,
                  values: cityList,
                  className: 'slot3',
                  textAlign: 'center'
                },
                {
                  pider: true,
                  content: '-',
                  className: 'slot4'
                }
              ],
              myAddressPrivince:'',  //最后选中的省或直辖市
              myAddressCity:'',      //最后选中的城市
              myAddressDistrict:'',   //最后选中的区或者县
 
            }
        },
      watch:{
        myAddressPrivince(oldval,newval){  //省数据变化后，更新市的显示数据
          this.areapicker.setSlotValues(2,this.mycityList);
          this.areapicker.setSlotValue(2, this.mycityList[0]);
          console.log('选中的省是'+this.myAddressPrivince);
        }
        
 
      },
        methods: {
          onAddressChange:function(picker, values){
            this.areapicker = picker;
            this.mycityList = [];
            this.mydistrictList = [];
            var chooseList = city.filter(function(item){
                 return item.name == values[0];
            });
            if(chooseList[0].sub){
              for(var item of chooseList[0].sub){
                this.mycityList.push(item.name);
              }
              //获取非直辖市数据
              if(chooseList[0].sub.length>1){
                var choosedisList=[];
                if(this.mycityList.indexOf(values[2])>-1 && values[2]!= '其他'){
                  choosedisList = chooseList[0].sub.filter(function(item){
                    return item.name == values[2];
                  });
                    for(var item of choosedisList[0].sub){
                      this.mydistrictList.push(item.name);
                    }
                }else{
                    this.mydistrictList=[];
                }
              }
              //获取直辖市数据
              else{
                for(var item of chooseList[0].sub[0].sub){
                  this.mydistrictList.push(item.name);
                }
              }
            }
            this.myAddressPrivince = values[0];
            this.myAddressCity = values[2];
            this.myAddressDistrict = values[4];
          }
 
        },
      mounted() {
        this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
          this.myAddressSlots[0].defaultIndex = 0
        });
      }
    }
</script>
 
<style scoped>
.location_container{
  width:100%;
  height:353px;
  position:absolute;
  bottom:0px;
  background: #FFFFFF;
  box-shadow: 0 3px 10px 0 rgba(27,27,78,0.08);
  border-radius: 10px 10px 0px 0px;
}
</style>