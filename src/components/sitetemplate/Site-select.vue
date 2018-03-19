<template>
	<div>
		<div class="select-content">
			<Siteindustry></Siteindustry>
			<Sitesites :siteMsg2="siteMsg"></Sitesites>
		</div>
	</div>
</template>

<script>
	import Siteindustry from './common/Site-industry'
	import Sitesites from './common/Site-sites'
	
	export default {
	  data () {
	    return {
	      currentPage: this.$route.name
	    }
	  },
	  props: ['siteMsg'],
	  components: {
	    Siteindustry,
	    Sitesites
	  },
	  mounted () {
	  	console.log('this.siteMsg')
	    console.log(this.siteMsg)
	  }
	}
</script>

<style>
	.select-content{
		display: flex;
		display: -webkit-flex;
		margin: 10px 20px 0px 20px;
		min-width: 1084px;
	}
</style>
