<template>
	<div class="chart-visit">
		<h2>网站数据概况</h2>
		<ul class="chart-sel">
			<li :class="{'active':currentType == 0}" @click="changeActive(0,'depth')">
				<img src="/static/res/images/cms/chart-pv.png"/>
				<div class="data-sel">
					<p>{{ (this.resData.data.summaryData.depth).toFixed(2) }}</p>
					<span>PV</span>
				</div>
			</li>
			<li :class="{'active':currentType == 1}" @click="changeActive(1,'nb_pageviews')">
				<img src="/static/res/images/cms/chart-uv.png"/>
				<div class="data-sel">
					<p>{{ this.resData.data.summaryData.nb_pageviews }}</p>
					<span>UV</span>
				</div>
			</li>
			<li :class="{'active':currentType == 2}" @click="changeActive(2,'nb_visits')">
				<img src="/static/res/images/cms/chart-visited.png"/>
				<div class="data-sel">
					<p>{{ this.resData.data.summaryData.nb_visits }}</p>
					<span>访客</span>
				</div>
			</li>
			<li :class="{'active':currentType == 3}" @click="changeActive(3,'bounce_rate')">
				<img src="/static/res/images/cms/chart-jumpout.png"/>
				<div class="data-sel">
					<p>{{ this.resData.data.summaryData.bounce_rate }}</p>
					<span>跳出率</span>
				</div>
			</li>
			<li :class="{'active':currentType == 4}" @click="changeActive(4,'nb_uniq_visitors')">
				<img src="/static/res/images/cms/chart-stay.png"/>
				<div class="data-sel">
					<p>{{ this.resData.data.summaryData.nb_uniq_visitors }}</p>
					<span>停留时间(秒)</span>
				</div>
			</li>
			<li :class="{'active':currentType == 5}" @click="changeActive(5,'sum_visit_length')">
				<img src="/static/res/images/cms/chart-deep.png"/>
				<div class="data-sel">
					<p>{{ this.resData.data.summaryData.sum_visit_length }}</p>
					<span>深度访问</span>
				</div>
			</li>
		</ul>
		<div class="echarts">
			<Mycharts :option="opt"></Mycharts>
		</div>
	</div>
</template>

