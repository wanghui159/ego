<template lang="">
    <div>
        <!-- <el-button type="primary" @click="dialogVisible = true">查看合同</el-button> -->

        <el-dialog :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
            <!-- 
                :src:文件路径
                :page:显示的页码
                :rotate
             -->
            <div class="header">
                <span class="title">合同内容</span>
                <el-button @click="beforePage">上一页</el-button>
                <el-button @click="afterPage">下一页</el-button>
            </div>

            <hr>
            <pdf :src="src" :page="page" @num-pages="pageCount = $event" @page-loaded="currentPage = $event" class="pdf"
                ref="mypdf"></pdf>
            <!-- <pdf v-for="i in numPages" :key="i" :src="src" :page="i" style="display: inline-block;width: 25%"
                ref="myPdfComponent"></pdf> -->
            <span class="page"> 共<span class="pageCount">{{pageCount}}</span>页<span
                    class="pageCount-currentPage"></span> 第<span class="currentPage">{{ currentPage }}</span>页 </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="print()">打印</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

</script>
<style lang="">

</style>

<script>
    import pdf from "vue-pdf";
    // var loadingTask = pdf.createLoadingTask('http://localhost:8080/01.pdf');
    export default {
        components: {
            pdf,
        },
        props: ['src'],
        // mounted() {

        //     this.src.promise.then(pdf => {

        //         this.numPages = pdf.numPages;
        //     });
        // },
        data() {
            return {
                dialogVisible: false,
                page: 1,
                currentPage: 0,
                pageCount: 0,
                // src: loadingTask,
                // numPages: undefined,
            };
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            },
            beforePage() {
                if (this.page > 1) {
                    this.page = this.page - 1
                } else {
                    this.page = 1
                }

            },
            afterPage() {
                if (this.page >= this.pageCount) {
                    this.page = this.pageCount
                } else {
                    this.page = this.page + 1
                }
            },
            // 打印
            print() {
                this.$refs.mypdf.print()
            }
        }
    };
</script>
<style lang="less" scoped>
    .page {
        display: flex;
        justify-content: center;
    }

    .pageCount,
    .currentPage {
        display: block;
        margin: 0 10px;
    }

    .pageCount-currentPage {
        display: block;
        margin: 0 20px;
    }

    .pdf {
        display: block;
        margin: 15px auto;
        border: 1px solid #eee;
    }

    .header {
        padding-bottom: 10px;
        margin-top: -40px;
    }

    .title {
        display: block;
        font-size: 25px;
        margin-bottom: 20px;
    }
</style>