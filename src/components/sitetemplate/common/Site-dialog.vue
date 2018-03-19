<template>
	<div id="siteDialog" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-body">
	      	<button type="button" style="margin-top: -10px;" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	      	<p style="font-size: 20px;margin: 15px 0;"><slot>请把表单填写完整</slot></p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>
</script>

<style>
</style>
