<style>
  .site-manage-content {
    margin: 10px 15px;
    background-color: #fff;
    border-radius: 3px;
    min-width: 1099px;
  }

  .site-manage-content .manage-body {
    margin: 0;
    background-color: #fff;
    border-radius: 3px;
    min-width: 1099px;
    margin-bottom: 15px;
  }
  
  .site-manage-content .body-initial-drafts{
  	word-break: break-all;
  	overflow: hidden;
  	height: 100%;
  }
</style>
<template>
  <div>
    <Sitecrumbs :currentPage="this.currentPage">
    	<div class="crumb-btns">
				<router-link to='/sitetemplate/site-addsite' style="background-image: url('./static/res/images/add-icon.png')">添加站点</router-link>
				<router-link to='/sitetemplate/site-manage' style="background-image: url('./static/res/images/release.png')">已发布</router-link>
			</div>
    </Sitecrumbs>
    <div class="site-manage-content">
      <Sitetable>
        <div slot="inquiry-head"></div>
        <div slot="inquiry-body"></div>
        <div slot="search-head"></div>
        <ul slot="theader" class="bbs">
          <li class="head-name">名称</li>
          <li class="head-type">类型</li>
          <li class="head-initial-drafts">初始域名</li>
          <li class="head-client">所属客户</li>
          <li class="head-state">状态</li>
          <li class="head-updateTime">修改时间</li>
          <li class="head-operation">操作</li>
        </ul>
        <ul slot="body" v-for="item in items">
          <li class="body-name"><a
            :href="'#/sitetemplate/site-edit?templateId='+item.templateId+'&siteId='+item.id"><span
            class="btn-icon btn-edit"></span>{{ item.name }}</a></li>
          <li class="body-type"><a href="javascript:;" class="btn-icon"
                                   :class="item.type === 0?'btn-pc':'btn-phone'"></a></li>
          <li class="body-initial-drafts">
          	<!--<a :href="'http://site-'+item.domain+'.networkgrand.com'" target="_blank">-->
          		http://site-{{ item.domain }}.networkgrand.com
          	<!--</a>-->
          </li>
          <li class="body-client">{{ item.clientName }}</li>
          <li class="body-state"><a href="" class="btn-icon" :class="item.status === 2?'btn-issue':'btn-draft'"></a>
          </li>
          <li class="body-updateTime">
          	{{ item.updateAt.split(' ')[0] }} <br/> {{ item.updateAt.split(' ')[1] }}
          </li>
          <li class="body-operation">
            <router-link to='/sitetemplate/site-settings' class="btn-icon btn-inquiry"
                         style="display: none"></router-link>
            <a href="javascript:;" class="btn-icon btn-flow" style="display: none"></a>
            <a href="javascript:;" class="btn-icon btn-relevance"
               @click="ctrOpen({open: true, type: 'bindSite',thisSite: item})"></a>
            <a href="javascript:;" class="btn-icon btn-rPhone" v-if="item.type === 'phone'"></a>
            <a href="javascript:;" class="btn-icon btn-copy"
               @click="ctrOpen({open: true, type: 'copySite',thisSite: item})"></a>
            <a href="javascript:;" class="btn-icon btn-del" @click="delSite (item.id)"></a>
          </li>
        </ul>
      </Sitetable>
      <div class="page-ele">
        <Pagination :opt="pagination" @pageTurning="trunToPage"></Pagination>
      </div>
    </div>
    <manageDialog :opentype='outOpen' @openFun='ctrOpen' :copyMsg1='copyMsg1' :copyMsg2='copyMsg2' :bindMsg='bindMsg'
                  :autoBind2="autoBind" :maindata="siteDatas">
      <div slot="copySite" v-if="copySite">
        <h4>复制站点
          <button type="button" class="close" @click="ctrOpen({open: false, type: ''})">×</button>
        </h4>
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
                <input type="text" v-model:value="copyMsg1"/>
              </div>
            </div>
            <div class="settings-list">
              <div class="list-text">
                <span style="color: red;vertical-align: middle;">* </span>二级域名:
              </div>
              <div class="list-information">
                <input type="text" v-model:value="copyMsg2"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="bindSite" v-if="bindSite">
        <h4>绑定域名
          <button type="button" class="close" @click="ctrOpen({open: false, type: ''})">×</button>
        </h4>
        <div class="scorllin">
          <div class="listContent">
            <div class="settings-list">
              <div class="list-text">
                <span style="color: red;vertical-align: middle;">* </span>域名:
              </div>
              <div class="list-information">
                <input type="text" placeholder="域名" v-model:value="bindMsg"/>
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
  import Sitecrumbs from './common/Site-crumbs'
  import Sitetable from './common/Site-table'
  import manageDialog from './common/manageDialog'
  import Pagination from './common/Pagination'

  export default {
    data () {
      return {
        currentPageNum: 1,
        copyMsg1: '',
        copyMsg2: '',
        bindMsg: '',
        autoBind: false,
        bindSite: false,
        copySite: false,
        siteDatas: {},
        outOpen: {open: false, type: ''},
        visible2: true,
        currentPage: this.$route.name,
        items: [],
        pagination:{index: 1 , size: 15, rowCount: 1}
      }
    },
    components: {
      Sitecrumbs, Sitetable, manageDialog, Pagination
    },
    mounted () {
      this.$rest.get('/cms/rest/site/draft/list',{index: this.pagination.index, size: this.pagination.size}).then(response => {
        console.log('草稿箱请求成功')
        console.log(response.data)
        this.items = response.data.datas
        this.pagination.rowCount = response.data.rowCount
      }, response => {
        console.log('draft fail')
      })
    },
    methods: {
      trunToPage (page) {
      	console.log(page)
      	this.pagination.index = page.index
      	this.$rest.get('/cms/rest/site/draft/list',{index: this.pagination.index, size: this.pagination.size}).then(response => {
	        console.log('草稿箱请求成功')
	        console.log(response.data)
	        this.items = response.data.datas
	      }, response => {
	        console.log('draft fail')
	      })
      },
      delSite (id) {
        this.$conf('是否确认删除？').then(() => this.$rest.post('/cms/rest/site/delete.do', {id: id}).then(() => this.loadDraft()))
      },
      loadDraft () {
        this.$rest.get('/cms/rest/site/draft/list').then(response => {
          console.log('草稿箱请求成功')
          console.log(response.data)
          this.items = response.data.datas
        }, response => {
          console.log('draft fail')
        })
      },
      sureAuto () {
        this.autoBind == true ? this.autoBind = false : this.autoBind = true
      },
      ctrOpen (objOpen) {
        this.copyMsg1 = ''
        this.copyMsg2 = ''
        this.bindMsg = ''
        this.autoBind = false
        this.siteDatas = objOpen.thisSite
        this.outOpen = objOpen
        if (objOpen.type === 'copySite') {
          this.copySite = true
          this.bindSite = false
        } else if (objOpen.type === 'bindSite') {
          this.bindSite = true
          this.copySite = false
        } else {
          this.copySite = false
          this.bindSite = false
        }
        if (objOpen.thisSite.name) { this.currentSite = objOpen.thisSite.name}
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      }
    }
  }
</script>
