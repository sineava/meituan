<template>
    <transition name="detail">
        <!-- 商品详情 -->
        <div class="food" v-show="showFlag" ref="foodView">
            <div class="food-wrapper">
                <div class="food-content">
                    <div class="img-wrapper">
                        <img class="food-img" :src="food.picture">
                        <div class="icon-wrapper">
                            <div class="left-content">
                                <span class="close-bt icon-close" @click="closeView"></span>
                            </div>
                            <div class="right-content">
                                <img class="share" :src="shareImg">
                                <img class="more" :src="moreImg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-wrapper">
                    <h3 class="name">{{food.name}}</h3>
                    <p class="saled">{{food.month_saled_content}}</p>
                    <img class="product" v-show="food.product_label_picture" :src="food.product_label_picture">
                    <p class="price">
                        <span class="text">￥{{food.min_price}}</span>
                        <span class="unit">/{{food.unit}}</span>
                    </p>
                    <div class="cartcontrol-wrapper">
                        <Cartcontrol :food="food"></Cartcontrol>
                    </div>
                    <div class="buy" v-show="!food.count || food.count == 0" @click="addFirst">
                        选规格
                    </div>
                </div>
                <Split></Split>
                <div class="rating-wrapper" v-if="food.rating">
                    <div class="rating-title">
                        <div class="like-ratio">
                            <span class="title">{{food.rating.title}}</span>
                            <div class="ratio">
                                (
                                    {{food.rating.like_ratio_desc}}
                                    <i class="percent">{{food.rating.like_ratio}}</i>
                                )
                            </div>
                        </div>
                        <div class="snd-title">
                            <span class="text">{{food.rating.snd_title}}</span>
                            <span class="icon icon-keyboard_arrow_right"></span>
                        </div>
                    </div>
                    <hr class="line">
                    <ul class="rating-content">
                        <li class="rating-comment" v-for="(comment, index) in food.rating.comment_list" :key="index">
                            <div class="comment-header">
                                <img class="header" :src="comment.user_icon ? comment.user_icon : defaultImg">
                            </div>
                            <div class="comment-main">
                                <p class="comment-info">
                                    <span class="comment-name">{{comment.user_name}}</span>
                                    <span class="comment-time">{{comment.comment_time}}</span>
                                </p>
                                <p class="comment-content">
                                    <span>{{comment.comment_content}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import moreImg from '@/assets/img/more.png'
import shareImg from '@/assets/img/share.png'
import defaultImg from '@/assets/img/anonymity.png'
// 引入better-scroll
import BScroll from '@better-scroll/core'

import Vue from 'vue'
export default {
    props: {
        food: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            // 图标img
            moreImg,
            shareImg,
            defaultImg,
            showFlag: false
        }
    },
    components: {
        Cartcontrol: () => import('@/components/cartcontrol/Cartcontrol'),
        Split: () => import('@/components/split/Split')
    },
    methods: {
        showView () {
            this.showFlag = true

            // BSroll初始化
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.foodView, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        closeView () {
            this.showFlag = false
        },
        addFirst () {
            Vue.set(this.food, 'count', 1)
        }
    }
}
</script>

<style lang="less" scoped>
.food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 51px;
    background-color: white;
    width: 100%;
    z-index: 2;
    .food-wrapper {
        float: left;
        width: 100%;
        .food-content {
            .img-wrapper {
                width: 100%;
                height: 0;
                position: relative;

                /**
                    tip高度撑开
                    在定位中,设置padding-top/bottom,盒子高度会根据宽度自行计算
                 */
                padding-top: 100%;
                .food-img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                .icon-wrapper {
                    width: 100%;
                    height: 30px;
                    padding: 0 20px;
                    position: absolute;
                    top: 20px;
                    left: 0;
                    box-sizing: border-box;
                    .left-content {
                        width: 30px;
                        height: 30px;
                        float: left;
                        .close-bt {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            color: white;
                            background-color: gray;
                            line-height: 30px;
                            font-size: 26px;
                        }
                    }
                    .right-content {
                        width: 60px;
                        height: 30px;
                        float: right;
                        display: flex;
                        .share {
                            height: 100%;
                        }
                        .more {
                            height: 100%;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
        .content-wrapper {
            width: 100%;
            padding: 0 16px 16px 16px;
            position: relative;
            box-sizing: border-box;
            h3.name {
                font-size: 15px;
                color: #333333;
                line-height: 30px;
                font-weight: bold;
            }
            p.saled {
                font-size: 11px;
                color: #9d9d9d;
            }
            img.product {
                height: 15px;
                margin-top: 6px;
            }
            p.price {
                margin-top: 15px;
                span.text {
                    font-size: 17px;
                    color: #fb4e44;
                    font-weight: bolder;
                }
                span.unit {
                    font-size: 11px;
                }
            }
            .cartcontrol-wrapper {
                position: absolute;
                right: 13px;
                top: 20px;
            }
            .buy {
                width: 64px;
                height: 30px;
                font-size: 12px;
                line-height: 30px;
                text-align: center;
                background-color: #ffd161;
                border-radius: 30px;
                position: absolute;
                right: 13px;
                top: 20px;
            }
        }
        .rating-wrapper {
            width: 100%;
            height: 45px;
            width: 100%;
            padding: 16px 16px 0 16px;
            box-sizing: border-box;
            .rating-title {
                display: flex;
                justify-content: space-between;
                .like-ratio {
                    display: flex;
                    span.title {
                        font-size: 13px;
                    }
                    .ratio {
                        font-size: 11px;
                        i.percent {
                            color: red;
                            font-size: 11px;
                        }
                    }
                }
                .snd-title {
                    font-size: 13px;
                    color: #9d9d9d;
                    font-size: 13px;
                    .icon {
                        margin-left: 12px;
                    }
                }
            }
            .line {
                margin-top: 16px;
                margin-bottom: 0;
                color: #ccc;
                transform: scaleY(.5);
            }
            .rating-content {
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
                        .comment-content {
                            margin-top: 17px;
                            font-size: 13px;
                            line-height: 19px;
                        }
                    }
                }
            }
        }
    }
}

// vue transition
.detail-enter-active, .detail-leave-active {
    transition: all 1s;
}
.detail-enter, .detail-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
.detail-enter-to, .detail-leave {
    opacity: 1;
}
</style>
