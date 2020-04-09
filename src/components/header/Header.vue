<template>
    <div class="header">
        <!-- 顶部通栏 -->
        <div class="top-wrapper">
            <div class="back-wrapper">
                <span class="icon-arrow_lift" @click="tip"></span>
            </div>
            <form class="search-wrapper">
                <span class="search-icon"></span>
                <input class="search-bar" type="text" placeholder="搜索店内商品"/>
            </form>
            <div class="more-wrapper">
                <a class="spell-icon" href="#" @click="tip">拼单</a>
                <span class="more-btn" @click="tip">
                    <div class="s-radius"></div>
                    <div class="s-radius"></div>
                    <div class="s-radius"></div>
                </span>
            </div>
        </div>
        <!-- 主体内容 -->
        <div class="content-wrapper">
            <div class="icon" :style="pic_url"></div>
            <div class="name">
                <h3>{{poi_info.name}}</h3>
            </div>
            <div class="collect">
                <img src="../../assets/img/star.png" @click="tip">
                <span>收藏</span>
            </div>
        </div>
        <!-- 公告内容 -->
        <div class="bulletin-wrapper" v-if="poi_info.discounts2">
            <img class="icon" :src="poi_info.discounts2[0].icon_url">
            <div class="content">{{poi_info.discounts2[0].info}}</div>
            <div class="detail" @click="isShow = true">
                {{poi_info.discounts2.length}}个活动
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>

        <!-- 背景 -->
        <div class="bg-wrapper" :style="content_url"></div>

        <!-- 公告详情 -->
        <transition name="detail">
            <div class="bulletin-detail" v-show="isShow">
                <div class="detail-wrapper">
                    <div class="main-wrapper" :style="poi_back_pic_url">
                        <div class="icon" :style="pic_url"></div>
                        <h3>{{poi_info.name}}</h3>
                        <!-- 评价 -->
                        <div class="score">
                            <Star :score="poi_info.wm_poi_score" :totalstar="totalstar"></Star>
                            <span>{{poi_info.wm_poi_score}}</span>
                        </div>
                        <p class="tip">
                            <span class="start_send_price">{{poi_info.min_price_tip}}</span><i>|</i>
                            <span class="send_price">{{poi_info.shipping_fee_tip}}</span><i>|</i>
                            <span class="deliver_time">{{poi_info.delivery_time_tip}}</span>
                        </p>
                        <p class="time">
                            配送时间
                            {{poi_info.shipping_time}}
                        </p>
                        <hr/>
                        <div class="discounts" v-if="poi_info.discounts2">
                            <p v-for="(item, index) in poi_info.discounts2" :key="index">
                                <img :src="item.icon_url">
                                <span>{{item.info}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="close-wrapper" @click="isShow = false">
                        <span class="icon-close"></span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isShow: false, // 公告详情是否显示
            totalstar: 5
        }
    },
    methods: {
        tip () {
            this.$message.success('oop!!!太懒了,暂时不想写')
        }
    },
    computed: {
        content_url () {
            return `background-image:url(${this.poi_info.head_pic_url})`
        },
        pic_url () {
            return `background-image:url(${this.poi_info.pic_url})`
        },
        poi_back_pic_url () {
            return `background-image:url(${this.poi_info.poi_back_pic_url})`
        }
    },
    props: {
        poi_info: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        Star: () => import('../star/Star')
    }
}
</script>

