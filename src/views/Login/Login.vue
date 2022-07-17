<template lang="">
    <div>
        <div class="login-box">
            <span class="login-title">登录</span>
            <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input type="text" v-model="loginForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import jwt from 'jwt-decode'
    import { mapMutations } from 'vuex'
    export default {
        data() {
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    userName: '',
                    password: '',
                },
                rules: {
                    userName: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            ...mapMutations('loginModule', ['setUser']),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('校验通过', this.loginForm);
                        // 请求登录借口
                        this.$api.getLogin({
                            username: this.loginForm.userName,
                            password: this.loginForm.password
                        }).then(res => {
                            if (res.data.status === 200) {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                /**
                                 * 登录成功后
                                 * 1. 存储登录信息
                                 * 2. 跳转网页
                                 * 3. 顶部区域显示用户信息
                                 * 4. 持久化
                                */
                                let obj = {
                                    user: jwt(res.data.data).username,
                                    token: res.data.data
                                }
                                this.setUser(obj)
                                // 存储本地
                                localStorage.setItem('user', JSON.stringify(obj))
                                // 跳转
                                this.$router.push('/')
                            } else {
                                // 账号密码错误
                                this.$message.error('账号密码错误');
                            }

                        })
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
    .login-box {
        width: 600px;
        height: 300px;
        margin: 150px auto;
        background-color: #fff;
        padding: 30px;
    }

    .login-title {
        display: block;
        margin: 20px auto;
        text-align: center;
        font-size: 24px;
    }
</style>