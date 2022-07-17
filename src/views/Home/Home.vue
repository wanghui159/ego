<template lang="">
    <div>
        <div class="card">
            <div :class="'card'+key" v-for="index,key in data" ::key="key">
                <span class="data-title">{{ index.title }}</span>
                <span class="data-total"> {{index.total}} </span>
                <span class="data-current"> 今日{{index.title}}：{{ index.current }} </span>
            </div>
        </div>
        <div id="left"></div>
        <div id="right"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [],
                dataecharts: [],
                date: [],
                appliancesnum: [],
                furniturenum: [],
                iphonenum: [],
                pie: [],
                piein: {
                    value: '',
                    name: ''
                }
            }
        },
        mounted() {
            this.getData();
            this.getStatisticalechartsData();
            // 绘制图表
            // console.log('this.$echarts', this.$echarts);
        },
        methods: {
            getData() {
                this.$api.getStatistical()
                    .then(res => {
                        // console.log('this.list', res.data.list);
                        for (let i = 0; i < res.data.list.length; i++) {
                            this.data.push(res.data.list[i])
                            // this.piein.value = parseInt(res.data.list[i].total)
                            // this.piein.name = res.data.list[i].title
                            this.pie.push({ value: parseInt(res.data.list[i].total), name: res.data.list[i].title })
                            console.log(this.pie);

                        }
                        // console.log('this.pie', this.pie.slice(0, 4));
                        this.getEchartsPie();
                    })
            },
            getStatisticalechartsData() {
                this.$api.getStatisticalecharts()
                    .then(res => {
                        this.dataecharts = res.data.data
                        // console.log(this.dataecharts);
                        for (let i = 0; i < res.data.data.appliances.length; i++) {
                            this.date.push(res.data.data.appliances[i].date)
                            this.appliancesnum.push(res.data.data.appliances[i].num)
                            this.furniturenum.push(res.data.data.furniture[i].num)
                            this.iphonenum.push(res.data.data.iphone[i].num)
                        }
                        this.getEcharts();
                    })
            },
            getEcharts() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('left'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '销售额'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['家电', '家具', '手机']
                    },
                    xAxis: {
                        data: this.date
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            name: '家电',
                            type: 'line',
                            areaStyle: {},
                            data: this.appliancesnum,
                            smooth: true
                        },
                        {
                            name: '家具',
                            type: 'line',
                            areaStyle: {},
                            data: this.furniturenum,
                            smooth: true
                        },
                        {
                            name: '手机',
                            type: 'line',
                            areaStyle: {},
                            data: this.iphonenum,
                            smooth: true
                        },
                    ],


                });
            },

            getEchartsPie() {
                console.log('this.dataPie', this.data);
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('right'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    legend: {
                        top: 'bottom'
                    },
                    series: [
                        {
                            name: '手机',
                            type: 'pie',
                            radius: [50, 150],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 8
                            },
                            data: this.pie
                        },
                    ],

                });
            }
        },
    }
</script>
<style lang="less" scoped>
    .card {
        margin: 20px;
        display: flex;
        justify-content: space-between;
    }

    .card0 {
        width: 295px;
        height: 115px;
        background-color: #004B97;
        color: #fff;
        border-radius: 8px;
    }

    .card1 {
        width: 295px;
        height: 115px;
        background-color: #8C8C00;
        color: #fff;
        border-radius: 8px;
    }

    .card2 {
        width: 295px;
        height: 115px;
        background-color: #9F4D95;
        color: #fff;
        border-radius: 8px;
    }

    .card3 {
        width: 295px;
        height: 115px;
        background-color: #930093;
        color: #fff;
        border-radius: 8px;
    }

    .data-title {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        margin-top: 5px;
        margin-left: 5px;
    }

    .data-total {
        width: 100%;
        display: block;
        font-size: 25px;
        font-weight: bold;
        padding-top: 10px;
        padding-left: 15px;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
    }

    .data-current {
        display: block;
        margin: 10px;
    }

    #left,
    #right {
        margin-top: 50px;
        width: 600px;
        height: 400px;
        background-color: #fff;
    }

    #left {
        float: left;
        margin-left: 20px;
    }

    #right {
        float: right;
        margin-right: 20px;
    }
</style>