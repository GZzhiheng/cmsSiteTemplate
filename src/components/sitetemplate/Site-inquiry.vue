<template>
  <div>
    <Sitecrumbs :currentPage="this.currentPage">
    	<div class="crumb-btns" v-show="currentPage === '询盘详情'">
        <el-select class="inquirySelect" v-model="selectedStatus" placeholder="请选择状态" @change="oneStatus(selectedStatus)" :clearable=true>
			    <el-option
			      v-for="item in statusCtr"
			      :key="item.status"
			      :label="item.msg"
			      :value="item.status">
			    </el-option>
			  </el-select>
        <a href="javascript:;" class="btn-goback" @click=" currentPage = '询盘列表' ">返回</a>
      </div>
    </Sitecrumbs>
    <Sitetable v-show="currentPage === '询盘列表'">
      <div slot="search-head">
        <div class="siteSearch">
          <span class="ssTitle">客户经理：</span>
          <el-select class="inquirySelect" v-model="selectedManage" placeholder="请在此选择客户经理" @change="selectManage(selectedManage)" :clearable=true>
				    <el-option
				      v-for="item in manageList"
				      :key="item.id"
				      :label="item.no + '/' + item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
          <div class="space-bar"></div>
          <span class="ssTitle">客户：</span>
		      <el-select v-model="selectedClient" placeholder="请在此选择客户" class="inquirySelect" :clearable=true>
				    <el-option
				      v-for="item in clientList"
				      :key="item.id"
				      :label="item.no + '/' + item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
          <div class="space-bar"></div>
          <span class="ssTitle">日期：</span>
          <el-date-picker
          	popper-class="date-pop-name"
			      v-model="dateArray"
			      type="daterange"
			      align="right"
			      unlink-panels
			      range-separator="~"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      format="yyyy-MM-dd"
			      value-format="yyyy-MM-dd"
			      :picker-options="pickerOptions2">
			    </el-date-picker>
          <div class="space-bar"></div>
          <div class="search-btn" @click="queryInquiry">查询</div>
          <div class="search-btn" @click="exportInquiry">导出</div>
          <div class="select-box right">
            <span class="ssTitle">更改询盘状态：</span>
            <el-select class="inquirySelect inquiry-status" v-model="status" placeholder="请选择状态" @change="changeStatus(status)" :clearable=true>
					    <el-option
					      v-for="item in statusCtr"
					      :key="item.status"
					      :label="item.msg"
					      :value="item.status">
					    </el-option>
					  </el-select>
          </div>
        </div>
      </div>
      <ul slot="inquiry-head" class="bbs row">
        <li class="inquiryhead-checkBox text-center"><input type="checkbox" :checked='selectAll' @click="checkedAll"></li>
        <li class="inquiryhead-content">询盘内容</li>
        <li class="inquiryhead-date">询盘日期</li>
        <li class="inquiryhead-client">客户名称</li>
        <li class="inquiryhead-site">站点</li>
        <li class="inquiryhead-email">询盘邮箱</li>
        <li class="inquiryhead-country text-center">国家</li>
        <li class="inquiryhead-state text-center">状态</li>
      </ul>
      <ul slot="inquiry-body" class="row" v-for="(item, index) in items" v-if="items.length">
      	<li class="inquirybody-checkBox text-center"><p><input type="checkbox" :checked='selectAll' @click="checkedThis(item.id)"></p></li>
      	<li class="inquirybody-content"><a href="javascript:;" @click="inquiryDetail(item)">{{item.messages}}</a></li>
      	<li class="inquirybody-date"><p>{{ item.created}}</p></li>
      	<li class="inquirybody-client"><p>{{item.clientName}}</p></li>
      	<li class="inquirybody-site"><p>{{item.requestWebSiteUrl}}</p></li>
      	<li class="inquirybody-email"><p>{{item.toemail}}</p></li>
      	<li class="inquirybody-country text-center">
      		<p><img :src="item.countryPic" :alt="item.country || '国家未知'" :title="item.country || '国家未知'"></p>
      	</li>
      	<li class="inquirybody-state text-center"><span :class="item.status === '1'?'btn-issue': 'btn-unissue'"></span></li>
      </ul>
      <div slot="theader"></div>
      <div slot="body"></div>
    </Sitetable>
    <div class="page-ele">
      <Pagination :opt="pagination" @pageTurning="trunToPage" v-if="items.length" v-show="currentPage === '询盘列表'"></Pagination>
    </div>
    <SiteinquiryDetail v-show="currentPage === '询盘详情'" :msg="inqDetail"></SiteinquiryDetail>
  </div>
