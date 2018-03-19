<template>
	<div>
		<Sitecrumbs :currentPage="this.currentPage">
			<div class="crumb-back" v-if="stepLocation === 'select'">
				<a href="javascript:;" @click="changeStep">上一步</a>
			</div>
		</Sitecrumbs>
		<div class="addsite-box" v-if="stepLocation === 'addSite'">
			<div class="addsite-content">
				<img src="/static/res/images/cms/addsite.png"/>
				<div class="add-form">
					<form>
						<h4><span>*</span>名称</h4>
						<input type="text" v-model="inputName"/>
						<h4><span>*</span>站点域名</h4>
						<div class="input-flex">
							<span class="span-left">site-</span>
							<input type="text" v-model="inputWeb" v-on:input='checkdomain'/>
							<span class="span-right">.networkgrand.com</span>
							<p class="waringP" v-if="domainRemind">域名重复</p>
						</div>
						<h4><span>*</span>所属客户</h4>
						<el-select popper-class="newSite" v-model="choiceCom" filterable placeholder="请选择..." @change="checkCompany">
							<el-option
							    v-for="item in options"
							    :key="item.id"
							    :label="item.no+'/'+item.name"
							    :value="item.id">
							</el-option>
						</el-select>
					</form>
					<div class="addsite-btn"><router-link to='/sitetemplate/site-manage'>取消</router-link>
						<a @click='checkinputs'>下一步</a>
          </div>
				</div>
			</div>
		</div>
		<Siteselect v-if="stepLocation === 'select'" :changeComp='changeStep' :siteMsg="siteData"></Siteselect>
	</div>
</template>

<script>
	import {sitedata} from '@/store/testData.js'
	import Sitecrumbs from './common/Site-crumbs'
	import Siteselect from './Site-select'

	export default {
	  name: 'hello',
	  data () {
	    return {
	      currentPage: this.$route.name,
	      stepLocation: 'addSite',
	      inputName: '',
	      inputWeb: '',
	      dialogMsg: '',
	      centerName: [],
	      domainRemind: false,
	      siteData:{},
	      choiceCom: '',
	      options: [{value: '选项1',label: '黄金糕'},{value: '选项2',label: '黄金'},{value: '选项3',label: '黄'}],
	      newsite: {clientId: '', domain: '', name: ''}
	    }
	  },
	  components: {
    Sitecrumbs,
    Siteselect
	  },
	  mounted () {
	  	this.$rest.get('/cms/rest/common/getClientList').then(res => {this.options = res.data})
	  },
	  methods: {
	    checkCompany (val) {
	      console.log(val)
	      this.newsite.clientId = val
	    },
	    changeStep () {
	      this.stepLocation = 'addSite'
	    },
	    checkinputs () {
	      if (this.inputName === '') {
	        this.$tip('请填入名称', 'warning')
	      } else if (this.inputWeb === '') {
	        this.$tip('请填入域名', 'warning')
	      } else if (this.choiceCom === '') {
	        this.$tip('请选择公司', 'warning')
	      } else if (this.domainRemind === true) {
	      	this.$tip('域名重复', 'warning')
	      } else {
	        this.siteData.clientId = this.newsite.clientId
	        this.siteData.inputWeb = this.inputWeb
	        this.siteData.inputName = this.inputName
	        this.stepLocation = 'select'
	        this.currentPage = '选择站点模板'
	      }
	    },
	    checkdomain (event) {
	      this.$rest.get('/sys/rest/validate/siteRest/domain.do', {domain: event.target.value}).then(response => {
	        console.log('检验域名成功')
	        console.log(response.data.valid)
	        this.domainRemind = response.data.valid === true? false : true
	      }, response => {
	      	this.domainRemind = true
	      })
	    }
	  }
	}
</script>

<style>
	.addsite-box{
		position:relative;
		overflow: hidden;
	}
	.addsite-content{
		margin: 10px 25px 0px 25px;
		padding: 9.5% 20px;
		min-width: 1084px;
		text-align: center;
		background-color: #32C0CC;
		border-radius: 10px;
	}
	.addsite-content .add-form{
		display: inline-block;
		padding: 40px;
		width: 500px;
		text-align: left;
		background-color: #fff;
		vertical-align: top;
		box-shadow: 0 0 10px #666;
		box-sizing: border-box;
	}
	.addsite-content .add-form h4{
		margin-top: 0;
		font-size: 14px;
		font-weight: bold;
		color: #666;
	}
	.add-form h4 span{
		margin-right: 5px;
		vertical-align: -2px;
		color: #ff4800;
	}
	.addsite-content .add-form .input-flex{
		position: relative;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		width: 100%;
	}
	.addsite-content .waringP{
		position: absolute;
	    bottom: -28px;
	    left: 35px;
	    font-size: 12px;
	    color: red;
	}
	.addsite-content .input-flex span{
		display: inline-block;
		font-size: 14px;
		font-family: "microsoft yahei";
		color: #666;
	}
	.addsite-content .input-flex span.span-left{
		flex: 0 0 31px;
	}
	.addsite-content .input-flex span.span-right{
		flex: 0 0 131px;
	}
	.addsite-content .input-flex input{
		flex: 1;
		margin: 0 5px;
		padding: 9px 20px;
		font-size: 14px;
		background-color: #FBFCFE;
		border: 1px solid #F2F2F4;
		border-radius: 5px;
		box-shadow: 0 0 4px 4px #F9FAFC inset;
	}
	.addsite-content form>input{
		margin-bottom: 20px;
		padding: 9px 20px;
		width: 100%;
		font-size: 14px;
		background-color: #FBFCFE;
		border: 1px solid #F2F2F4;
		border-radius: 5px;
		box-shadow: 0 0 4px 4px #F9FAFC inset;
	}
	.addsite-btn{
		margin-top: 30px;
	}
	.addsite-btn a{
		display:inline-block;
		padding: 6px 0;
		width: 190px;
		font-size: 14px;
		font-weight: bold;
		font-family: "microsoft yahei";
		text-align: center;
		color: #33c0cc;
		border: 2px solid #33c0cc;
		border-radius: 4px;
		text-decoration: none;
		cursor: pointer;
	}
	.addsite-btn a:first-child{
		margin-right: 34px;
	}
	.addsite-box .el-select{
		width: 100%;
	}
	.addsite-box .el-input__inner{
	    background-color: #FBFCFE;
        border: 1px solid #F2F2F4;
        box-shadow: 0 0 4px 4px #F9FAFC inset;
	}
	.el-select-dropdown__item.selected{
		color: #33c0cc;
	}
  .el-select-dropdown .is-vertical .el-scrollbar__thumb{
    background-color: #33c0cc;
  }
  .newSite .el-select-dropdown__item.hover, .newSite .el-select-dropdown__item:hover{background-color: #33c0cc;color: #fff;}
  .addsite-box .el-select input:hover{border: 1px solid #85d9e0;}
  .addsite-box .el-select input:focus{border: 1px solid #33c0cc;}
  .addsite-box .el-select .el-input.is-focus .el-input__inner{border-color: #33c0cc;}
</style>
