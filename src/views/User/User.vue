<template lang="">
    <div>
        <h2>签约合同内容</h2>
        <div class="pdf-show">
            <el-row :gutter="12">
                <el-col :span="8">
                    <el-card shadow="never">
                        <div class="el-link">
                            <el-link type="primary" @click="openPdf1">打开</el-link>
                            <el-link type="primary" @click="downloadPdf1">打印</el-link>
                        </div>
                        <pdf src="./04.pdf" class="pdf" ref="pdf1"></pdf>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="never">
                        <div class="el-link">
                            <el-link type="primary" @click="openPdf2">打开</el-link>
                            <el-link type="primary" @click="downloadPdf2">打印</el-link>
                        </div>

                        <pdf src="./02.pdf" class="pdf" ref="pdf2"></pdf>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="never">
                        <div class="el-link">
                            <el-link type="primary" @click="openPdf3">打开</el-link>
                            <el-link type="primary" @click="downloadPdf3">打印</el-link>
                        </div>

                        <pdf src="./03.pdf" class="pdf" ref="pdf3"></pdf>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <pdfDiglog :src="src" ref="pdfDiglog" />
    </div>
</template>
<script>
    import pdfDiglog from './pdfDiglog.vue'
    import pdf from "vue-pdf";
    export default {
        components: {
            pdf,
            pdfDiglog
        },
        data() {
            return {
                src: ''
            }
        },
        methods: {
            openPdf1() {
                this.src = this.$refs.pdf1.src
                this.$refs.pdfDiglog.dialogVisible = true
            },
            downloadPdf1() {
                this.$refs.pdf1.print()
            },
            openPdf2() {
                this.src = this.$refs.pdf2.src
                this.$refs.pdfDiglog.dialogVisible = true
            },
            downloadPdf2() {
                this.$refs.pdf2.print()
            },
            openPdf3() {
                this.src = this.$refs.pdf3.src
                this.$refs.pdfDiglog.dialogVisible = true
            },
            downloadPdf3() {
                this.$refs.pdf3.print()
            },
        },
    }
</script>
<style lang="less" scoped>
    h2 {
        background-color: #fff;
        padding: 10px;
        margin: 20px;
        border-radius: 8px;
    }

    .pdf-show {
        margin: 20px;
        border-radius: 5px;
    }

    .pdf {
        width: 80%;
        margin: 0 auto;
        cursor: pointer;
        height: 450px;
    }

    .el-link {
        margin-left: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>