</template>

<script>
  import Sitecrumbs from './common/Site-crumbs'
  import Sitetable from './common/Site-table'
  import Pagination from './common/Pagination'
  import SiteinquiryDetail from './Site-inquiryDetail'

  export default {
    name: 'hello',
    data () {
      return {
        currentPage: '询盘列表',
        selectedClient: '',
        clientList: [],
        selectedManage: '',
        manageList: [],
        dateArray: [],
        pagination: {index: 1 , size: 15, rowCount: 1},
        idArray: [],
        selectAll: false,
        status: '',
        selectedStatus: '',
        selectedOne: '',
        inqDetail: {},
        statusCtr: [{status:1, msg: '已回复'}, {status:2, msg: '未回复'}],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        items: []
      }
    },
    components: {
      Sitecrumbs, Sitetable, Pagination, SiteinquiryDetail
    },
    mounted () {
    	this.inquiryList()
    },
    methods: {
    	inquiryList () {
    		this.$rest.get('/enquiry/rest/getClientMgrList').then(response => {
    			this.clientList = response.data.clients
    			this.manageList = response.data.users
    			console.log(response)
		    }, response => {
		      console.log('用户获取失败')
		    })
    	},
    	selectManage (id) {
    		this.$rest.get('/clientmgr/rest/client/listUserClient', {userId: id}).then(response => {
    			this.clientList = response.data
		    }, response => {
		      console.log('筛选经理失败')
		    })
    	},
    	queryInquiry () {
    		let params = this.checkParams()
    		if (params === '') {return}
    		console.log(params)
    		this.$rest.get('/enquiry/rest/list', params).then(response => {
    			this.items = response.data.resultList
    			this.pagination.rowCount = response.data.totalRows
		    }, response => {
		      console.log('筛选经理失败')
		    })
    		this.selectAll = false
				this.idArray = []
    	},
    	exportInquiry () {
    		let params = this.checkParams()
    		if (params === '') {return}
    		console.log(params)
    		window.open('/enquiry/rest/export.do?clientId='+params.clientId+'&clientMgrId='+params.clientMgrId+'&startDate='+params.startDate+'&endDate='+params.endDate)
    	},
    	trunToPage (page) {
    		console.log(page)
    		this.pagination.index = page.index
    		let params = this.checkParams()
    		this.$rest.get('/enquiry/rest/list', params).then(response => {
	      	  this.items = response.data.resultList
    				this.pagination.rowCount = response.data.totalRows
		    })
    	},
    	checkParams () {
    		let params = {index:this.pagination.index, size: this.pagination.size, clientId:'', clientMgrId:'', startDate:'', endDate:''}
    		params.clientId = this.selectedClient
    		params.clientMgrId = this.selectedManage
    		this.dateArray = this.dateArray || []
    		params.startDate = this.dateArray[0] || ''
    		params.endDate = this.dateArray[1] || ''
				if (params.startDate === undefined || params.startDate === '') {
					this.$tip('请选择日期', 'warning')
					return ''
				}
				return params
    	},
    	checkedAll () {
    		if (this.selectAll){
    			this.selectAll = false
    			this.idArray = []
    		} else {
    			this.selectAll = true
    			this.idArray = []
    			for (let i=0; i<this.items.length; i++){
    				this.idArray.push(this.items[i].id)
    			}
    		}
    		console.log(this.selectAll)
    		console.log(this.idArray)
    	},
    	checkedThis (num) {
    		let aa = [1,2,3,4]
    		for(let i=0; i<this.idArray.length; i++){
    			if (this.idArray[i] == num) {
    				this.idArray.splice(i,1)
    				console.log(this.idArray)
    				return
    			}
    		}
    		this.idArray.push(num)
    		console.log(this.idArray)
    	},
    	changeStatus (msg) {
    		if(this.status === ""){
    			return
    		} else {
    			if (this.idArray.length === 0) {
	    			this.$tip('请选择指定询盘', 'warning')
	    			this.status = ''
	    			return
	    		} else {
	    			let strId = this.idArray.join(',')
	    			this.$rest.post('/enquiry/rest/updateStatus', {ids: strId, status: this.status}).then(response => {
	    				this.$tip('更改状态成功', 'success')
	    				this.queryInquiry ()
				    })
	    			this.selectAll = false
	    			this.idArray = []
	    		}
    		}
    		this.status = ''
    	},
    	inquiryDetail (inquiryMsg) {
    		this.currentPage = '询盘详情'
    		console.log(inquiryMsg)
    		this.inqDetail = inquiryMsg
    		this.selectedStatus = inquiryMsg.status === 1?'已回复':'未回复'
    		this.selectedOne = inquiryMsg.id
    	},
    	oneStatus (newStatus) {
    		console.log(newStatus)
    		this.$rest.post('/enquiry/rest/updateStatus', {ids: this.selectedOne, status: newStatus}).then(response => {
				  this.$tip('更改状态成功', 'success')
				  this.queryInquiry ()
		    })
    	}
    }
  }
