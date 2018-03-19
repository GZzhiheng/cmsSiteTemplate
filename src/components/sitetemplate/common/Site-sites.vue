<template>
	<div class="sites-box">
		<div class="sites-list">
			<div class="site-row">
				<EasyScrollbar :barOption="sitesListScrollbar">
					<div id="wrapper" class="scrollbar-box-height">
						<div class="box-out" v-for="site in site_list">
							<div class="site-box">
								<img :src="site.smallImageUrl">
								<div class="site-confirm">
									<div class="s-btn">
										<span @click="showPreview(site.largeImageUrl, site.name, site.previewUrl, site.id)">预览</span>
										<span @click='createPresite(site.id)'>使用</span>
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
		<Preview :preview-data='previewShow' @showaction='showPreview' @createSite='createPresite'></Preview>
	</div>
</template>

<script>
	import Preview from './Preview-box.vue'
	import Pagination from './Pagination'

	export default{
	  data () {
	    return {
	      showSite: 0,
	      queryUrl: '/cms/rest/siteTemplate/list',
	      previewShow: {preview: false, previewImg: '', previewno: '', previewUrl: ''},
	      screenHeight: document.body.screenHeight,
	      site_list2: [
	        {type: 0, name: 'PC0001', smallImageUrl: '/static/res/images/cms/sites01.jpg', largeImageUrl: '/static/res/images/cms/preview01.jpg'},
	        {sitetype: 'PC', siteno: 'PC0002', img: '/static/res/images/cms/sites02.jpg', previewImg: '/static/res/images/cms/preview02.jpg'}
	      ],
	      sitesListScrollbar: {
	        barColor: '#33c0cc',
	        barWidth: 10,
	        railColor: '#f0f0f0',
	        barMarginRight: 33,
	        barOpacityMin: 0.4,
	        zIndex: 'auto',
	        autohidemode: true
	      }
	    }
	  },
	  props: ['siteMsg2'],
	  computed: {
	    site_list () {
	      return this.$store.state.sitetemplate.site_list
	    },
	    pageOpt () {
	      return this.$store.state.sitetemplate.templatePage
	    }
	  },
	  mounted () {
	  	console.log('siteMsg2')
	  	console.log(this.siteMsg2)
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
		  	this.$rest.post(this.queryUrl, {index: params.index, size: params.size, industryCategoryId: this.pageOpt.industryCategoryId || ''}).then(response => {
	          this.$store.commit('SITE_SITETEMPLATE', response.data.datas)
	          this.$store.commit('SITE_TEMPLATEPAGE', {index: params.index, rowCount: response.data.rowCount, size: 8})
	          }, response => {
	            console.log('下一页请求失败')
	        })
	  	},
	    selType (type) {
	      this.showSite = type
	    },
	    modelList () {
	        this.$rest.post(this.queryUrl, {index: 1, size: 8, industryCategoryId: ''}).then(response => {
	          console.log('网站模板获取成功')
	          console.log(response.data)
	          this.$store.commit('SITE_SITETEMPLATE', response.data.datas)
	          this.$store.commit('SITE_TEMPLATEPAGE', {index: 1, rowCount: response.data.rowCount, size: 8})
	        }, response => {
	          console.log('addsites fail')
	        })
	    },
	    showPreview (img, name, url, id) {
	      this.previewShow.previewImg = img
	      this.previewShow.previewno = name
	      this.previewShow.previewUrl = url
	      this.previewShow.id = id
	      var clientHeight = document.body.clientHeight
	      var headerHeihgt = document.getElementsByClassName('preview-header')[0].offsetHeight
	      var imgHeight = document.getElementsByClassName('preview-img')[0]
	      imgHeight.style.height = (clientHeight - headerHeihgt) + 'px'
	      if (this.previewShow.preview) {
	        this.previewShow.preview = false
	        document.body.style.overflow = 'initial'
	      } else {
	        this.previewShow.preview = true
	        document.body.style.overflow = 'hidden'
	      }
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
	    createPresite (temId) {
	      let reqSite = {
	        templateId: temId,
	        name: this.siteMsg2.inputName,
	        domain: this.siteMsg2.inputWeb,
	        clientId: this.siteMsg2.clientId,
	        industryCategoryId: '',
	        industryCategoryName: ''
	      }
	      console.log(reqSite)
	      this.$rest.post('/cms/rest/site/create.do', reqSite).then(response => {
	        console.log('创建站点成功 success')
	        console.log(response)
	        let createParame = '/sitetemplate/site-edit?templateId=' + response.data.templateId
	        createParame += '&siteId=' + response.data.id
	        this.$router.push(createParame)
	        document.body.style.overflow = 'initial'
	      }, response => {
	        console.log('siteCreate Fail')
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
	  components: {
	    Preview,
	    Pagination
	  }
	}
</script>

<style>
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
		margin-bottom: 19px;
		display: inline-block;
		padding: 0 12px;
		margin-top: 5px;
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
	.sites-list .site-confirm .s-btn{
		position: absolute;
		top: 50%;
		margin-top: -65px;
		width: 100%;
	}
	.sites-list .s-btn span{
		display: block;
		margin: 15px auto;
		width: 75px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #33c0cc;
		border: 1px solid #33c0cc;
		border-radius: 5px;
		text-align: center;
		cursor: pointer;
	}
	.sites-list .s-btn span:hover{
		color: #fff;
		background-color: #33c0cc;
	}
	.sites-list .esay-scrollbar__bar.is-vertical{
		margin: 5% 0;
	}
	/*添加不hover隐藏*/
	.easy-scrollbar .is-vertical{
		opacity: 0;
	}
	.easy-scrollbar:hover .is-vertical{
		opacity: inherit;
	}
</style>
