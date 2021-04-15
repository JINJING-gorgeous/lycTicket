<template>
    <div>
        <mt-swipe class="mtswipe" 
        :style="{height:swipeHeight}"
        :auto="5000"
        :speed="1000"
        :show-indicators="false"
        :continuous="true">
            <mt-swipe-item>
                <img src="../assets/1.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../assets/2.jpg" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    data(){
        return {
            swipeHeight:'0px'
        }   
    },
    mounted(){
        console.log(window.screen.width);
        let picwidth=1200;
        let picheight=800;
        let screenwidth=window.screen.width;
        let height=Math.floor((picheight*screenwidth)/picwidth)+'px';
        this.swipeHeight=height;
    }
}
</script>
<style scoped>
.mtswipe img{
    width:100%
}
</style>