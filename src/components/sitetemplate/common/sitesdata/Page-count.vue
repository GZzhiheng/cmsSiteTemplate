<template>
	<div class="Page-count">
		<h2>访问页面TOP10</h2>
		<table>
			<thead>
				<tr>
					<td class="visit-ad"><span class="viewAd">页面地址</span></td>
					<td class="visit-pv"><span class="viewPv">PV</span></td>
					<td class="visit-time">访问时长</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in sitePage">
					<td><div class="box-a"><a href="javascript:;">{{item.label}}</a></div></td>
					<td class="font-center">{{item.entry_nb_actions}}</td>
					<td>{{$changeToDate(item.sum_time_spent)||''}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default{
	  props: ['sitePage']
	}
</script>

<style>
	.Page-count{
		width: 100%;
		padding: 15px 15px 40px 15px;
		background-color: #fff;
		border-radius: 5px;
	}
	.Page-count table{
		width: 100%;
		table-layout: fixed;
	}
	.Page-count h2{
		margin: 15px 0 25px 0;
		font-size: 22px;
		font-weight: bold;
		color: #666;
	}
	.Page-count thead tr{
		height: 50px;
		line-height: 50px;
	}
	.Page-count thead td:last-of-type{
		border: none;
	}
	.Page-count td.visit-pv{
		padding-left: 23px;
		width: 60px;
	}
	.Page-count td.visit-time{
		padding-left: 20px;
		width: 120px;
	}
	.Page-count tbody tr{
    border-bottom: 1px solid #d8dde5;
		height: 42px;
		line-height: 42px;
	}
	.Page-count tbody{
		color: #666
	}
	.Page-count thead{
		font-size: 15px;
		font-weight: bold;
		color: #666;
		background-color: #EBEFF0;
	}
	.Page-count tbody td{
    font-size: 12px;
    padding-left: 20px;
	}
	.Page-count tbody td.font-center{
		padding-right: 15px;
		text-align: center;
	}
  .Page-count td.visit-ad{
    width: 500px;
    padding-left: 20px;
  }
  .Page-count .viewAd{
    width: 562px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    line-height: 30px;
    border-right: 1px solid #d8dde5;
  }
  .Page-count .viewPv{
    width: 47px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    line-height: 30px;
    border-right: 1px solid #d8dde5;
  }
	.Page-count tbody tr a{
		text-decoration: underline;
	}
	.Page-count tbody .box-a{
		width: 100%;
		height: 42px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
