<template>
    <div class="rating" ref="rating">
        <div class="rating-wrapper">
            <div class="overview">
                <div class="overview-left">
                    <div class="comment-score">
                        <p class="score">{{rating.comment_score}}</p>
                        <p class="text">商家评分</p>
                    </div>
                    <div class="other-score">
                        <div class="quality-score item">
                            <span class="text">口味</span>
                            <Star :score="rating.quality_score"></Star>
                            <span class="score">{{rating.quality_score}}</span>
                        </div>
                        <div class="pack-score item">
                            <span class="text">包装</span>
                            <Star :score="rating.pack_score"></Star>
                            <span class="score">{{rating.pack_score}}</span>
                        </div>
                    </div>
                </div>
                <div class="overview-right">
                    <div class="delivery-score">
                        <p class="score">{{rating.delivery_score}}</p>
                        <p class="text">配送评分</p>
                    </div>
                </div>
            </div>
            <Split></Split>
            <div class="content">
                <div class="rating-select" v-if="rating.tab">
                    <span :class="['item', selectType == 0 ? 'active' : '']" @click="selectTypeFn(0)">
                        {{rating.tab[0].comment_score_title}}
                    </span>
                    <span :class="['item', selectType == 1 ? 'active' : '']" @click="selectTypeFn(1)">
                        {{rating.tab[1].comment_score_title}}
                    </span>
                    <span :class="['item', selectType == 2 ? 'active' : '']" @click="selectTypeFn(2)">
                        <img :src="iconSubImg" v-show="selectType!=2">
                        <img :src="highlightSubImg" v-show="selectType==2">
                        {{rating.tab[2].comment_score_title}}
                    </span>
                </div>
                <div class="labels-view">
                    <span :class="['item', item.label_star == 0 ? 'gray' : '']" v-for="item in rating.labels" :key="item.label_id">
                        {{item.content}} {{item.label_count}}
                    </span>
                </div>
                <ul class="rating-list">
                    <li class="rating-comment" v-for="(comment, index) in selectComments" :key="index">
                        <div class="comment-header">
                            <img class="header" :src="comment.user_pic_url ? comment.user_pic_url : defaultImg">
                        </div>
                        <div class="comment-main">
                            <p class="comment-info">
                                <span class="comment-name">{{comment.user_name}}</span>
                                <span class="comment-time">{{comment.comment_time | dateFormat}}</span>
                            </p>
                            <p class="star-wrapper">
                                <span>评分</span>
                                <Star :score="comment.order_comment_score"></Star>
                            </p>
                            <p class="comment-content">
                                <span v-html="par(comment.comment)"></span>
                            </p>
                            <div class="img-wrapper" v-if="comment.comment_pics.length">
                                <img :src="item.thumbnail_url" v-for="(item, index) in comment.comment_pics" :key="index">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import iconSubImg from '@/assets/img/icon_sub_tab_dp_normal@2x.png'
import highlightSubImg from '@/assets/img/icon_sub_tab_dp_highlighted@2x.png'
import defaultImg from '@/assets/img/anonymity.png'
import BScroll from '@better-scroll/core'

export default {
    data () {
        return {
            rating: {},
            iconSubImg,
            highlightSubImg,
            defaultImg,
            selectType: 0 // 0:全部 1:有图 2:点评
        }
    },
    components: {
        Star: () => import('@/components/star/Star'),
        Split: () => import('@/components/split/Split')
    },
    created () {
        // 请求评分数据
        this.$axios.get('/api/rating')
            .then(data => {
                const res = data.data
                if (res.code !== 0) return
                this.rating = res.data
                // 初始化滚动
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.rating, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh()
                    }
                })
            })
            .catch(err => console.log(err))
    },
    methods: {
        selectTypeFn (type) {
            this.selectType = type

            // 刷新
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        par (content) {
            const reg = /#[^#]+#/g
            return content.replace(reg, '<i style="color:#576b95">$&</i>')
        }
    },
    computed: {
        selectComments () {
            if (this.selectType === 0) { // 全部
                return this.rating.comments
            } else if (this.selectType === 1) { // 有图
                const arr = []
                this.rating.comments.forEach(comment => {
                    if (comment.comment_pics.length) {
                        arr.push(comment)
                    }
                })
                return arr
            } else { // 点评
                return this.rating.comments_dp.comments
            }
        }
    }
}
</script>

