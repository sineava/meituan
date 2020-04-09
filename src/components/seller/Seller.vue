<template>
    <div class="seller">
        <div class="seller-wrapper">
            <Split></Split>
            <div class="seller-view">
                <div class="address-wrapper">
                    <div class="address-left">
                        {{seller.address}}
                    </div>
                    <div class="address-right">
                        <div class="content"></div>
                    </div>
                </div>
                <div class="pics-wrapper" ref="pics">
                    <ul class="pics-list" v-if="seller.poi_env">
                        <li class="pic" v-for="(item, index) in seller.poi_env.thumbnails_url_list" :key="index">
                            <img class="seller-img" :src="item" v-gallery>
                        </li>
                    </ul>
                </div>
                <div class="safety-wrapper">
                    查看食品安全档案
                    <span class="arrow icon-keyboard_arrow_right"></span>
                </div>
            </div>
            <Split></Split>
            <div class="tip-wrapper">
                <div class="delivery-wrapper">
                    配送服务: {{seller.app_delivery_tip}}
                </div>
                <div class="shipping-wrapper">
                    配送时间: {{seller.shipping_time}}
                </div>
            </div>
            <Split></Split>
            <div class="other-wrapper">
                <div class="server-wrapper">
                    商家服务
                    <div class="poi-server" v-for="(item, index) in seller.poi_service" :key="index">
                        <img :src="item.icon">
                        {{item.content}}
                    </div>
                </div>
                <div class="discount-wrapper">
                    <div class="discount-item" v-for="(item, index) in seller.discounts2" :key="index">
                        <div class="icon">
                            <img :src="item.icon_url">
                        </div>
                        <div class="text">{{item.info}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入better-scroll
import BScroll from '@better-scroll/core'

export default {
    data () {
        return {
            seller: {}
        }
    },
    components: {
        Split: () => import('@/components/split/Split')
    },
    created () {
        // 请求商家数据
        this.$axios.get('/api/seller')
            .then(data => {
                const res = data.data
                if (res.code !== 0) return
                this.seller = res.data
                this.$nextTick(() => {
                    if (this.seller.poi_env.thumbnails_url_list) {
                        this.picscroll = new BScroll(this.$refs.pics, {
                            scrollX: true,
                            click: true
                        })
                    }
                })
            })
            .catch(err => console.log(err))
    }
}
</script>

<style lang="less" scoped>
.seller {
    position: absolute;
    top: 200px;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    .seller-wrapper {
        .seller-view {
            padding-left: 15px;
            .address-wrapper {
                display: flex;
                padding: 16px 0;
                border-bottom: 1px solid #f4f4f4;
                .address-left {
                    padding: 0 31px 0 26px;
                    flex: 1;
                    background:  url(../../assets/img/address.png) no-repeat left center;
                    background-size: 15px 16px;
                    font-size: 14px;
                    line-height: 19px;
                }
                .address-right {
                    flex: 0 0 60px;
                    background: url(../../assets/img/line.png) no-repeat left center;
                    background-size: 1px 15px;
                    .content {
                        height: 100%;
                        background: url(../../assets/img/phone.png) no-repeat center center;
                        background-size: 18px 18px;
                    }
                }
            }
            .pics-wrapper {
                padding: 10px 0;
                overflow: hidden;
                border-bottom: 1px solid #f4f4f4;
                white-space: nowrap;
                width: 100%;
                ul.pics-list {
                    float: left;
                    li.pic {
                        display: inline-block;
                        .seller-img {
                            width: 94px;
                            height: 75px;
                            float: left;
                            border-radius: 3px;
                            margin-right: 11px;
                        }
                    }
                }
            }
            .safety-wrapper {
                padding: 15px 14px 15px 26px;
                background: url(../../assets/img/safety.png) no-repeat left center;
                background-size: 15px 16px;
                .arrow {
                    float: right;
                }
            }
        }
        .tip-wrapper {
            padding-left: 15px;
            .delivery-wrapper {
                padding: 15px 0;
                padding-left: 26px;
                background: url(../../assets/img/delivery.png) no-repeat left center;
                background-size: 14px 16px;
                border-bottom: 1px solid #f4f4f4;
            }
            .shipping-wrapper {
                padding: 15px 0 15px 0;
                line-height: 18px;
                padding-left: 27px;
                background: url(../../assets/img/time.png) no-repeat left center;
                background-size: 16px 16px;
            }
        }
        .other-wrapper {
            padding-left: 15px;
            .server-wrapper {
                background: url(../../assets/img/server.png) no-repeat left center;
                background-size: 16px 16px;
                padding: 15px 0 15px 25px;
                font-size: 14px;
                border-bottom: 1px solid #f4f4f4;
                .poi-server {
                    display: inline-block;
                    img {
                        width: 16px;
                        height: 16px;
                        margin-left: 17px;
                        margin-right: 6px;
                        vertical-align: middle;
                    }
                }
            }
            .discount-wrapper {
                padding: 18px 24px 18px 0;
                .discount-item {
                    display: flex;
                    .icon {
                        flex: 0 0 25px;
                        width: 15px;
                        height: 15px;
                        img {
                            width: 100%;
                        }
                    }
                    .text {
                        padding-left: 15px;
                        flex: 1;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        line-height: 25px;
                    }
                }
            }
        }
    }
}
</style>
