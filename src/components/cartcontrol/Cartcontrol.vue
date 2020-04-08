<template>
    <div class="cartcontrol">
        <div class="cart-increase icon-add_circle" @click.stop="increaseCart">
            <i class="bg"></i>
        </div>
        <div class="cart-count" v-if="this.food.count">{{this.food.count}}</div>
        <!-- 购物选中控件 -->
        <transition name="move">
            <div class="cart-decrease" @click.stop="decreaseCart" v-if="this.food.count">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
    </div>
</template>

<script>
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
    methods: {
        decreaseCart () { // 减少按钮
            if (this.food.count === 0) return
            this.food.count--
        },
        increaseCart () { // 增加按钮
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
        }
    }
}
</script>

<style lang="less" scoped>
.cartcontrol {
    width: 90px;
    height: 30px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    .cart-decrease {
        font-size: 25px;
        color: #d8dadd;
    }
    .cart-count {
        line-height: 30px;
        height: 30px;
        animation: op 2s ease;
    }
    .cart-increase {
        position: relative;
        width: 25px;
        height: 25px;
        font-size: 25px;
        border-radius: 50%;
        color: #ffd161;
        i.bg {
            width: 25px;
            height: 25px;
            transform: scale(.5);
            background-color: black;
            border: none;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }
    }
}

@keyframes op {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

// 动画效果
.move-enter-active,.move-leave-active {
    transition: all 2s;
}
.move-enter,.move-leave-to {
    opacity: 0;
    transform: translateX(66px) rotate(180deg);
}
.move-enter-to,.move-leave {
    opacity: 1;
}
</style>
