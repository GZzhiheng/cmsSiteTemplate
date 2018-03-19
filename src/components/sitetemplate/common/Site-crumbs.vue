<template>
	<div class="site-crumbs">
		<h2>
			{{ currentPage }}
			<slot></slot>
		</h2>
	</div>
</template>

<script>
	export default {
	  props: ['currentPage'],
	  data: () => {
	    return {
	    }
	  },
	  computed: {
	    mainView () {
	      return this.$store.state.appViewTitle
	    },
	    sortToggle () {
	      return this.$store.state.sortToggle
	    }
	  },
	  methods: {
	  	goBack () {
	  	  this.$router.go(-1)
	  	}
	  }
	}
</script>

<style>
	.site-crumbs{
		padding: 16px 20px 16px 40px;
		background-color: #fff;
	}
	.site-crumbs h2{
		margin: 0;
		position: relative;
		color: #666;
		font-size: 16px;
		font-weight: bold;
		font-family: "Microsoft Yahei";
	}
	.site-crumbs .crumb-btns{
		position: absolute;
		top: 0;
		right: 0;
	}
	.site-crumbs h2 a{
		display: inline-block;
		margin-left: 25px;
		padding-left: 25px;
		font-size: 14px;
		font-weight: lighter;
		color: #666;
		text-decoration: none;
		background-repeat: no-repeat;
		background-position: 2px center;
		background-size: auto 100%;
	}
  .site-crumbs h2 a.btn-goback{
    width:55px;
    height:25px;
    border-radius: 5px;
    line-height:25px;
    text-align: center;
    border: 1px solid #33c0cc;
    padding: 0;
    color: #33c0cc;
    font-size: 12px;
  }
  .site-crumbs h2 select{
    width:80px;
    height:25px;
    padding-left: 5px;
    line-height:25px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #33c0cc;
    padding: 0;
    color: #33c0cc;
    font-size: 12px;
    font-weight: normal;
    box-shadow: none;
    outline: none;
  }
	.site-crumbs .crumb-back{
		position: absolute;
		top: -5px;
		right: 5px;
	}
	.site-crumbs .crumb-back a{
		display: inline-block;
		padding: 5px 15px;
		font-size: 14px;
		color: #33c0cc;
		border: 1px solid #33c0cc;
		border-radius: 4px;
	}
	.site-crumbs .crumb-back a:hover{
		background-color: #33c0cc;
		color: #fff;
	}
</style>
