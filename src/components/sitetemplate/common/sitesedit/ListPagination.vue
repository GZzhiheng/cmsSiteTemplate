<template>
	<div>
	<el-pagination
        @current-change="sendCurrentPage"
        :current-page="currentPage"
        :page-size="this.pageSize"
        :page-sizes="[4, 6, 8, 10]"
        layout="prev, pager, next, jumper, slot"
        :total="rowCount">
        <a class="go-page-list">GO</a>
  	</el-pagination>
  	</div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1,
        pageSize: 5
      }
    },
    props: ['rowCount'],
    methods: {
      sendCurrentPage(num){
      	this.currentPage = num
      	this.$emit('changePage', this.currentPage)
      }
    }
  }
</script>

<style>
  /*end-css for page*/
</style>
