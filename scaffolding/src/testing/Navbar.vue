<template>
    <div>
        <!--导航-->
        <mt-navbar v-model="navactive">
            <mt-tab-item id="1">人文</mt-tab-item>
            <mt-tab-item id="2">历史</mt-tab-item>
            <mt-tab-item id="3">教育</mt-tab-item>
            <mt-tab-item id="4">数学</mt-tab-item>
        </mt-navbar>
        <!--面板-->
        <mt-tab-container v-model="navactive" style="margin-top:20px">
            <mt-tab-container-item id="1">人文类别页面</mt-tab-container-item>
            <mt-tab-container-item id="2">历史类别页面</mt-tab-container-item>
            <mt-tab-container-item id="3">教育类别页面</mt-tab-container-item>
            <mt-tab-container-item id="4">数学类别页面</mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
export default {
    data(){
        return {
            navactive:'1'
        }
    }
}
</script>
