<template>
	<div class="inqueryDetail" >
	  <div class="inqueryDetail-main" >
	      <div class="row">
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">询盘时间</li>
	            <li class="col-md-10">{{msg.created}}</li>
	          </ul>
	        </div>
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">客户邮箱</li>
	            <li class="col-md-10">{{msg.toemail}}</li>
	          </ul>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">询盘站点</li>
	            <li class="col-md-10">{{msg.requestWebSiteUrl}}</li>
	          </ul>
	        </div>
	        <div class="col-md-6"></div>
	      </div>
	      <div class="row">
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2  inquiry-content-data">询盘内容</li>
	            <li class="col-md-10" v-html="msg.messages"></li>
	          </ul>
	        </div>
	        <div class="col-md-6"></div>
	      </div>
	      <div class="row">
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">IP地址</li>
	            <li class="col-md-10">{{msg.ip}}</li>
	          </ul>
	        </div>
	        <div class="col-md-6"></div>
	      </div>
	      <div class="row">
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">国家</li>
	            <li class="col-md-10"><img :src="msg.countryPic" :alt="msg.country" :title="msg.country">  {{msg.country}}</li>
	          </ul>
	        </div>
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">州/省</li>
	            <li class="col-md-10">{{msg.state}}</li>
	          </ul>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">时区</li>
	            <li class="col-md-10">{{msg.timeZoneDiff}}</li>
	          </ul>
	        </div>
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">城市</li>
	            <li class="col-md-10">{{msg.city}}</li>
	          </ul>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">访问终端</li>
	            <li class="col-md-10">{{msg.deviceType}}</li>
	          </ul>
	        </div>
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">浏览器</li>
	            <li class="col-md-10">{{msg.browserType}}</li>
	          </ul>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">语言</li>
	            <li class="col-md-10">{{msg.language}}</li>
	          </ul>
	        </div>
	        <div class="col-md-6">
	          <ul>
	            <li class="col-md-2">操作系统</li>
	            <li class="col-md-10">{{msg.operationSys}}</li>
	          </ul>
	        </div>
	      </div>
	    <p class="tip" @click="upC">说明：询盘中所列出地理信息的依据是客户的IP地址定位，可能存在误差</p>
	  </div>
	</div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        items: [{
          message: 'Aenean placerat, lacus sit amet posuere varius, odio dui eleifend felis, in porttitor metus enim id sapien. Sed iaculis urna ut sollicitudin posuere.',
          date: '2017-08-04',
          customer: '测试',
          devSite: 'http://site-chana.networkgrand.com',
          email: 'xiaobei.li@yangxiechegn.com',
          country: '--',
          state: '未回复',
          IP: '14.120.233.207'
        }],
        kell: 'name:ke<br/>ago:28<br/>E-mail:kell@ke.com<br/>gener:男'
      }
    },
    props:['msg'],
    methods: {
      upC () {
        console.log(this.msg)
        console.log(this.msg.messages)
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .list-wrapper{
    height:20px;
  }
  .inqueryDetail{
    margin: 10px 20px;
    background-color: #fff;
    border-radius: 5px;
  }
  .inqueryDetail-main{
    margin: 10px 20px;
    padding: 5px 0;
    min-height: 830px;
  }
  @media(max-width: 1366px) {
    .inqueryDetail-main{
      min-height: 650px;
    }
  }
  .inqueryDetail-main ul{
    display: block;
    overflow: hidden;
    line-height:20px;
    padding:7px 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .inqueryDetail-main ul>li:first-child{
    color:#33c0cc;
    padding-left: 0;
  }
  .tip{
    margin: 20px 0;
  }
  .inquiry-content-data{height: 150px;}
</style>
