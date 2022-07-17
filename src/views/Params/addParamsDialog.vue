<template lang="">
    <div>
        <el-dialog :title="digtitle" :visible.sync="centerDialogVisible" width="45%" top="60px"
            :before-close="resetForm">
            <!-- 内容区域 -->
            <div class="tableContent">
                <statusChangeInfo @sendTreeData='sendTreeData' />
            </div>
            <!-- 弹框底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="insertParamsForm" :disabled="isDisabled">确定并添加分组</el-button>
            </span>
            <!-- 2. 二级嵌套弹框 -->
            <el-dialog width="40%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body>
                <div class="innerdialog">
                    当前选中的商品：{{treeData.name}}
                </div>
                <el-button class="but-add" @click="addDomain">新增规格列表</el-button>
                <hr>
                <div class="add-button">
                    <!-- domains:[{title:'',value:'',children:[]},{}] -->
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px"
                        class="demo-dynamic">
                        <el-form-item v-for="(item, index) in dynamicValidateForm.domains" :label="item.title + index"
                            :key="item.key" :prop="index.title" :rules="{
                          required: true, message: '域名不能为空', trigger: 'blur'
                        }">
                            <div class="item">
                                <el-input v-model="item.title"></el-input>
                                <el-button @click.prevent="addChildDomain(index)">增加子组</el-button>
                                <el-button @click.prevent="removeDomain(index)">删除</el-button>
                            </div>
                            <!-- 内层表单项 -->
                            <el-form-item v-for="(ele, i) in item.children" :label="ele.title + i" :key="ele.key"
                                :prop="ele.title" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
                                <div class="item">
                                    <el-input v-model="ele.title"></el-input>
                                    <el-button @click.prevent="removeChildDomain(index,i)">删除</el-button>
                                </div>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item>
                            <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
                            <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
                        </el-form-item>
                    </el-form>
                </div>
                <div class="footer-button">
                    <el-button @click="resetForm()">取消</el-button>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">确定</el-button>
                </div>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
    import statusChangeInfo from '../Goods/statusChangeInfo.vue'
    export default {
        components: {
            statusChangeInfo,
        },
        data() {
            return {
                centerDialogVisible: false,
                // outerVisible: false,
                innerVisible: false,
                isDisabled: true,
                digtitle: "添加参数",
                treeData: '',
                paramsForm: {},
                dynamicValidateForm: {
                    domains: [],
                }
            }
        },
        methods: {
            /**   
             * 添加的规格列表
            */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('规格参数提交', this.dynamicValidateForm.domains);
                        console.log('this.dynamicValidateForm.domains', JSON.stringify(this.dynamicValidateForm.domains));
                        this.$api.insertItemParam({
                            // itemCatId, paramData, specsName
                            itemCatId: this.treeData.cid,
                            content: JSON.stringify(this.dynamicValidateForm.domains),
                            specsName: this.treeData.name,
                        })
                            .then(res => {
                                if (res.data.status === 200) {
                                    // 添加成功   隐藏弹框
                                    this.innerVisible = false;
                                    this.centerDialogVisible = false;
                                    this.isDisabled = true;
                                    this.resetForm()
                                    this.$parent.http(1)
                                } else {
                                    this.$message({
                                        message: '添加失败',
                                        type: 'warning'
                                    });
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm() {
                this.dynamicValidateForm.domains = []
            },
            /**
             * 删除当前的组
            */
            removeDomain(index) {
                this.dynamicValidateForm.domains.splice(index, 1)
            },
            /**
             * 删除子组
            */
            removeChildDomain(index, i) {
                this.dynamicValidateForm.domains[index].children.splice(i, 1)
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    title: '',
                    children: [],
                    key: Date.now()
                });
            },
            /**
            * 增加子组
            */
            addChildDomain(index) {
                this.dynamicValidateForm.domains[index].children.push({
                    value: '',
                    title: '',
                })
            },
            insertParamsForm() {
                this.innerVisible = true
            },
            // 获取点击的tree的数据
            sendTreeData(val) {
                this.treeData = val
                this.isDisabled = false
                console.log(val);
            }
        },
    }

</script>
<style lang="less" scoped>
    button {
        border-radius: 5px;
        margin-left: 25px;
    }

    .but-add {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 0;
    }


    .footer-button {
        display: flex;
        margin-top: 10px;
        justify-content: flex-end;
    }

    .item {
        display: flex;
        margin-top: 10px;

        el-button {
            margin-left: 20px;
        }
    }
</style>