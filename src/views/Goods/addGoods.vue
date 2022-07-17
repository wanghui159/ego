<template lang="">
    <div>
        <!-- 面包屑 -->
        <div class="title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/add-goods' }">添加商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 表单数据 -->
        <div class="tableContent">
            <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="类目选择" prop="state">
                    <el-button type="primary">类目选择</el-button>
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
                    <el-button type="primary">上传图片</el-button>
                </el-form-item>
                <el-form-item label="商品描述" prop="descs">
                    <el-input v-model="goodsForm.descs"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('goodsForm')">确定</el-button>
                    <el-button @click="resetForm('goodsForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                goodsForm: {  // 表单容器--对象
                    title: '',
                    price: '',
                    num: '',
                    sellPoint: '',
                    image: '',
                    descs: '',
                    state: ''
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
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style lang="less" scoped>
    .title {
        margin: 20px;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #eee;
    }

    .tableContent {
        margin: 20px;
        padding: 15px 30px 30px 20px;
        background-color: #fff;
        border: 1px solid #eee;
    }
</style>