<template>
	<div>
		<div v-if="comp === 'Sitesettings'">
			<Sitecrumbs :currentPage="this.currentPage"></Sitecrumbs>
			<div class="select-content">
				<div class="sites-box">
					<div class="sites-list">
						<div class="site-row">
							<EasyScrollbar :barOption="sitesListScrollbar">
								<div id="wrapper" class="scrollbar-box-height"
									><div class="box-out" @click="openUpload" v-if="$jurisdiction('2802')">
										<div class="site-box" style="width:190px;height:270px;background: #eee url('/static/res/images/cms/page-addBtnImg.png') no-repeat center;box-shadow: none;">
										</div>
									</div
									><div class="box-out" v-for="site in site_list">
										<div class="site-box" style="box-shadow: none;">
											<img :src="site.smallImageUrl">
											<div class="site-confirm">
												<div class="sList-btn">
													<span @click="editTemplate(site.id)" style="background-color: #32C0CC" v-if="$jurisdiction('2803')">编辑</span>
													<span @click='deleteTemplate(site.id)' v-if="$jurisdiction('2804')">删除</span>
												</div>
												<p><span>NO.</span>{{ site.name }}</p>
											</div>
										</div>
									</div>
								</div>
							</EasyScrollbar>
              <div class="page-ele">
							  <Pagination :opt="pageOpt" @pageTurning="turnPage"></Pagination>
              </div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Sitetemplate @changeComponent='changeView' v-if="comp === 'editList'"></Sitetemplate>
		<el-dialog custom-class="updata-model-dialog" title="上传模板" :visible.sync="uploadTemplate">
			<div class="menuList templateList">
				<ul class="menuRow">
			        <li class=""><span class="mold-red">*</span>模版名称： </li>
			        <li class=""><input class="form-control" type="text" v-model="industry.name" placeholder="请输入模板名称"/></li>
			    </ul>
			    <ul class="menuRow">
			        <li class=""><span class="mold-red">*</span>模版类型： </li>
			        <li>
			          <el-select v-model="tType" placeholder="请选择模板类型" popper-class="model-list-select">
                  <option value="请选择模板类型" style="color: #878787;margin-left: 15px;font-size: 12px;height: 30px;line-height: 28px;">请选择模板类型</option>
			            <el-option
			              v-for="page in templateType"
			              :key="page.type"
			              :label="page.name"
			              :value="page.type">
			            </el-option>
			          </el-select>
			        </li>
			    </ul>
			    <ul class="menuRow">
			        <li class=""><span class="mold-red">*</span>行业分类： </li>
			        <li class="form-trade">
		                <span class="form-trade-up"></span>
		                <input class="form-control" type="text" @click="industryDialog = true" :value="industry.selected" placeholder="请选择行业类型"/>
		            </li>
			    </ul>
			    <ul class="menuRow">
			        <li class="">模板预览地址： </li>
			        <li class="form-trade">
		                <input class="form-control" type="text" v-model="previewUrl"/>
		            </li>
			    </ul>
			    <ul class="menuRow">
			    	<li>
			    		<button type="button" class="updata-flie-bottom" @click="$refs.uploadFile.click()"><span>{{fileName}}</span></button>
			    		<input @change="uploadAttachment($event)" type="file" ref="uploadFile" style="display:none"/>
			    	</li>
			    </ul>
		   </div>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="quitUpload">取 消</el-button>
			    <el-button type="primary" @click="commitTemplate">下一步</el-button>
			</div>
		</el-dialog>
		<el-dialog custom-class="trade-list" title="请选择行业分类" :visible.sync="industryDialog">
			<el-tree :data="industryList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="industryDialog = false">取 消</el-button>
			    <el-button type="primary" @click="industryDialog = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Sitecrumbs from './common/Site-crumbs'
	import Pagination from './common/Pagination'
	import Sitetemplate from './Site-templateEdit'
	import uploadFile from './common/sitesedit/Site-file.vue'

	export default{
	  data () {
	    return {
	      currentPage: this.$route.name,
	      comp: 'Sitesettings',
	      uploadTemplate: false,
	      queryUrl: '/cms/rest/siteTemplate/list',
	      screenHeight: document.body.screenHeight,
	      site_list: [],
	      pageOpt: {index: 1, size: 9, rowCount: 1},
	      tType: '',
	      templateType: [{type: 0, name: 'PC'}, {type: 1, name: '手机'}, {type: 2, name: '通用'}],
	      industryDialog: false,
	      industryList: [],
	      industry: {name: '', selected: '', categoryId: ''},
	      templateFile: '',
	      previewUrl: '',
	      fileName: '选择模版文件 + ',
	      defaultProps: {
	        children: 'subCategorys',
	        label: 'cnName'
	      },
	      sitesListScrollbar: {
	        barColor: '#33c0cc',
	        barWidth: 10,
	        railColor: '#f0f0f0',
	        barMarginRight: 33,
	        barOpacityMin: 0.5,
	        zIndex: 'auto',
	        autohidemode: true
	      }
	    }
	  },
	  mounted () {
	    this.changescrollbarHeight()
        this.modelList()
	    const that = this
	    window.onresize = () => {
	      return (() => {
	        window.screenHeight = document.body.clientHeight
	        that.screenHeight = window.screenHeight
	      })()
	    }
	  },
	  methods: {
	  	turnPage (params) {
	  		console.log(params)
		  	this.$rest.post(this.queryUrl, {index: params.index, size: params.size, industryCategoryId: ''}).then(response => {
	          this.site_list = response.data.datas
	          this.pageOpt = {index: params.index, rowCount: response.data.rowCount, size: pageOpt.size}
	          }, response => {
	            console.log('下一页请求失败')
	        })
	  	},
	    modelList () {
	        this.$rest.post(this.queryUrl, {index: 1, size: 8, industryCategoryId: ''}).then(response => {
	          console.log('网站模板获取成功')
	          console.log(response.data)
	          this.site_list = response.data.datas
	          this.pageOpt.index = 1
	          this.pageOpt.rowCount = response.data.rowCount
	        }, response => {
	          console.log('addsites fail')
	        })
	    },
	    changescrollbarHeight () {
	      var clientHeight = document.body.clientHeight
	      var scrollbarHeight = document.getElementsByClassName('scrollbar-box-height')
	      var siteCrumbs = document.getElementsByClassName('site-crumbs')[0].offsetHeight
	      var topNav = document.getElementsByClassName('top-nav')[0].offsetHeight
	      for (var i = 0; i < scrollbarHeight.length; i++) {
	        // 距离底部50px,115是部分padding和margin
	        scrollbarHeight[i].style.height = (clientHeight - siteCrumbs - topNav - 115 - 50) + 'px'
	      }
	    },
	    editTemplate (id) {
	    	this.$router.push({query: { templateId: id }})
	    	this.comp = 'editList'
	    },
	    deleteTemplate (id) {
	    	console.log(id)
	    	this.$conf('是否确认删除？').then(() => this.$rest.post('/cms/rest/siteTemplate/delete.do', {id: id}).then(() => {
	    		this.$tip('删除成功', 'success')
	    		this.modelList()
	    	}))
	    	console.log('deleteClick')
	    },
	    changeView (msg) {
	    	this.comp = msg
	    },
	    handleNodeClick(data) {
	        console.log(data);
	        if(data.type === "3"){
	        	console.log(3)
	        	this.industry.categoryId = data.id
	        	this.industry.selected = data.cnName
	        	this.industryDialog = false
	        } else {
	        	console.log('not')
	        }
	    },
	    uploadAttachment(e) {
	        this.templateFile = e.target.files[0]
	        this.fileName = e.target.files.length === 1? e.target.files[0].name : '选择模版文件 + '
	    },
	    openUpload () {
	    	this.uploadTemplate = true;
	    	if (this.industryList.length === 0){
	    		this.$rest.post('/cms/rest/common/chooseCategory.do').then(res => {
		    		this.industryList = res.data.categoryList
		    	})
	    	}
	    },
	    quitUpload () {
	    	this.uploadTemplate = false
    		this.industry.name = ''
    		this.tType = ''
    		this.industry.categoryId = ''
    		this.industry.selected = ''
    		this.templateFile = ''
    		this.previewUrl = ''
	    },
	    commitTemplate () {
	    	console.log('提交模板')
	    	if (this.industry.name === "") {
	    		this.$tip('请填写模板名称', 'warning')
	    		return
	    	} else if (this.tType === "") {
	    		this.$tip('请选择模板类型', 'warning')
	    		return
	    	} else if (this.industry.categoryId === "") {
	    		this.$tip('请选择行业', 'warning')
	    		return
	    	} else if (this.templateFile === "") {
	    		this.$tip('请选择模板', 'warning')
	    		return
	    	}
	    	var data = new FormData()
	    	data.append('name', this.industry.name)
	    	data.append('type', this.tType)
	    	data.append('industryCategoryId', this.industry.categoryId)
	    	data.append('previewUrl', this.previewUrl)
	    	data.append('file', this.templateFile)
	    	this.$rest.post('/cms/rest/siteTemplate/create.do', data).then(res => {
	    		this.$tip('上传模板成功', 'success')
	    		this.quitUpload()
	    		this.modelList()
	    	})
	    }
	  },
	  watch: {
	    screenHeight (val) {
	      if (!this.timer) {
	        this.screenHeight = val
	        this.timer = true
	        let that = this
	        setTimeout(function () {
	          that.changescrollbarHeight()
	          that.timer = false
	        }, 1000)
	      }
	    }
	  },
	  components: {Sitecrumbs, Pagination, Sitetemplate, uploadFile}
	}
