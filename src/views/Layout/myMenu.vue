<template lang="">
    <div>
        <el-menu :default-active="$root.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#054476" text-color="#fff" active-text-color="#ffd04b" router :collapse="isCollapse">
            <el-menu-item>
                <span slot="title">易购后台管理系统</span>
            </el-menu-item>
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">数据统计</span>
            </el-menu-item>
            <el-menu-item index="/goods">
                <i class="el-icon-document"></i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/params">
                <i class="el-icon-set-up"></i>
                <span slot="title">规格参数</span>
            </el-menu-item>
            <el-menu-item index="/user">
                <i class="el-icon-setting"></i>
                <span slot="title">用户中心</span>
            </el-menu-item>
            <!-- <el-submenu index="/order">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/order/order-list">
                        <i class="el-icon-notebook-1"></i>
                        订单列表
                    </el-menu-item>
                    <el-menu-item index="/order/order-back">
                        <i class="el-icon-notebook-1"></i>
                        退货管理
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
        </el-menu>
    </div>
</template>
<script>
    export default {
        props: ['isCollapse'],
        data() {
            return {
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
        },
    }
</script>
<style lang="less" scoped>
    .el-menu {
        border-right: 0;
    }

    .el-menu .is-active {
        background: #023258 !important;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>