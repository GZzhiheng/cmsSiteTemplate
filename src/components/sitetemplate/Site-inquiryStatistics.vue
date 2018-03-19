<template>
  <div>
    <Sitecrumbs :currentPage="this.currentPage"></Sitecrumbs>
    <Sitetable>
      <div slot="search-head">
        <div class="siteSearch">
          <span class="ssTitle">客户经理：</span>
          <el-select class="countSelect" v-model="selectedManage" placeholder="请在此选择客户经理" @change="selectManage(selectedManage)" :clearable=true>
				    <el-option
				      v-for="item in manageList"
				      :key="item.id"
				      :label="item.no + '/' + item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
          <div class="space-bar"></div>
          <span class="ssTitle">客户：</span>
          <el-select v-model="selectedClient" placeholder="请在此选择客户" class="countSelect" :clearable=true>
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
			      v-model="dateArray"
			      type="daterange"
			      align="right"
			      unlink-panels
			      range-separator="~"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      format="yyyy-MM-dd"
			      value-format="yyyy-MM-dd"
            popper-class="date-pop-name"
			      :picker-options="pickerOptions2">
			    </el-date-picker>
          <div class="space-bar"></div>
          <div class="search-btn" @click="queryInquiry">查询</div>
        </div>
      </div>
      <ul slot="inquiry-head" class="bbs row">
        <li class="inquiryhead-num text-center"><p>序号</p></li>
        <li class="inquiryhead-clientManager"><p>客户经理</p></li>
        <li class="inquiryhead-clientName"><p>客户名称</p></li>
        <li class="inquiryhead-inquiryNum"><p>询盘数</p></li>
      </ul>
      <ul slot="inquiry-body" class="row" v-for="(item, index) in items">
        <li class="inquirybody-num text-center"><p>{{(index + 1)}}</p></li>
        <li class="inquirybody-clientManager"><p>{{item.mgrName}}</p></li>
        <li class="inquirybody-clientName"><p>{{item.clientName}}</p></li>
        <li class="inquirybody-inquiryNum"><p>{{item.total}}</p></li>
      </ul>
      <ul>
        <li class="inquirybody-num text-center"><p></p></li>
        <li class="inquirybody-clientManager"><p></p></li>
        <li class="inquirybody-clientName"><p>合计</p></li>
        <li class="inquirybody-inquiryNum"><p>{{items.total}}</p></li>
      </ul>
      <div slot="theader"></div>
      <div slot="body"></div>
    </Sitetable>
    <div class="page-ele">
      <Pagination :opt="pagination" @pageTurning="trunToPage" v-if="items.length"></Pagination>
    </div>
  </div>
</template>

