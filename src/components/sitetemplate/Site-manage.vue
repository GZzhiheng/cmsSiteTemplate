<style>
  h1, h2 {
    font-weight: normal;
  }
  .list-wrapper{
    height:20px;
  }
</style>
<template>
	<div>
		<Sitecrumbs :currentPage="this.currentPage">
			<div class="crumb-btns">
				<router-link to='/sitetemplate/site-addsite' style="background-image: url('./static/res/images/add-icon.png')">添加站点</router-link>
				<router-link to='/sitetemplate/site-draft' style="background-image: url('./static/res/images/draft.png')">草稿箱</router-link>
			</div>
		</Sitecrumbs>
		<Sitetable>
			<ul slot="theader" class="bbs">
			 	<li class="head-name">名称</li>
		        <li class="head-type">类型</li>
		        <li class="head-initial">初始域名</li>
		        <li class="head-official">正式域名</li>
		        <li class="head-client">所属客户</li>
		        <li class="head-state">状态</li>
		        <li class="head-onlineTime">上线时间</li>
		        <li class="head-updateTime">修改时间</li>
		        <li class="head-operation">操作</li>
			</ul>
			<ul slot="body" id="example-1" v-for="item in items">
				<li class="body-name"><a :href="$jurisdiction('2703')?'#/sitetemplate/site-edit?templateId='+item.templateId+'&siteId='+item.id:'javascript:;'"><span class="btn-icon btn-edit"></span>{{ item.name }}</a></li>
		        <li class="body-type"><a href="javascript:;" class="btn-icon" :class="item.type === 0?'btn-pc':'btn-phone'"></a></li>
		        <li class="body-initial"><a :href="'http://site-'+item.domain+'.networkgrand.com'" target="_blank">http://site-{{ item.domain }}.networkgrand.com</a></li>
		        <li class="body-official"><a :href="item.site === null?'javascript:;':item.site">{{item.site === null?'--':item.site}}</a></li>
		        <li class="body-client">{{ item.clientName }}</li>
		        <li class="body-state"><a href="javascript:;" class="btn-icon" :class="item.status === 2?'btn-issue':'btn-online'"></a></li>
		        <li class="body-onlineTime">
		        	{{ item.publishAt.split(' ')[0] }} <br/> {{ item.publishAt.split(' ')[1] }}
		        </li>
		        <li class="body-updateTime">
		        	{{ item.updateAt.split(' ')[0] }} <br/> {{ item.updateAt.split(' ')[1] }}
		        </li>
		        <li class="body-operation">
		        	<a href="javascript:;" class="btn-icon btn-inquiry" style="display: none"></a>
		        	<a href="javascript:;" class="btn-icon btn-flow" @click="siteData(item.id, item.name)"></a>
		        	<a href="javascript:;" class="btn-icon btn-relevance" @click="ctrOpen({open: true, type: 'bindSite',thisSite: item})" v-if="$jurisdiction('2705')"></a>
		        	<a href="javascript:;" class="btn-icon btn-rPhone" v-if="item.type === 'phone'"></a>
		        	<a href="javascript:;" class="btn-icon btn-copy" @click="ctrOpen({open: true, type: 'copySite',thisSite: item})"></a>
		        	<a href="javascript:;" class="btn-icon btn-del" @click="delSite(item.id)" v-if="$jurisdiction('2704')"></a>
		        </li>
			</ul>
      <div slot="search-head"></div>
      <div slot="inquiry-head"></div>
      <div slot="inquiry-body"></div>
    </Sitetable>
    <div class="page-ele">
      <Pagination :opt="pagination" @pageTurning="trunToPage"></Pagination>
    </div>
    <manageDialog :opentype='outOpen' @openFun='ctrOpen' :copyMsg1='copyMsg1' :copyMsg2='copyMsg2' :bindMsg='bindMsg' :autoBind2="autoBind" :maindata="siteDatas">
		  <div slot="copySite" v-if="copySite">
		  	<h4>复制站点 <button type="button" class="close" @click="ctrOpen({open: false, type: ''})">×</button></h4>
			<div class="scorllin">
				<div class="listContent">
					<div class="settings-list">
						<div class="list-text">
							源站点:
						</div>
						<div class="list-information">
							<span>{{currentSite}}</span>
						</div>
					</div>
					<div class="settings-list">
						<div class="list-text">
							<span style="color: red;vertical-align: middle;">* </span>站点名称:
						</div>
						<div class="list-information">
							<input type="text" v-model="copyMsg1"/>
						</div>
					</div>
					<div class="settings-list">
						<div class="list-text">
							<span style="color: red;vertical-align: middle;">* </span>二级域名:
						</div>
						<div class="list-information">
							<input type="text" v-model="copyMsg2"/>
						</div>
					</div>
				</div>
			</div>
		  </div>
		  <div slot="bindSite" v-if="bindSite">
		  	<h4>绑定域名 <button type="button" class="close"  @click="ctrOpen({open: false, type: ''})">×</button></h4>
		  	<div class="scorllin">
				<div class="listContent">
					<div class="settings-list">
						<div class="list-text">
							<span style="color: red;vertical-align: middle;">* </span>域名:
						</div>
						<div class="list-information">
							<input type="text" placeholder="域名" v-model="bindMsg"/>
						</div>
					</div>
					<div class="settings-list">
						<div class="list-text">
							<input type="checkbox" @click="sureAuto"/>
						</div>
						<div class="list-information">
							<span>自动绑定二级域名或www域名</span>
						</div>
					</div>
				</div>
			</div>
		  </div>
		</manageDialog>
  </div>
