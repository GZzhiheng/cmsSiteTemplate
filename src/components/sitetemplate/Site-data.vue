<style>
  .siteSearch{
    margin: 10px 15px;
    padding: 15px 20px;
    background-color: #fff;
    border-radius: 5px;
    min-width: 1366px;
  }
  .ssTitle{
    color: #33c0cc;
    margin-right: 15px;
  }
  .space-bar{
    display: inline-block;
    margin: 0 8px;
    width: 1px;
    height: 30px;
    vertical-align: middle;;
    background-color: #ccc;
  }
  .search-btn{
    display: inline-block;
    padding: 5px 25px;
    font-size: 12px;
    color: #33c0cc;
    border: 1px solid #33c0cc;
    border-radius: 5px;
    cursor: pointer;
  }
  .search-btn:hover{
    color: #fff;
    background-color: #33c0cc;
  }
  .companysearch{
    display: inline-block;
    position: relative;
  }
  .companyname, .companydate-box{
    width: 100%;
  }
  .companyname span, .companydate-box{
    display: inline-block;
    width: 100%;
    font-size: 12px;
    color: #ccc;
    vertical-align: -3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .visit-count{
    margin: 10px 15px;
    min-width: 1366px;
  }
  .visit-count:before,.visit-count:after{
    content: '';
    display: table;
  }
  .visit-count:after{
    clear: both;
  }
  .lhard-box{
    float: left;
    width:50%;
    padding-right: 5px;
    box-sizing: border-box;
  }
  .rhard-box{
    float: left;
    width:50%;
    padding-left: 5px;
    box-sizing: border-box;
  }
  .companyname .option{
    position: absolute;
    top:31px;
    background-color: #fff;
    line-height:22px;
    width:100.5%;
    max-height: 0;
    margin-left: -11px;
    border-width: 0;
    border-radius: 0 0 3px 3px;
    transition: all .3s;
    overflow: hidden;
  }
  .companyname .option span{
    padding-left: 10px;
    display: block;
    cursor: pointer;
    height: 28px;
    line-height: 28px;
  }
  .companyname .option span:hover{
    background-color: #eee;
  }
  .companyname .option.open{
    max-height: 250px;
    border: 1px solid #ccc;
    border-top-width: 0;
  }
  .companysearch .el-select{width: 348px;}
  .companysearch .el-select input:hover{border: 1px solid #85d9e0;}
  .companysearch .el-select .el-input.is-focus input:focus{border: 1px solid #33c0cc;}
  .companysearch .el-select .el-input.is-focus .el-input__inner{border: 1px solid #33c0cc;}
  .el-select-dropdown__item.selected{color: #85d9e0;}
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{background-color: #e6fafd;}
  .siteSearchSelect{top: 148px !important;}
  .companydate{width: 328px;}
  .companydate:hover{border: 1px solid #33c0cc;}
  .el-date-editor.el-input{width: 100%;}
  .el-icon-date:before{content: none;}

  /****日期组件样式****/
  .companydate .el-input__inner{border: none;height: 20px;padding: 0;cursor: pointer;width: 300px;}
  .el-range-separator{margin-right: 10px;}
  .el-date-editor--daterange .el-range__icon{margin: 0;line-height: 24px;}
  .el-range__icon:before{content: "\e608";}
  .el-input__inner .el-range-separator{line-height: 23px;color: #999;}
  .el-input__inner .el-range-input{cursor: pointer;}
  .date-pop-name .el-date-editor .el-input{width: 100%}
  /*.date-pop-name{left: 712px !important;width: 626px !important;}*/
  /*.date-pop-name .popper__arrow{left: 160px !important;}*/
  .date-pop-name .el-picker-panel__shortcut:hover{color: #00aabb;}
  .date-pop-name .el-date-table td.available:hover{color: #00aabb;}
  .date-pop-name .el-input__inner{border: none;padding: 0;height: 20px}
  .date-pop-name .el-date-table td.in-range{background-color: #fff;}
  .date-pop-name .el-date-table td div{height: 28px; padding: 2px 0;}
  .date-pop-name .el-date-table td.in-range>div{background-color: #ccf3f7;}
  .el-date-table td.today.end-date span, .el-date-table td.today.start-date span{color: #fff;}
  .siteSearch .el-date-editor,
  .siteSearch .el-date-editor input{
  	cursor: pointer;
  }
  .el-range-editor.is-active, .el-range-editor:hover{
  	border-color: #33c0cc !important;
  }
  .siteSearch .el-range-separator,
  .siteSearch .el-range__icon,
  .siteSearch .el-range__close-icon {
    display: inline;
    line-height: 24px;
	}
  .el-select .el-input.is-focus .el-input__inner,
  .el-select .el-input .el-input__inner:hover{
  	border-color: #33c0cc !important;
  }
  .siteSearch .el-date-editor .el-range__close-icon{
  	line-height: 24px;
  }
</style>
<template>
	<div>
		<Sitecrumbs :currentPage="this.currentPage"></Sitecrumbs>
		<div class="siteSearch website-data">
			<span class="ssTitle">站点：</span>
      <div class="companysearch">
        <el-select popper-class="siteSearchSelect" v-model="selectedCompany" placeholder="请选择站点" @change="changeCompany(selectedCompany)">
          <el-option
            v-for="item in items"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
			<div class="space-bar"></div>
			<span class="ssTitle">日期：</span>
        <el-date-picker
          v-model:value="dateGather.value"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          :start-placeholder="dateGather.start"
          :end-placeholder="dateGather.end"
          :picker-options="dateGather.pickerOptions"
          :editable="dateGather.bol"
          clearable="true"
          popper-class="date-pop-name"
          @change="vle"
        ></el-date-picker>
			<div class="space-bar"></div>
			<div class="search-btn" @click="queryFun">查询</div>
		</div>
		<Sitechartvisit ref="queryChart"></Sitechartvisit>
		<div class="visit-count">
			<div class="lhard-box">
				<Countriescount :siteCountry='siteCountrys'></Countriescount>
			</div>
			<div class="rhard-box">
				<Pagecount :sitePage='sitePages'></Pagecount>
			</div>
		</div>
	</div>
</template>

<script>
	import Sitecrumbs from './common/Site-crumbs'
	import Sitechartvisit from './common/sitesdata/Site-chartvisite'
	import Countriescount from './common/sitesdata/Countries-count'
	import Pagecount from './common/sitesdata/Page-count'

	export default {
	  data () {
	    return {
	      siteList: [],
	      reqBody2: {},
	      queryData:{},
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
			  currentPage: this.$route.name,
			  siteCountrys: [],
			  sitePages: [],
	      selectedCompany: '',
			  items: []
		  }
	  },
	  computed: {
	    dateGather () {
	      return this.$store.state.common.dateGather
	    }
	  },
	  components: {
	    Sitecrumbs,
	    Sitechartvisit,
	    Countriescount,
	    Pagecount
	  },
	  mounted () {
	  	this.$rest.get('/cms/rest/summary/getDirectory').then(response => {
	  		console.log('网站数据查询列表')
	  		console.log(response)
	  		this.items = response.data.sites
	  		let siteId = ''
	  		console.log(this.$route.query.siteId)
	  		if(this.$route.query.siteId) {
	  			siteId = this.$route.query.siteId
	  			this.selectedCompany = this.$route.query.name
	  		}else{
	  			siteId = response.data.sites[0].id
	  			this.selectedCompany = response.data.sites[0].name
	  		}
	  		console.log(siteId)
	  		this.reqBody2 = {
		        id: siteId,
		        daterangepicker: this.dateGather.start + '~' + this.dateGather.end,
		        start: this.dateGather.start,
		        end: this.dateGather.end,
		        cmsType: response.data.sites[0].type,
		        siteId: siteId
		    }
	  		this.$store.commit('SITE_SITEDATA', this.reqBody2)
	  		console.log(this.reqBody2)
	  		this.queryCountry(this.reqBody2)
		    this.queryPagelist(this.reqBody2)
	  	})
	  },
	  methods: {
	  	queryCountry (params) {
	  		this.$rest.post('/cms/rest/summary/countryList', params).then(response => {
		      console.log('国家数据查询成功 --->')
		      console.log(response.data)
		      this.siteCountrys = response.data
		    }, response => {
		      console.log('国家数据查询失败 --->')
		    })
	  	},
	  	queryPagelist (params) {
	  		this.$rest.post('/cms/rest/summary/pageList', params).then(response => {
		      console.log('网页信息查询成功 --->')
		      console.log(response.data)
		      this.sitePages = response.data
		    }, response => {
		      console.log('网页信息查询失败 --->')
		    })
	  	},
	    vle () {
	      console.log(this.dateGather)
	      let days = []
	      for (let i = 0; i<this.dateGather.value.length; i++){
	      	let year = new Date(this.dateGather.value[i]).getFullYear()
	      	let month = new Date(this.dateGather.value[i]).getMonth() + 1
	      	let day = new Date(this.dateGather.value[i]).getDate()
	      	let gaterTime = year+'-'+month+'-'+day
	      	days.push(gaterTime)
	      }
	      if(this.queryData.id === undefined || ''){
	      	this.queryData.id = this.reqBody2.id
		    	this.queryData.siteId = this.reqBody2.siteId
		    	this.queryData.cmsType = 'Site'
	      }
	      this.queryData.start = days[0]
	      this.queryData.end = days[1]
	      this.queryData.daterangepicker = days[0]+ '~' + days[1]
	      console.log(this.queryData)
	    },
	    changeCompany (id) {
	    	console.log(id)
	      if(this.queryData.start === undefined || ''){
	      	this.queryData.start = this.reqBody2.start
		      this.queryData.end = this.reqBody2.end
		      this.queryData.daterangepicker = this.reqBody2.daterangepicker
	      }
	      this.queryData.id = id
	      this.queryData.siteId = id
	      this.queryData.cmsType = 'Site'
	      console.log(this.queryData)
	    },
	    queryFun () {
	      if(!this.queryData.id){this.queryData = this.reqBody2}
	      this.reqBody2 = this.queryData
	      this.$store.commit('SITE_SITEDATA', this.reqBody2)
	      this.$refs.queryChart.newParma()
	      this.queryCountry(this.reqBody2)
		    this.queryPagelist(this.reqBody2)
	    }
	  }
	}
</script>
