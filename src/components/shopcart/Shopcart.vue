<template>
    <div :class="['shopcart', totalCount > 0 ? 'hightlight' : '']">
        <div class="shopcart-wrapper">
            <div class="content-left">
                <div class="logo-wrapper">
                    <span class="icon-shopping_cart" @click="toggleList"></span>
                    <i class="num" v-show="totalCount">{{totalCount}}</i>
                </div>
                <div class="desc-wrapper">
                    <p class="total_price" v-show="totalPrice">￥{{totalPrice}}</p>
                    <p class="tip">另需{{poi_info.shipping_fee_tip}}</p>
                </div>
            </div>
            <div class="content-right">
                {{totalCount > 0 ? '去结算' : poi_info.min_price_tip}}
            </div>
            <div class="shopcart-list" v-show="listShow">
                <div class="list-top">
                    <span v-if="poi_info.discounts2">{{poi_info.discounts2[0].info}}</span>
                </div>
                <div class="list-header">
                    <h3 class="title">
                        <i class="left-sq"></i>
                        <span class="content">1号口袋</span>
                    </h3>
                    <div class="empty" @click="empty">
                        <img :src="trash" class="trash">
                        <span>清空购物车</span>
                    </div>
                </div>
                <div class="list-content" ref="listcontent">
                    <ul>
                        <li class="food" v-for="(food, index) in select_foods" :key="index">
                            <div class="desc-wrapper">
                                <div class="desc-left">
                                    <p class="name">{{food.name}}</p>
                                    <p class="unit" v-if="!food.description">{{food.unit}}</p>
                                    <p class="desc" v-else>{{food.description}}</p>
                                </div>
                                <div class="desc-right">
                                    <span class="price">￥{{food.min_price}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <Cartcontrol :food="food"></Cartcontrol>
                                </div>
                            </div>
                            <div class="cartcontrol-wrapper"></div>
                        </li>
                    </ul>
                </div>
                <div class="list-bottom"></div>
            </div>
        </div>
        <!-- 遮罩层 -->
        <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
    </div>
</template>

<script>
// 引入垃圾桶图标
import trash from '../../assets/img/ash_bin.png'

// 引入better-scroll
import BScroll from '@better-scroll/core'
export default {
    data () {
        return {
            trash,
            fold: true // 购物车详情是否折叠 => 默认折叠
        }
    },
    props: {
        poi_info: {
            type: Object,
            default () {
                return {}
            }
        },
        select_foods: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        Cartcontrol: () => import('../cartcontrol/Cartcontrol')
    },
    computed: {
        // 选中商品总数
        totalCount () {
            let num = 0
            this.select_foods.forEach(item => {
                num += item.count
            })
            return num
        },
        // 选中商品总金额
        totalPrice () {
            let total = 0
            this.select_foods.forEach(item => {
                total += item.min_price * item.count
            })
            return total
        },
        // 用于购物车详情的显示/隐藏
        listShow () {
            return this.show()
        }
    },
    methods: {
        show () {
            if (!this.totalCount) {
                this.fold = true
                return false
            }
            const show = !this.fold
            if (show) {
                this.$nextTick(() => {
                    if (!this.shopScroll) {
                        this.shopScroll = new BScroll(this.$refs.listcontent, {
                            click: true
                        })
                    } else {
                        this.shopScroll.refresh()
                    }
                })
            }
            return show
        },
        toggleList () {
            if (!this.totalCount) return
            this.fold = !this.fold
        },
        empty () { // 清空购物车
            this.select_foods.forEach(item => {
                item.count = 0
            })
        },
        hideMask () {
            this.fold = true
        }
    }
}
</script>

<style lang="less" scoped>
.shopcart {
    position: relative;
    .shopcart-wrapper {
        width: 100%;
        // height: 51px;
        background-color: #514f4f;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        z-index: 100; // 比遮罩z-index高点
        .content-left {
            flex: 1;
            .logo-wrapper {
                width: 50px;
                height: 50px;
                background-color: #666666;
                border-radius: 50%;
                position: relative;
                top: -14px;
                left: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                float: left;
                .icon-shopping_cart {
                    font-size: 28px;
                    color: #c4c4c4;
                }
                i.num {
                    width: 17px;
                    height: 17px;
                    background-color: #ff3c00;
                    border-radius: 50%;
                    color: white;
                    position: absolute;
                    text-align: center;
                    top: 0;
                    left: 70%;
                    font-size: 9px;
                    line-height: 17px;
                }
            }
            .desc-wrapper {
                float: left;
                margin-left: 13px;
                p.total_price {
                    font-size: 18px;
                    color: white;
                    line-height: 33px;
                }
                p.tip {
                    font-size: 12px;
                    color: #bab9b9;
                    line-height: 51px;
                }
            }
        }
        .content-right {
            width: 110px;
            font-size: 15px;
            color: #bab9b9;
            line-height: 51px;
            text-align: center;
        }
        .shopcart-list {
            width: 100%;
            position: absolute;
            bottom: 51px;
            z-index: -1;
            .list-top {
                height: 30px;
                width: 100%;
                background-color: #f3e6c6;
                font-size: 11px;
                color: #646158;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .list-header {
                width: 100%;
                height: 30px;
                background-color: #f4f4f4;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #656565;
                h3.title {
                    position: relative;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    i.left-sq {
                        width: 6px;
                        height: 30px;
                        background-color: #53c123;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    span.content {
                        margin-left: 12px;
                        font-size: 14px;
                    }
                }
                .empty {
                    font-size: 12px;
                    line-height: 30px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    .trash {
                        width: 14px;
                    }
                    span {
                        margin-left: 4px;
                    }
                }
            }
            .list-content {
                background-color: white;
                overflow: hidden;
                max-height: 30vh;
                ul {
                    li.food {
                        height: 60px;
                        .desc-wrapper {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 100%;
                            padding: 0 13px;
                            position: relative;
                            .desc-left {
                                display: flex;
                                flex-direction: column;
                                width: 170px;
                                p.name {
                                    font-size: 16px;
                                    // 超出部分隐藏
                                    -webkit-line-clamp: 1;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                }
                                p.unit,p.desc {
                                    margin-top: 9px;
                                    font-size: 11px;
                                    // 超出部分隐藏
                                    -webkit-line-clamp: 1;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                }
                            }
                            .desc-right {
                                position: absolute;
                                left: 50%;
                            }
                        }
                    }
                }
            }
        }
    }
    .shopcart-mask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(7, 17, 27, .6);
    }
}

.shopcart.hightlight {
    .shopcart-wrapper {
        .content-left {
            background: linear-gradient(to right, #272727, #403723);
            .logo-wrapper {
                background-color: #ffd161;
                .icon-shopping_cart {
                    color: #333333;
                }
            }
            .desc-wrapper {
                p.tip {
                    line-height: 12px;
                }
            }
        }
        .content-right {
            background-color: #ffd161;
            color: #333333;
            font-weight: bold;
        }
    }
}
</style>