<style lang="less" scoped>
.rating {
    width: 100%;
    position: absolute;
    top: 200px;
    left: 0;
    bottom: 0;
    overflow: hidden;
    .rating-wrapper {
        overflow: auto;
        .overview {
            width: 100%;
            padding: 20px 0 18px 0;
            display: flex;
            .overview-left {
                flex: 1;
                padding-left: 26px;
                .comment-score {
                    float: left;
                    width: 48px;
                    text-align: center;
                    .score {
                        font-size: 23px;
                        font-weight: bold;
                        color: #ffb000;
                    }
                    .text {
                        margin-top: 9px;
                        font-size: 11px;
                        color: #666;
                    }
                }
                .other-score {
                    margin: 3px 0 0 35px;
                    float: left;
                    .item {
                        height: 11px;
                        &:nth-of-type(2) {
                            margin-top: 14px;
                        }
                        .text {
                            color: #666;
                            font-size: 11px;
                        }
                        .star {
                            display: inline-block;
                            margin-left: 11px;
                        }
                        .score {
                            color: #ffb000;
                            font-size: 11px;
                            margin-left: 11px;
                        }
                    }
                }
            }
            .overview-right {
                flex: 0 0 100px;
                text-align: center;
                border-left: 1px solid #9d9d9d;
                color: #999999;
                .delivery-score {
                    p.score {
                        margin-top: 3px;
                        font-size: 19px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    p.text {
                        font-size: 11px;
                    }
                }
            }
        }
        .content {
            padding: 0 16px 0 16px;
            .rating-select {
                margin-top: 16px;
                display: flex;
                .item {
                    padding: 11px 0;
                    flex: 1;
                    border: 2px solid #ffe39e;
                    height: 14px;
                    color: #ffb207;
                    font-weight: bold;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:nth-of-type(1) {
                        border-radius: 3px 0 0 3px;
                    }
                    &:nth-of-type(3) {
                        border-radius: 0 3px 3px 0;
                    }
                    &:nth-of-type(n+2) {
                        border-left: none;
                    }
                    img {
                        height: 15px;
                        margin-right: 5px;
                    }
                }
                .item.active {
                    color: #000;
                    background-color: #ffe39e;
                }
            }
            .labels-view {
                margin-top: 11px;
                font-size: 10px;
                .item {
                    display: inline-block;
                    height: 27px;
                    padding: 0 8px;
                    background-color: #f4f4f4;
                    border-radius: 3px;
                    margin-bottom: 6px;
                    margin-right: 6px;
                    text-align: center;
                    line-height: 27px;
                    vertical-align: middle;
                    color: #656565;
                }
                .item.gray {
                    color: #a1a1a1;
                    background-color: #f4f4f4;
                }
            }
            .rating-list {
                .rating-comment {
                    width: 100%;
                    padding: 15px 0 17px 0;
                    float: left;
                    .comment-header {
                        width: 41px;
                        height: 41px;
                        border-radius: 50%;
                        float: left;
                        .header {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .comment-main {
                        float: right;
                        width: calc(100% - 51px);
                        .comment-info {
                            margin-top: 6px;
                            display: flex;
                            justify-content: space-between;
                            .comment-name {
                                font-size: 12px;
                                color: #333333;
                                font-weight: bold;
                            }
                            .comment-time {
                                color: #666666;
                                font-size: 10px;
                            }
                        }
                        .star-wrapper {
                            margin-top: 12px;
                            span {
                                font-size: 11px;
                                color: #999999;
                            }
                            .star {
                                display: inline-block;
                            }
                        }
                        .comment-content {
                            margin-top: 17px;
                            font-size: 13px;
                            line-height: 19px;
                            span {
                                i {
                                    color: red;
                                }
                            }
                        }
                        .img-wrapper {
                            margin: 9px 0 10px 0;
                            float: left;
                            img {
                                width: 175px;
                            }
                        }
                    }
                }
            }
        }
    }
}

.highlight {
    color: red;
}
</style>