<style lang="less" scoped>
@white-color: #fff;
@black-color: #000;
@input-bar-color: #cdcdcc; // 搜索框颜色
@white-gray-color: #bababc; // 白色略显灰色
.header {
    height: 140px;
    padding-top: 20px;
    .top-wrapper {
        width: 100%;
        height: 31px;
        display: flex;
        .back-wrapper {
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: @white-color;
        }
        .search-wrapper {
            flex: 1;
            position: relative;
            .search-icon {
                position: absolute;
                width: 28px;
                height: 31px;
                transform: scale(.5);
                background-size: 13px 13px;
                background: url('../../assets/img/titans_h5_search@2x.png') no-repeat;
            }
            .search-bar {
                padding-left: 28px;
                outline: none;
                border: 0;
                background-color: @input-bar-color;
                width: 100%;
                height: 31px;
                box-sizing: border-box;
                border-radius: 16px;
            }
        }
        .more-wrapper {
            width: 65px;
            height: 17px;
            display: flex;
            align-items: center;
            padding: 7px 15px 7px 24px;
            .spell-icon {
                outline: none;
                font-size: 9px;
                width: 30px;
                height: 17px;
                line-height: 17px;
                border: 1px solid @white-color;
                text-decoration: none;
                color: @white-color;
                text-align: center;
            }
            .more-btn {
                float: right;
                width: 24px;
                height: 31px;
                margin-left: 15px;
                .s-radius {
                    margin: 13px 1px 0 0;
                    display: block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background-color: @black-color;
                    border: 1px solid @white-color;
                    float: left;
                }
            }
        }
    }
    .content-wrapper {
        padding: 17px 10px 11px 10px;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        .icon {
            width: 50px;
            height: 50px;
            background-position: center;
            background-size: 135% 100%;
            border-radius: 5px;
        }
        .name {
            margin-left: 11px;
            h3 {
                color: @white-color;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .collect {
            position: absolute;
            right: 10px;
            width: 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
                width: 20px;
                height: 20px;
            }
            span {
                margin-top: 7px;
                display: block;
                font-size: 11px;
                color: @white-color;
            }
        }
    }
    .bulletin-wrapper {
        font-size: 11px;
        height: 16px;
        padding: 0 10px 10px 10px;
        color: @white-color;
        line-height: 16px;
        .icon {
            height: 16px;
            float: left;
        }
        .content {
            margin-left: 6px;
            height: 16px;
            line-height: 16px;
            float: left;
        }
        .detail {
            height: 16px;
            line-height: 16px;
            float: right;
        }
    }
    .bg-wrapper {
        width: 100%;
        height: 160px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        background-size: 100% 135%;
        background-position: center;
    }
    .bulletin-detail {
        width: 100vw;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(98,98,98,.8);
        z-index: 1;
        .detail-wrapper {
            width: 100%;
            height: 100%;
            padding: 43px 20px 65px 20px;
            box-sizing: border-box;
            .main-wrapper {
                width: 100%;
                height: 68vh;
                background-size: 100% 100%;
                border-radius: 6px;
                text-align: center;
                padding-top: 20px;
                .icon {
                    margin: 0 auto;
                    width: 60px;
                    height: 60px;
                    background-size: 100% 100%;
                }
                h3 {
                    margin-top: 13px;
                    font-size: 15px;
                    font-weight: bolder;
                    color: @white-color;
                }
                .tip {
                    margin-top: 8px;
                    font-size: 11px;
                    color: @white-gray-color;
                    i {
                        margin: 0 7px;
                    }
                }
                .time {
                    margin-top: 13px;
                    font-size: 9px;
                    color: @white-color;
                }
                hr {
                    margin-top: 21px;
                    width: calc(100% - 40px);
                    transform: scaleY(.5);
                }
                .discounts {
                    text-align: center;
                    margin: 20px 20px 0 20px;
                    height: 16px;
                    font-size: 11px;
                    p {
                        img {
                            width: 16px;
                            height: 16px;
                            float: left;
                        }
                        span {
                            color: @white-color;
                            margin-left: 10px;
                            height: 16px;
                            line-height: 16px;
                        }
                    }
                }
            }
            .close-wrapper {
                margin: 20px auto 0 auto;
                width: 40px;
                height: 40px;
                text-align: center;
                border-radius: 50%;
                border: 1px solid rgba(140, 140, 140, .9);
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(118, 118, 118, .7);
                .icon-close {
                    font-size: 15px;
                    color: @white-color;
                }
            }
        }
    }
}

// Star组件
.score {
    margin: 6px 0 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        margin-left: 7px;
        font-size: 10px;
        color: @white-color;
    }
}

// vue过度动画
.detail-enter-active,.detail-leave-active {
    transition: 2s all;
}
.detail-enter,.detail-leave-to {
    opacity: 0;
}
.detail-enter-to,.detail-leave {
    opacity: 1;
}
</style>