<script>
	import Mycharts from 'vue-echarts-v3/src/lite.vue'

	export default {
	  name: 'chartTest',
	  components: {
	    Mycharts
	  },
	  data () {
	    return {
	      fakeData: {
	        'code': 0,
	        'data': {
	          'chartData': {
	            'data': {
	              'summaryData': [
	                {'depth': 0.0, 'nb_pageviews': 0, 'nb_visits': 0, 'bounce_rate': '0%', 'nb_uniq_visitors': 0, 'sum_visit_length': 0},
	                {'depth': 0.0, 'nb_pageviews': 0, 'nb_visits': 0, 'bounce_rate': '0%', 'nb_uniq_visitors': 0, 'sum_visit_length': 0},
	                {'depth': 0.0, 'nb_pageviews': 0, 'nb_visits': 0, 'bounce_rate': '0%', 'nb_uniq_visitors': 0, 'sum_visit_length': 0},
	                {'depth': 0.0, 'nb_pageviews': 0, 'nb_visits': 0, 'bounce_rate': '0%', 'nb_uniq_visitors': 0, 'sum_visit_length': 0},
	                {'depth': 3.0, 'nb_pageviews': 3, 'nb_visits': 1, 'bounce_rate': '0%', 'nb_uniq_visitors': 1, 'sum_visit_length': 55},
	                {'depth': 0.0, 'nb_pageviews': 0, 'nb_visits': 0, 'bounce_rate': '0%', 'nb_uniq_visitors': 0, 'sum_visit_length': 0},
	                {'depth': 0.0, 'nb_pageviews': 0, 'nb_visits': 0, 'bounce_rate': '0%', 'nb_uniq_visitors': 0, 'sum_visit_length': 0}
	              ]
	            },
	            'xAxis': ['2017-10-19', '2017-10-20', '2017-10-21', '2017-10-22', '2017-10-23', '2017-10-24', '2017-10-25']
            },
	          'summaryData': {'depth': 3.0, 'nb_pageviews': 3, 'nb_visits': 1, 'bounce_rate': '0%', 'nb_uniq_visitors': 1, 'sum_visit_length': 55}
	        }
	      },
	      currentType: 0,
	      resData: {},
	      newdata: [],
	      opt: {
	        color: ['#29C3CF'],
	        title: {
	          text: '',
	          textStyle: {fontSize: 24, color: '#29C3CF', align: 'left'},
	          x: 'center'
	        },
	        legend: {
	        },
	        tooltip: {
	          trigger: 'axis'
	        },
	        toolbox: {            // 工具箱属性
	          show: true,
            orient: 'horizontal',
            position: 'relative',
            top: '10px',
            left: 'center',
	          feature: {
	            dataView: {readOnly: false},
	            magicType: {
	              type: ['line', 'bar'],
                option: {
                  bar: {
	                  color: ['#29C3CF']    // 转换为柱状图属性
                  }
                }
              },
	            restore: {},
	            saveAsImage: {}
	          },
            iconStyle: {          // 图标样式
              emphasis: {
                color: '#29C3CF'
              }
            }
	        },
	        xAxis: {
	          name: '日期',
            nameTextStyle: {
	            color: '#29C3CF'
            },
            axisLine: {
	            lineStyle: {
	              color: '#29C3CF'
              }
            },
            axisLabel: {
              margin: 15,
	            color: '#999'
            },
            axisTick: {
              length: 6,
              lineStyle: {
                color: '#999',
                width: 2
              }
            },
	          type: 'category',
	          boundaryGap: false,
	          data: []
	        },
	        yAxis: {
	          name: 'PV',
            nameGap: 22,
            nameTextStyle: {
              padding: [0, 55, 0, 0],
              color: '#29C3CF'
            },
            axisLabel: {
              margin: 22,
              color: '#999'
            },
            axisLine: {
              lineStyle: {
                color: '#29C3CF'
              }
            },
            axisTick: {
	            length: 6,
              lineStyle: {
                color: '#999'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#e6ecf5'     // 分割线颜色
              }
            }
	        },
	        series: [
	          {
	            name: 'PV',
	            type: 'line',
              color: '#00aabb',
	            data: [],
	            itemStyle: {
	              normal: {
	                lineStyle: {
	                  color: '#29C3CF'
	                }
	              }
	            }
	          }
	        ]
	      }
	    }
	  },
	  computed: {
	    chartSel () {
	      var selectData = [
	        {selImg: '/static/res/images/cms/chart-pv.png', selP: this.resData.data.summaryData.depth, selSpan: 'PV', keyword: 'depth'},
	        {selImg: '/static/res/images/cms/chart-uv.png', selP: this.resData.data.summaryData.nb_pageviews, selSpan: 'UV', keyword: 'nb_pageviews'},
	        {selImg: '/static/res/images/cms/chart-visited.png', selP: this.resData.data.summaryData.nb_visits, selSpan: '访客', keyword: 'nb_visits'},
	        {selImg: '/static/res/images/cms/chart-jumpout.png', selP: this.resData.data.summaryData.bounce_rate, selSpan: '跳出率', keyword: 'bounce_rate'},
	        {selImg: '/static/res/images/cms/chart-stay.png', selP: this.resData.data.summaryData.nb_uniq_visitors, selSpan: '停留时间(秒)', keyword: 'nb_uniq_visitors'},
	        {selImg: '/static/res/images/cms/chart-deep.png', selP: this.resData.data.summaryData.sum_visit_length, selSpan: '深度访问', keyword: 'sum_visit_length'}
	      ]
	      return selectData
	    },
	    reqBody () {
	  	  return this.$store.state.sitetemplate.siteData
	  	}
	  },
	  methods: {
	    changeActive (index, keyword) {
	      this.currentType = index
	      let changeArry = []
	      for (let i = 0; i < this.newdata.length; i++) {
	        changeArry.push(parseInt(this.newdata[i][keyword]))
	      }
	      this.opt.series[0].data = changeArry
	      this.opt.series[0].name = keyword
	      this.opt.yAxis.name = this.chartSel[index].selSpan
	      console.log(this.newdata)
	    },
	    newParma () {
	      console.log('change--------------------')
	      console.log(this.reqBody)
	      this.$rest.post('/cms/rest/summary/list', this.reqBody).then(response => {
		      console.log('chart success')
		      console.log(response)
		      this.resData = response
		      this.opt.xAxis.data = this.resData.data.chartData.xAxis
		      this.newdata = this.resData.data.chartData.data.summaryData
		    }, response => {
		      console.log('chart fail')
		    }
		    )
	    }
	  },
	  watch: {
	    reqBody () {
	      console.log('change--------------------')
	      console.log(this.reqBody)
	      this.$rest.post('/cms/rest/summary/list', this.reqBody).then(response => {
		      console.log('chart success')
		      console.log(response)
		      let changeArry = []
		      this.resData = response
		      this.opt.xAxis.data = this.resData.data.chartData.xAxis
		      this.newdata = this.resData.data.chartData.data.summaryData
		      for (let i = 0; i < this.newdata.length; i++) {
		        changeArry.push(parseInt(this.newdata[i]['depth']))
		      }
		      this.opt.series[0].data = changeArry
	      	  this.opt.series[0].name = 'depth'
	          this.opt.yAxis.name = this.chartSel[0].selSpan
		    }, response => {
		      console.log('chart fail')
		    }
		    )
	    }
	  }
	}
</script>

<style>
	.chart-visit{
		margin: 10px 15px;
		padding: 15px 20px;
		background-color: #fff;
		border-radius: 5px;
		min-width: 1366px;
	}
	.chart-visit h2{
		margin-top: 10px;
		margin-bottom: 35px;
		font-size: 25px;
		font-weight: bold;
		text-align: center;
		color: #33c0cc;
	}
	.echarts {
    	margin: 0 auto;
    	width: 1560px;
    	height: 400px;
	}
	.chart-sel:before, .chart-sel:after{
		content: '';
		display: table;
	}
	.chart-sel:after{
		clear: both;
	}
	.chart-sel{
		margin-bottom: 25px;
		text-align: center;
	}
	.chart-sel li{
		display: inline-block;
		margin-right: 20px;
		padding: 0 15px 0 15px;
		width: 200px;
		height: 75px;
		text-align: left;
		line-height: 73px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
		cursor: pointer;
		overflow: hidden;
	}
	.chart-sel li:last-of-type{
		margin-right: 0;
	}
	.chart-sel li.active{
		border-color: #33c0cc;
	}
	.chart-sel li img{
		display: inline-block;
		margin-right: 5px;
		line-height: 1.5;
		vertical-align: middle;
	}
	.chart-sel li .data-sel{
		display: inline-block;
		line-height: 1.2;
		vertical-align: middle;
	}
	.chart-sel .data-sel p{
		margin-bottom: 0;
		font-size: 16px;
		font-weight: bold;
		color: #666;
	}
	.chart-sel .data-sel span{
		color: #ccc;
	}
	.chart-sel li.active span{
		color: #33c0cc;
	}
</style>
