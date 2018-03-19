<template>
	<div class="industry-sel">
		<div class="search-box">
			<input type="text" :placeholder="user_search" v-model:value="filterValue"  @keyup.13="filter_list"/>
			<img src="/static/res/images/cms/search.png" @click="filter_list"/>
			<EasyScrollbar :barOption="searchListScorll">
				<div id="wrapper" class="scrollbar-box-height">
					<div class="tab-btn" @click="filter_All">
						全部
					</div>
					<div class="tab-btn hidden">
						最新
					</div>
					<div class="industry-list">
						<div class="ind-type" v-for="(item,index) in industry_list" v-if="item.subCategorys.length">
							<button @click="checkClick(index)">{{ item.cnName }} <img src="/static/res/images/cms/down-Btriangle.png"></button>
							<ul class="ul-lv2">
								<template v-for="(itemChild,index) in item.subCategorys">
									<li class="li-lv2" @click='secClick($event)'>{{ itemChild.cnName }}
                    <template v-if="itemChild.subCategorys">
										<ul class="ul-lv3">
											<li class='' v-for="(thirdChild,thirdIndex) in itemChild.subCategorys" @click="thirdClick(thirdChild.id,$event)" ref="itemGroup">{{ thirdChild.cnName }}</li>
										</ul>
									</template>
									</li>
								</template>
							</ul>
						</div>
					</div>
				</div>
			</EasyScrollbar>
		</div>
	</div>
</template>

<script>
	export default {
	  data () {
	    return {
	      user_search: '请输入关键字',
	      industry_list: [],
	      filterValue: '',
	      searchListScorll: {
	        barColor: '#33c0cc',
	        barWidth: 10,
	        railColor: '#f0f0f0',
	        barMarginRight: 0,
	        barOpacityMin: 0.5,
	        zIndex: 'auto',
	        autohidemode: true
	      }
	    }
	  },
	  mounted () {
	    this.$rest.post('/cms/rest/siteTemplate/categoryList').then(response => {
	      console.log('行业列表数据')
	      console.log(response)
	      this.industry_list = response.data.categoryList
	    }, response => {
	      console.log('Site-industry  Fail')
	    }
	    )
	  },
	  methods: {
	    checkClick (n) {
	      var fristList = $('.ind-type').eq(n)
	      if(fristList.hasClass('active')){
      		fristList.removeClass('active')
	      }else{
	      	fristList.addClass('active')
	      }
	    },
	    secClick (event) {
	      if($(event.target).hasClass('open')){
      		$(event.target).removeClass('open')
	      }else{
	      	$(event.target).addClass('open')
	      }
	    },
	    thirdClick (reqId,$event) {
	      console.log(this.$refs.itemGroup.length)
	      for (let i=0; i<this.$refs.itemGroup.length; i++){
	      	this.$refs.itemGroup[i].className = ''
	      }
	      $event.target.className = 'on'
	      this.$rest.post('/cms/rest/siteTemplate/list', {index: 1, industryCategoryId: reqId, size: 8}).then(response => {
	        console.log(response.data.datas)
	        this.$store.commit('SITE_SITETEMPLATE', response.data.datas)
	        this.$store.commit('SITE_TEMPLATEPAGE', {index: 1, rowCount: response.data.rowCount, size: 8})
	      }, response => {
	        console.log('行业请求模板失败')
	      }
	      )
	    },
	    filter_list () {
	      console.log(this.filterValue)
	      this.$rest.post('/cms/rest/siteTemplate/categoryList', {categoryName: this.filterValue}).then(response => {
		    console.log('行业列表数据')
		    console.log(response)
		    this.industry_list = response.data.categoryList
		  }, response => {
		    console.log('Site-industry  Fail')
		  }
		  )
	    },
	    filter_All () {
	      for (let i=0; i<this.$refs.itemGroup.length; i++){
	      	this.$refs.itemGroup[i].className = ''
          console.log(this.$refs.itemGroup[i].className)
	      }
	      this.$rest.post('/cms/rest/siteTemplate/categoryList').then(response => {
		    console.log('行业列表数据')
		    this.industry_list = response.data.categoryList
		    this.$rest.post('/cms/rest/siteTemplate/list', {index: 1, size: 8, industryCategoryId: ''}).then(response => {
		      console.log('网站模板获取成功')
		      console.log(response.data)
		      this.$store.commit('SITE_SITETEMPLATE', response.data.datas)
		      this.$store.commit('SITE_TEMPLATEPAGE', {index: 1, rowCount: response.data.rowCount, size: 8})
		    }, response => {
		      console.log('addsites fail')
		    }
		    )
		  }, response => {
		    console.log('Site-industry  Fail')
		  }
		  )
	    }
	  }
	}