<script>
  import Sitecrumbs from './common/Site-crumbs'
  import Sitetable from './common/Site-table'
  import Pagination from './common/Pagination'

  export default {
    name: 'hello',
    data () {
      return {
        currentPage: this.$route.name,
        selectedManage: '',
        selectedClient: '',
        manageList: [],
        clientList: [],
        dateArray: [],
        pagination: {index: 1 , size: 10, rowCount: 1},
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
        items: [],
        items2: [
          {no: '1', message: 'Aenean placerat, lacus sit amet posuere varius, odio dui eleifend felis, in porttitor metus enim id sapien. Sed iaculis urna ut sollicitudin posuere.', date: '2017-08-04', manager: '经理1', customer: '测试', inquirynum: '345', devSite: 'http://site-chana.networkgrand.com', email: 'xiaobei.li@yangxiechegn.com', country: '--', state: '未回复'},
          {no: '2', message: 'Posuere varius, odio dui eleifend felis, in porttitor metus enim id sapien. Sed iaculis urna ut sollicitudin posuereit amet posuere varius, odio dui eleifend felis, in ...', date: '2017-08-04', manager: '经理2', customer: '北京小米科技有限责任公司', inquirynum: '345', devSite: 'http://site-chana.networkgrand.com', email: 'michael@ylbs.com.cn', country: '--', state: '已回复'},
          {no: '3', message: 'Enim id sapien. Sed iaculis urna ut sollicitudin posuereit amet posuere varius, odio dui eleifend felis, Aenean placerat, lacus sit amet posuere varius, odio dui eleif...', date: '2017-08-04', manager: '经理3', customer: '中国平安保险（集团）股份有限公司', inquirynum: '345', devSite: 'http://site-srrco.networkgrand.com', email: 'michael@ylbs.com.cn', country: '--', state: '未回复'},
          {no: '4', message: 'Aenean placerat, lacus sit amet posuere varius, odio dui eleifend felis, in porttitor metus enim id sapien. Sed iaculis urna ut sollicitudin posuere.', date: '2017-08-04', manager: '经理4', customer: '深圳前海易联科技有限公司', inquirynum: '345', devSite: 'http://site-chana.networkgrand.com', email: 'xiaobei.li@yangxiechegn.com', country: '--', state: '已回复'},
          {no: '5', message: 'Posuere varius, odio dui eleifend felis, in porttitor metus enim id sapien. Sed iaculis urna ut sollicitudin posuereit amet posuere varius, odio dui eleifend felis, in ...', date: '2017-08-04', manager: '经理5', customer: '台湾联发科技股份有限公司', inquirynum: '345', devSite: 'http://m.yiliansz.com/', email: 'xiaobei.li@yangxiechegn.com', country: '--', state: '未回复'},
          {no: '6', message: 'Enim id sapien. Sed iaculis urna ut sollicitudin posuereit amet posuere varius, odio dui eleifend felis, Aenean placerat, lacus sit amet posuere varius, odio dui eleif...', date: '2017-08-04', manager: '经理6', customer: '正式模板', inquirynum: '345', devSite: 'http://site-chana.networkgrand.com', email: 'michael@ylbs.com.cn', country: '--', state: '已回复'},
          {no: '7', message: 'Aenean placerat, lacus sit amet posuere varius, odio dui eleifend felis, in porttitor metus enim id sapien. Sed iaculis urna ut sollicitudin posuere.', date: '2017-08-04', manager: '经理7', customer: '中国平安保险（集团）股份有限公司', inquirynum: '345', devSite: 'http://site-chana.networkgrand.com', email: 'xiaobei.li@yangxiechegn.com', country: '--', state: '未回复'},
          {no: '8', message: 'Posuere varius, odio dui eleifend felis, in porttitor metus enim id sapien. Sed iaculis urna ut sollicitudin posuereit amet posuere varius, odio dui eleifend felis, in ...', date: '2017-08-04', manager: '经理8', customer: '长安跨越', inquirynum: '345', devSite: 'http://site-chana.networkgrand.com', email: 'xiaobei.li@yangxiechegn.com', country: '--', state: '未回复'}
        ]
      }
    },
    components: {
      Sitecrumbs, Sitetable, Pagination
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
    		this.$rest.get('/enquiry/rest/statistics/list', params).then(response => {
    			this.items = response.data.resultList
    			this.pagination.rowCount = response.data.totalRows
		    }, response => {
		      console.log('筛选经理失败')
		    })
    		this.selectAll = false
				this.idArray = []
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
    	trunToPage (page) {
    		console.log(page)
    		this.pagination.index = page.index
    		let params = this.checkParams()
    		this.$rest.get('/enquiry/rest/statistics/list', params).then(response => {
	      	  this.items = response.data.resultList
    				this.pagination.rowCount = response.data.totalRows
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
    border-radius: 5px;
    cursor: pointer;
  }
  .search-btn:hover{
    color: #fff;
    background-color: #33c0cc;
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
  .countSelect{
		display: inline-block;
    position: relative;
    margin: 0;
    width: 265px;
  }
  .countSelect .el-input__inner{
  	height: 30px;
    margin-left: 10px;
    width: 250px;
  }
  .countDatapicker{
  	height: 30px;
  }
  .countDatapicker .el-input__inner{
  	line-height: 24px;
  }
  .countDatapicker .el-range-separator, .countDatapicker .el-range__icon, .countDatapicker .el-range__close-icon{
  	display: inline;
  	line-height: 24px;
  }
  .manage-bottom{
    margin: -20px  15px 10px 15px;
  	background-color: #fff;
  	border-bottom-left-radius: 3px;
  	border-bottom-right-radius: 3px;
    min-width: 1099px;
    padding-top: 40px;
  }
  .row p{text-align: left;}
</style>
