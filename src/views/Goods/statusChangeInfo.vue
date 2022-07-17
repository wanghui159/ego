<template lang="">
    <div>
        <!-- 
            1. props	配置选项，具体看下表
                label	指定节点标签为节点对象的某个属性值	
                children	指定子树为节点对象的某个属性值	
                disabled	指定节点选择框是否禁用为节点对象的某个属性值	
                isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
            2. load
                加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)
                自动执行函数
            3. lazy 是否懒加载子节点，需与 load 方法结合使用

         -->
        <el-tree :props="props" :load="loadNode" lazy accordion @node-click="sendTreeData">
        </el-tree>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                props: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf'
                },
            };
        },
        methods: {
            sendTreeData(val) {
                console.log('sendTreeData:', val);
                this.$emit('sendTreeData', val)
            },
            loadNode(node, resolve) {  //  成功的返回数据的结果
                // console.log('一级的node', node);
                if (node.level === 0) {
                    // 进入页面获取第一层的数据
                    this.$api.getSelectItmeCategoryById()
                        .then(res => {
                            // console.log('一级的tree', res.data);
                            return resolve(res.data.result);
                        })

                };
                if (node.level >= 1) {
                    // 请求点击tree下面的数据
                    this.$api.getSelectItmeCategoryById({
                        id: node.data.cid
                    })
                        .then(res => {
                            // console.log('二级的tree', res.data);
                            if (res.data.status === 200) {
                                return resolve(res.data.result);
                            }
                            else {
                                return resolve([])
                            }

                        })
                }
            }
        }
    };
</script>
<style lang="">

</style>