</script>

<style>
	.industry-sel{
		display: inline-block;
		flex: 0 0 240px;
		padding: 15px 15px 25px 15px;
		width: 240px;
		background-color: #fff;
		border-radius: 5px;
	}
	.search-box{
		position: relative;
	}
	.search-box img{
		position:absolute;
		top: 8px;
		right: 12px;
		cursor: pointer;
    display: inline-block;
	}
	.industry-sel input{
		padding: 5px 35px 5px 10px;
		width: 100%;
		font-size:14px;
		color: #666;
		border: none;
		border-bottom: 1px solid #32C0C4;
		outline: none;
		margin-bottom: 25px;
	}
	.industry-sel input::-webkit-input-placeholder {
		color: #999;
	}
	.industry-sel input:-moz-placeholder {
		color: #999;
	}
	.industry-sel input:-ms-input-placeholder {
	/* IE10+ */
		color: #999;
	}
	.tab-btn{
		margin-top: 25px;
		padding-bottom: 10px;
		font-size: 16px;
		font-weight: bold;
		font-family: "microsoft yahei";
		color: #767676;
		cursor: pointer;
		border-bottom: 1px solid #ccc;
	}
	.tab-btn:first-child{
		margin-top: 0;
	}
	.ind-type{
		margin: 15px 0;
		border-bottom: 1px solid #eeeeee;
	}
	.ind-type button{
		display: block;
		position: relative;
		margin-bottom: 10px;
		padding: 0 20px 0 0;
		font-size: 16px;
		font-weight: bold;
		font-family: "microsoft yahei";
		color: #666;
		background-color: transparent;
		border: none;
		outline: none;
	}
	.ind-type button img{
		position: absolute;
		right: 0px;
		top: 8px;
		transition: transform .5s;
		-webkit-transition: transform .5s;
		-moz-transition: transform .5s;
	}
	.ind-type.active button img{
		transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
	}
	.ind-type ul.ul-lv2{
		max-height: 0;
		overflow: hidden;
		transition: all .5s;
		-webkit-transition: all .5s;
		-moz-transition: all .5s;
	}
	.ind-type.active ul.ul-lv2{
		max-height: 500px;
	}
	.ind-type ul.ul-lv2 li.li-lv2{
		margin-bottom: 5px;
		/*padding: 2px 0px 2px 10px;*/
    padding-left: 15px;
		font-size: 14px;
		font-family: "microsoft yahei";
		color: #767676;
		background: url('/static/res/images/cms/i-add.png') no-repeat 0 6px;
		cursor: pointer;
	}
	.ind-type ul.ul-lv2 li.li-lv2:hover{
		color: #32C0C4;
	}
	.ind-type ul.ul-lv2 li.open{
		padding-left: 15px;
		color: #32C0C4;
		background-image: url('/static/res/images/cms/i-reduce.png');
    background-position: 0 8px;
	}
	.ind-type ul.ul-lv3 li{
		display: none;
		padding-left: 10px;
		margin-top: 2px;
		margin-bottom: 3px;
		cursor: pointer;
	}
	.ind-type li.open ul.ul-lv3 li{
    	padding-left: 15px;
		display: block;
		color: #999;
	}
	.ind-type li.open ul.ul-lv3 li.on{
		color: #32C0C4;
		background: url('/static/res/images/cms/right-side.png') no-repeat 0px center;
	}
</style>
