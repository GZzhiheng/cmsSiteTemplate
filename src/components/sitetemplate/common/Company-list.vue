<template>
	<div class="select-box" @click = " checkClick " :class="{ active: clickThis }">
		<img class="triangle" src="/static/res/images/cms/down-triangle.png"/>
		<input id="company-id" type="text" v-model="companyName" readonly="true"/>
		<div class="company-list-box">
			<EasyScrollbar :barOption="colorSizeOption">
				<div id="wrapper" class="company-list">
					<ul>
						<li v-for=" item in companys" @click='selectVal' :data-id='item.id'>{{ item.no }}/{{item.name}}</li>
					</ul>
				</div>
		    </EasyScrollbar>
		</div>
	</div>
</template>

<script>
	export default {
	  props: ['companyName'],
	  data () {
	    return {
	      companySelected: '请选择...',
	      clickThis: false,
	      companys: [
	        { no: 10000, name: '中山灯博会', id: 110 }
	      ],
      colorSizeOption: {
        barColor: '#33c0cc',
        barWidth: 10,
        railColor: '#f0f0f0',
        barMarginRight: 10,
        barMaginBottom: 10,
        barOpacityMin: 0.5,
        autohidemode: true,
        horizrailenabled: true
      }
	    }
	  },
	  mounted () {
	    this.$rest.get('/cms/rest/common/getClientList').then(response => {
	      this.companys = response.data
	      console.log(response.data)
	    })
	  },
	  methods: {
	    checkClick () {
	      this.clickThis === false ? this.clickThis = true : this.clickThis = false
	    },
	    selectVal (e) {
	      let newName = {}
	      newName.cilent = e.target.innerHTML
	      newName.id = e.target.getAttribute('data-id')
	      this.$emit('companySelect', newName)
	    }
	  }
	}
</script>

<style>
	/*body{
		overflow: hidden;
	}*/
	.addsite-content .select-box{
		position: relative;
		margin-bottom: 20px;
		height: 39px;
		background-color: #FBFCFE;
		box-sizing: border-box;
	}
	.addsite-content .select-box input{
		width: 100%;
		background-color: transparent;
		border: none;
		padding: 9px 35px 9px 20px;
		border: 1px solid #F2F2F4;
		border-radius: 5px;
		box-shadow: 0 0 4px 4px #F9FAFC inset;
	}
	.addsite-content .select-box.active input{
		border-bottom: none;
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		box-shadow: 0px 4px 4px 2px #F9FAFC inset;
	}
	.addsite-content .select-box .triangle{
		position: absolute;
		top: 16px;
		right: 10px;
		transition: transform .5s;
		-moz-transition: transform .5s;
		-webkit-transition: transform .5s;
		-ms-transition: transform .5s;
	}
	.addsite-content .select-box .company-list{
		max-height: 0px;
		background-color: #FBFCFE;
		transition: max-height .5s;
		-moz-transition: max-height .5s;
		-webkit-transition: max-height .5s;
		-ms-transition: max-height .5s;
	}
	.addsite-content .company-list li{
		padding-left: 20px;
		height: 40px;
		width: 90%;
		line-height: 39px;
		font-size: 14px;
		color: #666;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		cursor: pointer;
	}
	.addsite-content .company-list li:hover{
		color: #fff;
		background-color: #32C0CC;
	}
	.addsite-content .select-box.active{
		box-shadow: initial;
	}
	.addsite-content .select-box.active .triangle{
		transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		-ms-transform: rotate(180deg);
	}
	.addsite-content .select-box.active .company-list{
		max-height: 240px;
	}
	.addsite-content .select-box.active .company-list li{
		margin-right: 3px;
	}
	.addsite-content .select-box .company-list-box{
		position: absolute;
	    top: 100%;
	    left: 0;
	    width: 100%;
	    background: #FBFCFE;
		box-shadow: 0 0 4px 4px #F9FAFC inset;
		padding: 0px;
		transition: 0.5s padding ease;
	    -moz-transition: 0.5s padding ease;
	    -webkit-transition: 0.5s padding ease;
	    -o-transition: 0.5s padding ease;
	    -ms-transition: 0.5s padding ease;
	}
	.addsite-content .select-box.active .company-list-box{
		padding: 10px 0px;
	    border-bottom: 1px solid #F2F2F4;
    	border-left: 1px solid #F2F2F4;
    	border-right: 1px solid #F2F2F4;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: 0 -4px 4px 2px #F9FAFC inset;
	}
	.addsite-content .select-box .company-list-box .easy-scrollbar__wrap{
		overflow: hidden;/*火狐滚动条隐藏*/
	}
	.addsite-content .select-box.active .company-list-box .easy-scrollbar__wrap{
		overflow: scroll;/*火狐滚动条隐藏*/
	}
</style>
