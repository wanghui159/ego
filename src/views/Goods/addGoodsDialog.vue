<template lang="">
    <div>
        <!-- 弹框添加 -- 外弹框-->
        <el-button type="primary" @click="addGoods">弹框添加</el-button>
        <el-dialog :title="digtitle" :visible.sync="centerDialogVisible" width="60%" top="60px"
            :before-close="resetForm">
            <!-- 内容区域 -->
            <div class="tableContent">
                <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                    :visible.sync="outerVisible">
                    <el-form-item label="类目选择" prop="status">
                        <el-button type="primary" @click="innerVisible = true">类目选择</el-button>
                        <span class="status">{{ goodsForm.status }}</span>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="title">
                        <el-input v-model="goodsForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="price">
                        <el-input v-model="goodsForm.price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="num">
                        <el-input v-model="goodsForm.num"></el-input>
                    </el-form-item>
                    <el-form-item label="商品买点" prop="sellPoint">
                        <el-input v-model="goodsForm.sellPoint"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片" prop="image">
                        <el-button type="primary" @click="innerVisibleImg=true">上传图片</el-button>
                        <span class="status">{{ goodsForm.image }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="descs">
                        <ToolBar @sentToolBar='sentToolBar' ref="myEditor" />
                    </el-form-item>
                </el-form>
            </div>
            <!-- 弹框底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="insertGoodsForm">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 1. 内弹框：类目选择 -->
        <el-dialog width="40%" title="类目选择" :visible.sync="innerVisible" append-to-body>
            <statusChangeInfo @sendTreeData='sendTreeData' />
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="showTreeData">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 2. 内弹框 ：上传图片 -->
        <el-dialog width="40%" title="上传图片" :visible.sync="innerVisibleImg" append-to-body>
            <UploadImg @sendImgUrl='sendImgUrl' />
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisibleImg = false">取 消</el-button>
                <el-button type="primary" @click="showImgData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import statusChangeInfo from './statusChangeInfo.vue'
    import UploadImg from './UploadImg.vue'
    import ToolBar from './ToolBar.vue'
    export default {
        components: {
            statusChangeInfo,
            UploadImg,
            ToolBar,
        },
        props: {
            digtitle: {
                type: String,
                default: '添加商品'
            },
            rowData: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {
                centerDialogVisible: false, // 外弹框
                innerVisible: false,  // 内弹框
                innerVisibleImg: false,  // 内弹框
                outerVisible: false,
                treeData: {}, // 接收tree数据
                imgUrl: '',
                diglogTitle: '',
                goodsForm: {  // 表单容器--对象
                    title: '',
                    price: '',
                    num: '',
                    cid: '',
                    sellPoint: '',
                    image: '',
                    descs: '',
                    status: ''
                },
                rules: {  //校验规则
                    title: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入价格', trigger: 'blur' }
                    ],
                    num: [
                        { required: true, message: '请输入数量', trigger: 'blur' },
                        { min: 1, message: '', trigger: 'blur' }
                    ],
                }
            }
        },
        // 监听器
        watch: {
            rowData(val) {
                this.goodsForm = val
                // 设置富文本编译的内容
                // watch在 created里面，取不到dom元素，dom元素在mounted里面
                // this.$nextTick  延迟加载
                this.$nextTick(() => {
                    console.log('this.$refs.myEditor', this.$refs.myEditor);
                    this.$refs.myEditor.editor.txt.html(val.descs)
                })
            },
        },
        methods: {
            // 添加商品
            addGoods() {
                this.centerDialogVisible = true
                this.digtitle = '添加商品'
            },
            resetForm() {
                this.centerDialogVisible = false // 关闭弹框
                // 清空表单 1.element-ui 重置表单
                this.goodsForm = {
                    title: '',
                    price: '',
                    num: '',
                    cid: '',
                    sellPoint: '',
                    image: '',
                    descs: '',
                    status: ''
                }
                // editor.txt.clear() 清空编辑器内容
                console.log('this.$refs.myEditor', this.$refs.myEditor);
                this.$refs.myEditor.editor.txt.clear()
            },
            // 获取tree数据
            sendTreeData(val) {
                this.treeData = val
            },
            // 显示tree数据
            showTreeData() {
                // 关闭内弹框
                this.innerVisible = false,
                    // 显示数据
                    this.goodsForm.status = this.treeData.name
                this.goodsForm.cid = this.treeData.cid
            },
            // 得到图片url
            sendImgUrl(val) {
                this.imgUrl = val
            },
            showImgData() {
                this.goodsForm.image = this.imgUrl
                this.innerVisibleImg = false
            },
            // 接收富文本信息
            sentToolBar(val) {
                this.goodsForm.descs = val
            },
            // 得到表单内数据
            insertGoodsForm() {
                console.log('this.goodsForm', this.goodsForm)

                // [title, image, sellPoint, price, cid, num, desc]
                let { title, price, num, cid, sellPoint, image, descs, status } = this.goodsForm
                /**
                 * 检测是编辑还是添加  用diglogTitle
                */
                if (this.digtitle == '添加商品') {
                    this.$api.insertGoods({
                        title, price, num, cid, sellPoint, image, descs, status
                    }).then(res => {
                        console.log('res--addGoods', res.data);
                        if (res.data.status === 200) {
                            // 成功
                            this.$parent.http(1) // 更新列表数据
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            // 清空表单
                            this.resetForm()
                        } else {
                            this.$message.error('添加失败');
                        }
                    })
                } else {
                    this.$api.updateGoodsById({
                        // title, sellPoint, cid, price, num, desc, status, image, id
                        title, price, num, cid, sellPoint, image, descs, status,
                        id: this.rowData.id
                    }).then(res => {
                        if (res.data.status === 200) {
                            // 成功
                            this.$parent.http(1) // 更新列表数据
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            // 清空表单
                            this.resetForm()
                        } else {
                            this.$message.error('修改失败');
                        }
                    })
                }
            },
        }
    }

</script>
<style lang="less" scoped>
    button {
        border-radius: 5px;
        margin-left: 25px;
    }

    .status {
        margin-left: 20px;
    }
</style>