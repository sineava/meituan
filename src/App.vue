<template>
    <div id="app">
        <!-- 头部 -->
        <Myheader :poi_info="poi_info"/>
        <!-- 导航 -->
        <Mynav :comment_num="comment_num"/>
        <!-- 主体内容 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    data () {
        return {
            poi_info: {},
            comment_num: 0,
            rating: {}
        }
    },
    components: {
        Myheader: () => import('./components/header/Header'),
        Mynav: () => import('./components/nav/Nav')
    },
    created () {
        // 请求goods数据
        this.$axios.get('/api/goods')
            .then(data => {
                const res = data.data
                if (res.code !== 0) return
                this.poi_info = res.data.poi_info
            })
            .catch(err => console.log(err))
        // 请求评分数据
        this.$axios.get('/api/rating')
            .then(data => {
                const res = data.data
                if (res.code !== 0) return
                this.comment_num = res.data.comment_num
            })
            .catch(err => console.log(err))
    }
}
</script>

<style lang="less">
#app {
    width: 100vw;
    overflow: hidden;
}
</style>