</script>

<style>
  h1, h2 {
    font-weight: normal;
  }
  .list-wrapper{
    height:20px;
  }
  /*！！*/
  .siteSearch{
    margin: 10px 15px;
    padding: 15px 20px;
    background-color: #fff;
    border-radius: 5px;
    min-width: 1366px;
  }
  .ssTitle{
    font-size: 12px;
    color: #33c0cc;
    margin-right: 2px;
  }
  .space-bar{
    display: inline-block;
    margin: 0 8px;
    width:1px;
    height: 30px;
    vertical-align: middle;;
    background-color: #ccc;
  }
  .search-btn{
    display: inline-block;
    padding: 5px 20px;
    font-size: 12px;
    color: #33c0cc;
    border: 1px solid #33c0cc;
    border-radius: 3px;
    cursor: pointer;
  }
  .search-btn:hover{
    color: #fff;
    background-color: #33c0cc;
  }
  .companysearch.last{
    width:100px;
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
  .select-box.right{
    display: inline-block;
  }
  .inquirySelect{
		display: inline-block;
    position: relative;
    margin: 0;
    width: 250px;
  }
  .inquirySelect .el-input__inner{
  	height: 30px;
  }

  .manage-bottom{
    margin: -20px  15px 10px 15px;
  	background-color: #fff;
  	border-bottom-left-radius: 3px;
  	border-bottom-right-radius: 3px;
    min-width: 1099px;
  }
	@media (max-width: 1366px) {
		.inquirySelect{
			width: 6%;
		}
		.inquiry-status{
			width: 40%;
		}
	}
	@media (min-width: 1367px) and (max-width: 1652px) {
		.inquirySelect{
			width: 10%;
		}
		.inquiry-status{
			width: 40%;
		}
	}
	@media (min-width: 1653px) and (max-width: 1865px) {
		.inquirySelect{
			width: 13%;
		}
	}
	.inquiry-status{
		width: 50%;
	}
  /****日期组件样式****/
  .companydate .el-input__inner{border: none;height: 20px;padding: 0;cursor: pointer;width: 300px;}
  .el-range-separator{margin-right: 10px;}
  .el-date-editor--daterange .el-range__icon{margin: 0;line-height: 24px;}
  .el-range__icon:before{content: "\e608";}
  .el-input__inner .el-range-separator{line-height: 23px;color: #999;}
  .el-input__inner .el-range-input{cursor: pointer;}
  .date-pop-name .el-date-editor .el-input{width: 100%}
  /*.date-pop-name{left: 955px !important;width: 626px !important;}*/
  /*.date-pop-name .popper__arrow{left: 160px !important;}*/
  .date-pop-name .el-picker-panel__shortcut:hover{color: #00aabb;}
  .date-pop-name .el-date-table td.available:hover{color: #00aabb;}
  .date-pop-name .el-input__inner{border: none;padding: 0;height: 20px}
  .date-pop-name .el-date-table td.in-range{background-color: #fff;}
  .date-pop-name .el-date-table td div{height: 28px; padding: 2px 0;}
  .date-pop-name .el-date-table td.in-range>div{background-color: #ccf3f7;}
  .date-pop-name .el-date-table td.today span{color: #33c0cc;}
  .date-pop-name .el-date-table .end-date span:active{color: #fff;}
  .date-pop-name .el-date-table .end-date span:hover{color: #fff;}
  .el-date-table td.today.end-date span, .el-date-table td.today.start-date span{color: #fff;}
  .date-pop-name .el-icon-arrow-left::before{content: "\e600"}
  .date-pop-name .el-icon-d-arrow-left::before{content: "\e610"}
  .date-pop-name .el-icon-d-arrow-right::before{content: "\e613"}
  .el-range-editor.is-active, .el-range-editor:hover{
  	border-color: #33c0cc !important;
  }
  .el-select .el-input.is-focus .el-input__inner,
  .el-select .el-input .el-input__inner:hover{
  	border-color: #33c0cc !important;
  }
</style>
