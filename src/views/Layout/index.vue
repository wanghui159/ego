<template lang="">
    <div class="layout" ref="cc">
        <!-- 左侧导航区域 -->
        <myMenu class="menu" :isCollapse='isCollapse' />
        <!-- 右侧内容区域 -->
        <div :class='{content:flagg,cont:flag,isActive:isCollapse,}' ref='content'>
            <Content :isCollapse='isCollapse' @changeCollapse='changeCollapse' />
        </div>
    </div>
</template>
<script>
    import myMenu from './myMenu.vue'
    import Content from './Content.vue'
    export default {
        data() {
            return {
                isCollapse: false,
                flag: false,
                flagg: true,
            }
        },
        components: {
            myMenu,
            Content,
        },
        methods: {
            changeCollapse() {
                this.isCollapse = !this.isCollapse
                if (this.isCollapse) {
                    this.flag = false
                } else {
                    this.flag = true
                    this.flagg = false
                }
            },
        },
    }
</script>
<style lang="less" scoped>
    .layout {}

    .menu {
        /* width: 200px;
        min-height: 500px; */
        background: #054476;
        position: fixed;
        top: 0;
        bottom: 0;
    }

    .content {
        margin-left: 200px;
    }

    .cont {
        margin-left: 200px;
        animation-name: example;
        animation-duration: .5s;
    }

    .isActive {
        margin-left: 64px;
    }


    @keyframes example {
        from {
            margin-left: 64px;
        }

        to {
            margin-left: 200px;
        }
    }
</style>