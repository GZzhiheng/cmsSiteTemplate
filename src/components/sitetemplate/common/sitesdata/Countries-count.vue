<template>
	<div class="country-count">
		<h2>访问国家TOP10</h2>
		<table>
			<thead>
				<tr>
          <td class="visit-country"><span class="countList">国家</span></td>
					<td class="visit-mid"><span class="countListCos">访问数</span></td>
					<td>占比</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in siteCountry">
					<td><img :src="item.logo">{{item.label}}</td>
					<td class="visit-mid">{{item.nb_visits}}</td>
					<td>
						<div class="percent-box">
							<el-progress :text-inside="true" :stroke-width="26" :percentage="parseInt(item.percentage)"></el-progress>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default{
	  props: ['siteCountry']
	}
</script>

<style>
	.percent-box{
		position: relative;
		width: 100%;
		height: 26px;
		background-color: #EAFAFA;
	}
	.percent-box .visit-percent{
		position: absolute;
		height: 26px;
		background-color: #32C0CC;
	}
	.percent-box span{
		position: absolute;
		z-index: 1;
		line-height: 26px;
		font-size: 13px;
		font-weight: bold;
		color: #fff;
	}
	.country-count{
		width: 100%;
		padding: 15px 15px 40px 15px;
		background-color: #fff;
		border-radius: 5px;
	}
	.country-count h2{
		margin: 15px 0 25px 0;
		font-size: 22px;
		font-weight: bold;
		color: #666;
	}
	.country-count table{
		width: 100%;
	}
	.country-count thead tr{
		height: 50px;
		line-height: 50px;
	}
	.country-count tbody tr{
		height: 42px;
		line-height: 42px;
	}
	.country-count tbody{
		color: #666
	}
	.country-count td.visit-country{
		width: 200px;
	}
	.country-count thead{
		font-size: 15px;
		font-weight: bold;
		color: #666;
		background-color: #EBEFF0;
	}
	.country-count thead td{
		padding-left: 20px;
	}
  .country-count td.visit-mid{
    width: 85px;
    padding-left: 17px;
  }
  .country-count .countList{
    width: 180px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    line-height: 30px;
    border-right: 1px solid #d8dde5;
  }
  .country-count .countListCos{
    width: 64px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    line-height: 30px;
    border-right: 1px solid #d8dde5;
  }
	.country-count thead td:last-of-type{
		border: none;
	}
	.country-count tbody tr{
		border-bottom: 1px solid #ccc;
	}
	.country-count tbody td{
		padding-left: 15px;
		font-size: 13px;
	}
	.country-count tbody td img{
		margin-right: 5px;
		vertical-align: 0px;
	}

</style>