</template>

<script>
	import {sitedata} from '@/store/testData.js'
	import Sitecrumbs from './common/Site-crumbs'
	import Sitetable from './common/Site-table'
	import manageDialog from './common/manageDialog'
	import Pagination from './common/Pagination'

	export default {
	  name: 'hello',
	  data () {
	    return {
        currentPage: this.$route.name,
	      currentPageNum: 1,
	      outOpen: {open: false, type: ''},
	      copySite: false,
	      bindSite: false,
	      currentSite: '',
	      copyMsg1: '',
	      copyMsg2: '',
	      bindMsg: '',
	      siteDatas: {},
	      autoBind: false,
	      pagination:{index: 1 , size: 15, rowCount: 1}
	    }
	  },
	  computed: {
	  	items () {
	  	  return this.$store.state.sitetemplate.manageSite
	  	}
	  },
	  components: {
    Sitecrumbs, Sitetable, manageDialog, Pagination
	  },
	  mounted () {
	    this.$rest.get('/cms/rest/site/list', {index: this.pagination.index, size: this.pagination.size}).then(response => {
	      this.$store.commit('SITE_MANAGESITE', response.data.datas)
	      this.pagination.pageCount = response.data.pageCount
	      this.pagination.rowCount = response.data.rowCount
	      this.pagination.start = response.data.start
	    }, response => {
	      console.log('管理站点获取失败')
	    })
	    console.log('-------------------===')
	    console.log(this.$jurisdiction("3000"))
    },
	  methods: {
	  	trunToPage (page) {
      	console.log(page)
      	this.pagination.index = page
      	this.$rest.get('/cms/rest/site/list',{index: this.pagination.index, size: this.pagination.size}).then(response => {
	      	  this.$store.commit('SITE_MANAGESITE', response.data.datas)
		    }, response => {
		        console.log('管理站点获取失败')
		    })
	    },
	    siteData (siteId, name) {
	      this.$router.push('/sitetemplate/site-data?siteId='+siteId+'&name='+name)
	    },
	    delSite (id) {
	      this.$conf('是否确认删除？').then(() => this.$rest.post('/cms/rest/site/delete.do', {id: id}).then(() => this.loadSite()))
	    },
	    loadSite () {
	      this.$rest.get('/cms/rest/site/list').then(response => {
		      this.$store.commit('SITE_MANAGESITE', response.data.datas)
		    }, response => {
		      console.log('管理站点获取失败')
		    })
	    },
	    sureAuto (){
	      this.autoBind == true?this.autoBind = false:this.autoBind = true;
	    },
	    ctrOpen (objOpen){
	      this.copyMsg1 = ''
	      this.copyMsg2 = ''
	      this.autoBind = false
	      this.siteDatas = objOpen.thisSite
	      this.outOpen = objOpen
	      if(objOpen.type === 'copySite'){
	      	this.copySite = true
	      	this.bindSite = false
	        this.currentSite = objOpen.thisSite.name
	      } else if (objOpen.type === 'bindSite') {
	        this.bindSite = true
	        this.copySite = false
	        this.bindMsg = objOpen.thisSite.site
	      } else {
	      	this.copySite = false
	      	this.bindSite = false
	      }
	    }
	  }
	}
</script>
