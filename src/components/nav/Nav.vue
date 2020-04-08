<template>
    <div class="nav">
        <router-link to="/goods" class="nav-item seller">点菜</router-link>
        <router-link to="/rating" class="nav-item rating">评价({{comment_num}})</router-link>
        <router-link to="/seller" class="nav-item seller">商家</router-link>
    </div>
</template>

<script>
export default {
    props: {
        comment_num: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="less" scoped>
@nav-none: #666666; // 导航栏未选中颜色
@nav-select: #FFBB22; // 导航栏选中颜色
@nav-bottom: #e4e4e4; // 导航栏底部颜色
.nav {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    justify-content: space-evenly;
    border-bottom: 1px solid @nav-bottom;
    .nav-item {
        flex: 1;
        text-align: center;
        text-decoration: none;
        color: @nav-none;
        font-size: 13px;
    }
    .active {
        color: @nav-select;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            height: 5px;
            width: 21px;
            transform: translateX(-50%);
            background-color: @nav-select;
            border-radius: 3px;
        }
    }
}
</style>
