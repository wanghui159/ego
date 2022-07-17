<template lang="">
    <div class="goods">
        <!-- 1. 搜索区域 -->
        <div class="header">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input">
            </el-input>
            <el-button type="primary" @click="init();searchInp(page)">查询</el-button>

            <!-- <router-link to="/add-goods" style="color: #fff;">
                <el-button type="primary">页面添加</el-button>
            </router-link> -->
            <!-- 弹框添加商品 -->
            <addGoodsDialog :digtitle='digtitle' ref="dialog" :rowData="rowData" />
        </div>
        <!-- 2. 表格区域展示视图数据 -->
        <div class="wrapper">
            <el-table :data="tableData" border>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="商品ID" width="100">
                </el-table-column>
                <el-table-column prop="title" label="商品名称" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="price" label="商品价格" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="num" label="商品数量" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status" label="规格类目" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
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
        <!-- 3. 分页区域 -->
        <MyPagination :total='total' :pageSize='pageSize' @changePage='changePage' :currentpage='currentpage' />
    </div>
</template>
<script>
    import MyPagination from '../../components/MyPagination.vue'
    import addGoodsDialog from './addGoodsDialog.vue'
    export default {
        components: {
            MyPagination,
            addGoodsDialog,
        },
        data() {
            return {
                input: '',
                tableData: [],
                total: 10,
                pageSize: 1,
                page: 1,
                centerDialogVisible: false,
                currentpage: 1,
                digtitle: '添加商品',
                rowData: {} // 当前行数据
            }
        },
        methods: {
            init() {
                this.page = 1;
                this.currentpage = 1
            },
            // 编辑操作
            handleEdit(index, row) {
                console.log('index,row', row)
                // title, sellPoint, cid, price, num, desc, status,image, id
                this.$refs.dialog.centerDialogVisible = true
                this.digtitle = '编辑商品'
                this.rowData = { ...row }
                console.log('rowData', this.rowData)
                // this.$refs.dialog.goodsForm = row  // 方法1
            },
            // 删除操作
            handleDelete(index, row) {
                console.log('index,row', row.id)
                this.$confirm('此操作将永久删除商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteGoodsById({
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
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
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
                    this.$api.getSearchList({
                        search: this.input,
                        page: page
                    }).then(res => {
                        if (res.data.status === 200) {
                            console.log('res--status === 200');
                            this.tableData = res.data.result
                            this.total = res.data.total
                            this.pageSize = res.data.pageSize
                        } else {
                            console.log('res--status === 400');
                            this.tableData = []
                            this.total = 0
                            this.pageSize = res.data.pageSize
                        }
                    }
                    )
                }

            },
            http(page) {
                this.$api.getGoodList({
                    page
                }).then(res => {
                    if (res.data.status === 200) {
                        console.log('http', page);
                        this.tableData = res.data.data
                        this.total = res.data.total
                        this.pageSize = res.data.pageSize
                    }
                })
            }
        },
        // 生命周期函数
        created() {
            this.http(1)
        }
    }
</script>
<style lang="less" scoped>
    .goods {
        margin: 20px;
    }

    .header {
        display: flex;

        button {
            border-radius: 5px;
            margin-left: 25px;
        }
    }

    .wrapper {
        margin: 20px 0;
    }
</style>