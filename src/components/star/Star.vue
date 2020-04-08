<template>
    <div class="star">
        <span v-for="(star, index) in itemClasses" :key="index">
            <img :src="star == 'star_on' ? star_on : star == 'star_half' ? star_half : star_off">
        </span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            star_on: require('../../assets/img/star24_on@2x.png'),
            star_half: require('../../assets/img/star24_half@2x.png'),
            star_off: require('../../assets/img/star24_off@2x.png')
        }
    },
    computed: {
        itemClasses () {
            const stars = []
            let score = this.score
            const totalstar = this.totalstar
            if (isNaN(score) && score < 0) return
            // 避免js的奇葩问题
            score = score * 10 % 10 >= 5 ? Number.parseInt(score) + 0.5 : Number.parseInt(score)
            const half = score * 10 % 10 === 5 ? 1 : 0
            const on = Number.parseInt(score)
            stars.length = totalstar
            stars.fill('star_off')
            for (let i = 0, flag = false; i < on; i++) {
                if (!flag && half === 1) {
                    stars[on] = 'star_half'
                    flag = true
                }
                stars[i] = 'star_on'
            }
            return stars
        }
    },
    props: {
        score: {
            type: Number,
            default: 0
        },
        totalstar: {
            type: Number,
            default: 5
        }
    }
}
</script>

<style lang="less" scoped>
.star {
    span {
        width: 9px;
        height: 9px;
        margin-left: 3px;
        img {
            width: 9px;;
            height: 9px;
        }
    }
}
</style>
