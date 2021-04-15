<template>
    <div>
        <h1>无限滚动</h1>
        <div style="border:1px solid red" infinite-scroll-distance="20" v-infinite-scroll="loadmore"
        infinite-scroll-disabled="busy" :infinite-scroll-immediate-check="true">
            <p v-for="(item,i) of n" :key="i">{{i+1}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            busy:false,
            n:10
        }
    },
    methods:{
        loadmore(){
            //一旦执行loadmore 把busy改为true
            this.busy=true;
            this.$indicator.open({
                text:"加载中...",
                spinnerType:"snake"
            })
            console.log('loadmore...');
            setTimeout(()=>{
                this.n+=30;
                this.$indicator.close();
                this.busy=false;
            },2000)
            
        }
    }
}
</script>
<style scoped>
p{
    text-align: center;
    height:40px;
    border:1px solid black;
}
</style>