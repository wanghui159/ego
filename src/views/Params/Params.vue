<template lang="">
    <div>
        <!-- 1. 搜索框 -->
        <div class="header">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input">
            </el-input>
            <el-button type="primary" @click="init();searchInp(page)">查询</el-button>
            <el-button type="primary" @click="showParams">添加</el-button>
        </div>
        <!-- 2. 表格 -->
        <div class="my-table">
            <el-table :data="tableData" border>
                <el-table-column type="selection" style="width: 100%">
                </el-table-column>
                <el-table-column prop="id" label="规格参数ID" width="100">
                </el-table-column>
                <el-table-column prop="itemCatId" label="类目ID" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="specsName" label="规格名称" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>
                            编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i
                                class="el-icon-delete"></i> 删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 3. 分页 -->
        <MyPagination :total="total" :currentpage="currentpage" :pageSize="pageSize" />
        <!-- 4. 弹框 -->
        <addParamsDialog ref="dialog" />

    </div>
</template>
<script>
    import MyPagination from '../../components/MyPagination.vue'
    import addParamsDialog from './addParamsDialog.vue'
    export default {
        components: {
            MyPagination,
            addParamsDialog
        },
        data() {
            return {
                input: '',
                tableData: [],
                total: 10,
                pageSize: 1,
                currentpage: 1,
                page: 1,
                centerDialogVisible: false,
            }
        },
        mounted() {
            this.http(1)
        },
        methods: {
            init() {
                this.page = 1;
                this.currentpage = 1
            },
            /**
             * 点击显示弹框
            */
            showParams() {
                this.$refs.dialog.centerDialogVisible = true
            },
            http(page) {
                this.$api.getParams({
                    page: page
                }).then(res => {
                    console.log(res.data);
                    if (res.data.status === 200) {
                        // 获取分页
                        this.total = res.data.total;
                        this.tableData = res.data.result;
                        this.pageSize = res.data.pageSize;
                    }
                })
            },
            // 分页页码
            changePage(page) {
                this.currentpage = page
                this.page = page
                if (this.input != '') {
                    console.log('this.input!==null');
                    this.searchInp(this.page)
                } else {
                    console.log('this.input==null');
                    this.http(this.page)
                }

            },
            // 搜索数据
            searchInp(page) {
                console.log('this.input', this.input);
                console.log('this.currentpage', this.currentpage);
                if (this.input == '') {
                    this.http(1)
                }
                else {
                    this.$api.getParamsSearch({
                        search: this.input,
                        page: page
                    }).then(res => {
                        if (res.data.status === 200) {
                            console.log('res--status === 200');
                            this.tableData = res.data.result
                            this.total = res.data.total
                            this.pageSize = res.data.pageSize;
                        } else {
                            console.log('res--status === 400');
                            this.tableData = []
                            this.total = 0
                        }
                    }
                    )
                }

            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除参数, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteParams({
                        id: row.id
                    }).then(res => {
                        console.log(res);
                        if (res.data.status === 200) {
                            this.http(1)
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error('删除失败');
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    .header {
        background-color: #fff;
        margin: 20px;
        padding: 10px;
        display: flex;
        border: 1px solid #eee;

        button {
            margin-left: 20px;
        }
    }

    .my-table {
        margin: 20px;
    }
</style>