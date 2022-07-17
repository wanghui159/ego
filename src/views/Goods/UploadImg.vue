<template lang="">
    <div>
        <!-- 
            ref="upload" : 获取dom元素
            action：上传的地址
            on-preview：点击文件列表中已上传的文件时的钩子 function()
            on-remove:删除文件
            file-list：上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
            auto-upload：是否在选取文件后立即进行上传
         -->
        <el-upload class="upload-demo" ref="upload" :action="url" :on-preview="handlePreview" :on-remove="handleRemove"
            :file-list="fileList" :auto-upload="false" :on-success="successUpload">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
    import base from '../../api/base'
    export default {
        data() {
            return {
                url: base.uploadUrl,  // 图片地址服务器
                fileList: []
            };
        },
        methods: {
            // 点击上传按钮  submit()上传到服务器
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            // 上传成功的函数
            successUpload(response, file, fileList) {
                // console.log('上传成功:')
                // console.log('response:', response)
                // console.log('file:', file)
                // console.log('fileList:', fileList)
                this.$message({
                    message: '恭喜你，图片上传成功',
                    type: 'success'
                });
                // 成功之后把图片地址传给父组件
                let url = base.host + response.url.slice(7);
                this.$emit('sendImgUrl', url)
            }
        }
    }
</script>
</script>
<style lang="">

</style>