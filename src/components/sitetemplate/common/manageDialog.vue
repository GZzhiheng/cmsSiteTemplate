<template>
	<div class="mamageDialog" :class="{'in':opentype.open == true}">
		<div class="manageAlert" :class="{'in':opentype.open == true}" style="height: auto">
			<slot name="copySite"></slot>
			<slot name="bindSite"></slot>
			<div class="addListBottom">
				<button class="addListCancel" @click="closethis">取消</button>
				<button class="addListSave" @click="submitFun(opentype.type)">保存</button>
			</div>
		</div>
		<el-button :plain="true" @click="bindAlert" style="visibility: hidden;"></el-button>
	</div>
</template>

<script>
	export default{
	  data () {
	    return {
	      msg1: '',
	      msg2: ''
	    }
	  },
	  props: ['opentype', 'copyMsg1', 'copyMsg2', 'bindMsg', 'autoBind2', 'maindata'],
	  methods: {
	    closethis () {
	      this.$emit('openFun', {open: false, type: '', thisSite: this.maindata})
	    },
	    submitFun (type) {
	      console.log(type)
	      console.log(this.autoBind2)
	      if( type === 'bindSite'){
	      	console.log(this.maindata)
	      	if (this.bindMsg === '') {
	      		this.bindAlert('empty')
	      		return
	      	}
	        var reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
	        if(!reg.test(this.bindMsg)){
	        	this.$tip('域名由英文字母和数字组成，如：networkgrand.com', 'error')
	      		return
	      	}
	      	this.$rest.post('/sys/rest/validate/site/site.do', {excluded: this.maindata.id, site: this.bindMsg}).then(res => {
	      		if(res){
	      			this.$rest.post('/cms/rest/site/bind.do', {id: this.maindata.id, site: this.bindMsg, wildcardBind: this.autoBind2}).then(response => {
			      	  this.bindAlert('success')
			      	  this.closethis ()
			      	  this.$tip('绑定站点成功', 'success')
			      	  this.$rest.get('/cms/rest/site/list').then(response => {
					      this.$store.commit('SITE_MANAGESITE', response.data.datas)
					    }, response => {
					      console.log('管理站点获取失败')
					  })
			      	})
	      		} else {
	      			this.$tip('绑定站点重复', 'warning')
	      		}
	      	})
	      } else if (type === 'copySite') {
	      	if (this.copyMsg1 === '') {
	      		this.copyAlert ('empty','站点名称不能为空')
	      		return
	      	} else if(this.copyMsg2 === ''){
	      		this.copyAlert ('empty','二级域名不能为空')
	      		return
	      	}
	      	this.$rest.post('/cms/rest/site/clone.do', {name: this.copyMsg1, domain: this.copyMsg2, sourceSiteId: this.maindata.id}).then(response => {
	      	  this.copyAlert ('success','复制站点成功')
	      	  this.closethis ()
	      	}, response => {
	      	  this.copyAlert ('empty','复制站点失败')
	      	  this.closethis ()
	      	})
	        let aa = '/cms/rest/site/bind.do  id  site wildcardBind'
	      } else {
	      	console.log('fail')
	      }
	    },
	    bindAlert(msg) {
	    	if(msg === 'empty'){
	    		this.$message({message: '域名不能为空',type: 'warning'});
	    	} else if(msg === 'success'){
	    		this.$message({
		          message: '域名绑定成功',
		          type: 'success'
		        });
	    	}
	    },
	    copyAlert (type, msg) {
	    	if(type === 'empty'){
	    		this.$message({
		          message: msg,
		          type: 'warning'
		        });
	    	} else if(type === 'success'){
	    		this.$message({
		          message: msg,
		          type: 'success'
		        });
	    	}
	    }
	  }
	}
</script>

<style scoped>
	.mamageDialog{
	    background: rgba(0,0,0,0);
	    position: fixed;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    z-index: 1030;
	    visibility: hidden;
	    transition: 0.5s all ease;
	    -moz-transition: 0.5s all ease;
	    -webkit-transition: 0.5s all ease;
	    -o-transition: 0.5s all ease;
	}
	.mamageDialog.in{
	    background: rgba(0,0,0,0.5);
	    visibility: visible;
	}
	.manageAlert{
	    opacity: 0;
	    -webkit-transform: translate(-50%,0);
	    transform: translate(-50%,0);
	    transition: 0.5s all ease;
	    -moz-transition: 0.5s all ease;
	    -webkit-transition: 0.5s all ease;
	    -o-transition: 0.5s all ease;
	    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
	    background-color: #fff;
	    border: 1px solid rgba(0,0,0,0.2);
	    background-clip: padding-box;
	    margin: 30px auto;
	    width: 60%;
	    max-width: 940px;
	    position: fixed;
	    top: 5%;
	    left: 50%;
	    z-index: -1;
	    border-radius: 5px 5px 5px 5px;
	}
	.manageAlert.in{
	    opacity: 1;
	    z-index: 9999;
	}
	.manageAlert h4{
	    padding: 15px;
	    margin: 0;
	    border-bottom: 1px solid #e5e5e5;
	}
	.addListBottom{
	    background: #f2f4f5;
	    padding: 15px 20px;
	    text-align: right;
	    border-radius: 0 0 15px 15px;
	    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
	}
	.addListBottom button {
	    font-size: 14px;
	    border: none;
	    border-radius: 3px;
	    padding: 8px 25px;
	    margin-left: 5px;
	}
	.addListBottom .addListCancel{
	    background: #cfd5d8;
	    color: #333;
	}
	.addListBottom .addListSave {
	    background: #33c0cc;
	    color: #fff;
	}
	.scorllin {
		padding: 25px 0 20px;
	    overflow-x: hidden;
	    overflow-y: auto;
	    background-color: #fff;
	}
	.listContent {
	    padding: 0 50px;
	}
	.settings-list {
	    display: block;
	    font-size: 14px;
	    margin-bottom: 16px;
	}
	.settings-list:before, .settings-list:after {
		content: '';
		display: table;
	}
	.settings-list:after {
		clear: both;
	}
	.list-text, .list-information {
	    float: left;
	    display: inline;
	}
	.list-information {
	    width: 84%;
	    margin-left: 1%;
	    padding-right: 5%;
	}
	.list-information span{
		display: inline-block;
		color: #000;
    	margin-top: 7px;
	}
	.list-text {
	    width: 15%;
	    text-align: right;
	    color: #666666;
	    margin-top: 7px;
	}
	.list-information input, .list-information textarea {
	    border: 1px solid #d0d5d7;
	    color: #666666;
	    border-radius: 5px;
	    height: 34px;
	    width: 100%;
	    text-indent: 10px;
	}
</style>
