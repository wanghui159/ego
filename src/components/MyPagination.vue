<template lang="">
    <div class="pagebox">
        <el-pagination background layout="total,prev, pager, next,jumper" :total="total" :page-size="pageSize"
            @current-change="changePage" :current-page.sync="currentpage">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        props: {
            total: {
                type: Number,
                default: 100
            },
            pageSize: {
                type: Number,
                default: 10
            },
            currentpage: {
                type: Number,
                default: 1
            }
        },
        methods: {
            changePage(page) {
                console.log(page)
                this.$emit('changePage', page)
            }
        },
    }
</script>
<style lang="less" scoped>
    .pagebox {
        margin: 20px;
        text-align: center;
    }
</style>