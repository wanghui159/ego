<template lang="">
    <div>
        <div class="header">
            <i v-if="!isCollapse" @click="changeMenu" class="iconfont icon-right-indent"></i>
            <i v-else @click="changeMenu" class="iconfont icon-bx-right-indent"></i>
            <div class="header-right">
                <div class="user">
                    欢迎您：{{ userinfo.user }}
                    <i class="el-icon-switch-button" @click="loginout"></i>
                </div>
            </div>

        </div>
        <!-- 内容区域 - 路由出口 -->
        <div class="content">
            <router-view />
        </div>

    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        props: ['isCollapse'],
        data() {
            return {

            }
        },
        computed: {
            ...mapState('loginModule', ['userinfo'])
        },
        methods: {
            ...mapMutations('loginModule', ['clearUser']),
            changeMenu() {
                // 点击切换按钮的时候 修改父组件的数据  isCollapse
                this.$emit('changeCollapse')
            },
            loginout() {
                console.log('loginout');
                // 退出登录
                // 清空vuex数据
                this.clearUser();
                // 清空本地存储
                localStorage.removeItem('user')
                // 返回登录
                this.$router.push('/login')
            }
        },
    }
</script>
<style lang="less" scoped>
    .header {
        height: 50px;
        line-height: 50px;
        background-color: rgba(15, 36, 153, 0.671);
        padding-left: 5px;
        color: #fff
    }

    .header .iconfont {
        font-size: 25px;
    }

    .header-right {
        display: flex;
        float: right;
        margin-right: 20px;
    }

    .header-menu {
        margin-right: 20px;
    }

    .el-icon-switch-button {
        font-size: 20px;
        margin: 0 10px;
        cursor: pointer;
    }

    .iconfont {
        cursor: pointer;
    }
</style>