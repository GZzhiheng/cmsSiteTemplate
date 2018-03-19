<style>
  .creation .btn,.creation button{outline: none !important;}
  .el-loading-spinner .path{stroke:#33c0cc !important;}
  .el-date-editor .el-range-separator{line-height: inherit;}
  .el-date-editor .el-range__icon{line-height: inherit;}
  .el-date-table td.end-date span, .el-date-table td.start-date span{background-color:#33c0cc}
  .el-date-table td.available:hover{color: #33c0cc}
  .el-date-table td.today span{color: #33c0cc}
  .siteSearch .el-input__inner{height: 30.5px;}
  .el-select-dropdown__item.selected{color: #32C0CC}
  .el-progress-bar__outer{border-radius: 0;}
  .el-progress-bar__inner{background-color: #32C0CC;border-radius: 0;}
</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
	export default{
		created () {
			this.$rest.get('/sys/rest/user/privilegeCodes').then(res => {
				this.$store.dispatch('Root_jurisdiction', res.data)
	  	})
		}
	}
</script>