</script>

<style>
  [v-clock]{color: orange;}
	.select-content{
		display: flex;
		display: -webkit-flex;
		margin: 10px 20px 0 20px;
		min-width: 1084px;
	}
	.sites-box{
		flex: 1;
		margin-left:20px;
	}
	.sites-header>div{
		position: relative;
		display: inline-block;
		padding: 7px 0;
		width: 49%;
		text-align: center;
		font-size: 16px;
		font-weight: bold;
		font-family: "microsoft yahei";
		color: #33c0cc;
		background-color: #fff;
		border-radius: 4px;
		cursor: pointer;
	}
	.sites-header>div img{
		margin-right: 8px;
		vertical-align: -5px;
	}
	.sites-header .c-open{
		position: absolute;
		width: 100%;
		height:30px;
		background-color: #fff;
		opacity: 0;
	}
	.sites-header>div.active .c-open{
		opacity: 1;
	}
	.sites-header .pc-btn{
		margin-right: 2%;
	}
	.sites-list{
		padding: 25px 25px 15px 25px;
		background-color: #fff;
		border-radius: 5px;
	}
	.sites-list .site-row{
		margin-left: -12px;
		margin-right: -12px;
	}
	.sites-list .box-out{
		margin-bottom: 24px;
		display: inline-block;
		padding: 0 12px;
		vertical-align: middle;
	}
	.sites-list .site-box{
		position: relative;
		box-shadow: 0 0 8px #333;
		cursor: pointer;
	}
	.sites-list .site-box img{
		width: 190px;
		height: 270px;
	}
	.sites-list .site-box .site-confirm{
		visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height:100%;
		background-color: rgba(0,0,0,0.6);
		opacity: 0;
		transition: opacity .5s;
		-ms-transition: opacity .5s;
		-moz-transition: opacity .5s;
		-webkit-transition: opacity .5s;
	}
	.sites-list .site-box:hover .site-confirm{
		visibility: visible;
		opacity: 1;
	}
	.sites-list .site-confirm p{
		position: absolute;
		bottom: 0;
		width: 100%;
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		color: #fff;
	}
	.sites-list .site-confirm p span{
		color: #33c0cc;
	}
	.sites-list .site-confirm .sList-btn{
		position: absolute;
		top: 50%;
		margin-top: -65px;
		width: 100%;
	}
	.sites-list .sList-btn span{
		display: block;
		margin: 15px auto;
		width: 75px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #fff;
		border-radius: 5px;
		background-color: #FF9934;
		text-align: center;
		cursor: pointer;
	}
	.sites-list .sList-btn span:hover{
		color: #fff;
		background-color: #FF9934;
	}
	.sites-list .esay-scrollbar__bar.is-vertical{
		margin: 5% 0;
	}
	.templateList .menuRow {
	    display: block;
	    width: 80%;
	    margin: 0 auto;;
	}
	.templateList .menuRow:before, .menuRow:after {
	    content: '';
	    display: block;
	}
	.templateList .menuRow:after {
	    clear: both;
	}
	.templateList .menuRow > li {
	    float: left;
	    line-height: 34px;
	    margin: 7px 0;
	}
	.templateList .menuRow > li.form-control {
	    border-radius: 3px;
	}
	.templateList .menuRow > li:first-child {
	    width: 20%;
      padding-right: 5px;
	    text-align: right;
	}
	.templateList .menuRow > li:last-child {
	    width: 80%;
	    text-align: left;
	}
	.templateList .el-select{
		width: 100%;
	}
  .mold-red{font-size: 14px;line-height: 24px;margin-right: 4px;color: red;}

  /**占位符**/
  .el-dialog__wrapper .el-dialog.updata-model-dialog .el-dialog__body .templateList input::-webkit-input-placeholder {color: #878787;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body .templateList input::-moz-placeholder {color: #878787;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body .templateList input:-ms-input-placeholder {color: #878787;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body .templateList input::placeholder {color: #878787;}

  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body .templateList .form-control:hover{border-color: #85d9e0;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body .templateList .form-control:focus{border-color: #33c0cc;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body .templateList .el-input__inner:hover{border-color: #85d9e0;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body .templateList .el-input__inner:focus{border-color: #33c0cc;}
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{background-color: #EAF8F9;}

  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body .templateList{margin-right: 100px;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog {width: 860px;border-radius: 5px;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__header{border-bottom: 1px solid #F3F4F6;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__body{padding-bottom: 40px;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__footer{background-color: #F3F4F6;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;padding-right: 20px;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__footer .el-button--default{background-color: #D0D5D9;border: none;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__footer .el-button--default:hover{background-color: #33c0cc;color: #fff;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__footer .el-button--primary{background-color: #85d9e0;color: #fff;border: 1px solid #85d9e0;}
  .el-dialog__wrapper .el-dialog.updata-model-dialog  .el-dialog__footer .el-button--primary:hover{background-color: #33c0cc;color: #fff;border: 1px solid #33c0cc;}

  .form-trade{position: relative;}
  .form-trade-up{position: absolute;width: 9px;height: 6px;display: inline-block;top: 15px;right: 12px;background: url("/static/res/images/cms/icon.png") no-repeat -100px -800px;}
  .updata-model-dialog .el-input__inner{height: 34px;border: 1px solid #CBD5DD;border-radius: 2px;padding: 6px 12px;}
  .model-list-select{top: 387px !important;}
  .el-select-dropdown .popper__arrow{display: none;}

  .updata-flie-bottom{width: 130px;border: 1px solid #85d9e0;height: 36px;margin-top: 5px;background-color: #fff;color: #33c0cc;position: absolute;left: 208px;}
  .updata-flie{position: absolute;top: 230px;left: 208px;height: 36px;width: 130px;opacity: 0;}


  .el-dialog__wrapper .trade-list{width: 548px;height: 577px;}
  .el-dialog__wrapper .trade-list .el-dialog__body{height: 467px;padding-top: 20px;}
  .el-dialog__wrapper .el-dialog__body .el-tree{height: 436px;overflow: auto;}
  .el-dialog__wrapper .el-dialog__body .el-tree .el-tree-node{border: 1px solid #F3F4F6;border-bottom: none;height: auto;}
  .el-dialog__wrapper .el-dialog__body .el-tree > div:last-child{border-bottom: 1px solid #F3F4F6;}
  .el-dialog__wrapper .el-dialog__body .el-tree .el-tree-node .el-tree-node__content{height: auto;}
  .el-dialog__wrapper .el-dialog__body .el-tree .el-tree-node .el-tree-node__label{height: 40px;line-height: 40px;}
  .trade-list .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{background-color: #EAF8F9;}
</style>
