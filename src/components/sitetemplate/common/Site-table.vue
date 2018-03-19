<template>
	<div class="manage-main">
    <div class="search-head">
      <slot name="search-head"></slot>
    </div>

    <div class="manage-body">
      <div class="inquiry-head">
        <slot name="inquiry-head">
          表格头部
        </slot>
      </div>
      <div class="inquiry-body">
        <slot name="inquiry-body">
          暂无表格内容！
        </slot>
      </div>

      <div class="data-head">
        <slot name="theader">
          表格头部
        </slot>
      </div>
      <div class="data-body">
        <slot name="body">
          暂无表格内容！
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
	import Pagination from './Pagination'
	export default{
	}
</script>

<style>
  /*css for inquiry*/
  .inquiry-head ul,
  .inquiry-head li,
  .inquiry-body ul,
  .inquiry-body li{
    margin: 0;
    padding: 0;
  }
  .inquiry-body,
  .inquiry-head{
    word-break: break-all;
    word-wrap: break-word;
  }

  .inquiry-head li,
  .inquiry-body li{
    float: left;
    padding: 0 20px;
    box-sizing: border-box;
    display: table;
  }
  .inquiry-head li{
  }
  .inquiry-body li{
    height:60px;
    line-height:15px;
  }
  .inquiry-body li>p,
  .inquiry-body li>a{
    display:table-cell;
    vertical-align: middle;
    margin: 0;
  }

  .inquiry-body li.inquirybody-content>a,
  .inquiry-body li.inquirybody-site>p,
  .inquiry-body li.inquirybody-email>p,
  .inquiry-body li.inquirybody-client>p,
  .inquiry-body li.inquirybody-country>p{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 30px;
    margin:15px 0;
  }
  .inquiry-body ul{
    border-bottom: 1px solid #e6ecf5;
  }
  .inquiry-body>ul:nth-of-type(odd){
    background-color: #f4f7fb;
  }
  .inquiry-head>ul{
    overflow: hidden;
    background: #fff;
    padding:10px;
    border-radius: 3px;
  }
  .inquiry-head>ul>li{
    font-size: 14px;
    color: #666;
    line-height:35px;
    height:35px;
    overflow: hidden;
    border-right: 1px solid #d8dde6;
    font-weight: bold;
  }
  .inquiry-head>ul>li>p{
    display: table-cell;
    vertical-align: middle;
  }
  .inquiry-head>ul>li:last-child{
    border-right: none;
  }
  .inquiry-body>ul{
    background: #fff;
    padding: 0 10px;
    height:60px;
    border-bottom: 1px solid #e6ecf5;
    position: relative; /*z-index 需要在定位下才起作用，此代码为解决box-shadow被隐藏*/

  }
  .inquiry-body>ul:hover{
    z-index: 99;/*z-index 需要在定位下才起作用，此代码为解决box-shadow被隐藏*/
    box-shadow:0px -1px 20px 3px #dce0e5;
  }

  .inquiry-body li.inquirybody-checkBox,
  .inquiry-head li.inquiryhead-checkBox{
    width:70px;
  }
  .inquiry-body li.inquirybody-content,
  .inquiry-head li.inquiryhead-content{
    width:calc(100% - 1060px);
  }
  .inquiry-body li.inquirybody-date,
  .inquiry-head li.inquiryhead-date{
    width:130px;
  }
  .inquiry-body li.inquirybody-client,
  .inquiry-head li.inquiryhead-client{
    width:220px;
  }
  .inquiry-body li.inquirybody-site,
  .inquiry-head li.inquiryhead-site{
    width:280px;
  }
  .inquiry-body li.inquirybody-email,
  .inquiry-head li.inquiryhead-email{
    width:190px;
  }
  .inquiry-body li.inquirybody-country,
  .inquiry-head li.inquiryhead-country{
    width:70px;
  }
  .inquiry-body li.inquirybody-state,
  .inquiry-head li.inquiryhead-state{
    width:100px;
  }
  @media (max-width: 1366px) {
    .inquiry-head li,
    .inquiry-body li {
      padding: 0 10px;
    }
    .inquiry-body li.inquirybody-content,
    .inquiry-head li.inquiryhead-content{
      width:calc(100% - 820px);
    }
    .inquiry-body li.inquirybody-client,
    .inquiry-head li.inquiryhead-client{
      width:150px;
    }
    .inquiry-body li.inquirybody-site,
    .inquiry-head li.inquiryhead-site{
      width:180px;
    }
    .inquiry-body li.inquirybody-email,
    .inquiry-head li.inquiryhead-email{
      width:120px;
    }
  }
  
  
  @media (min-width: 1367px) and (max-width: 1652px) {
    .inquiry-head li,
    .inquiry-body li {
      padding: 0 10px;
    }
    .inquiry-body li.inquirybody-content,
    .inquiry-head li.inquiryhead-content{
      width:calc(100% - 1020px);
    }
    .inquiry-body li.inquirybody-client,
    .inquiry-head li.inquiryhead-client{
      width:200px;
    }
    .inquiry-body li.inquirybody-date,
    .inquiry-head li.inquiryhead-date{
      width:120px;
    }
    .inquiry-body li.inquirybody-site,
    .inquiry-head li.inquiryhead-site{
      width:270px;
    }
  }
  
  .inquiry-body li.inquirybody-state>.btn-unissue,
  .inquiry-body li.inquirybody-state>.btn-issue {
    display: block;;
    width: 17px;
    height: 17px;
    margin: 20px auto;
    cursor: pointer;
    position: relative;
  }
  .inquiry-body li.inquirybody-state>.btn-issue{
    background: url("/static/res/images/cms/state-issue.png");
  }
  .inquiry-body li.inquirybody-state>.btn-unissue{
    background: url("/static/res/images/cms/state-unissue.png");
  }

  .inquiry-body li.inquirybody-state>.btn-unissue:hover:before,
  .inquiry-body li.inquirybody-state>.btn-unissue:hover:after,
  .inquiry-body li.inquirybody-state>.btn-issue:hover:before,
  .inquiry-body li.inquirybody-state>.btn-issue:hover:after{
    display: block;
  }
  .inquiry-body li.inquirybody-state>.btn-issue:after,
  .inquiry-body li.inquirybody-state>.btn-unissue:after{
    display: none;
    content: "未回复";
    width: 70px;
    height:30px;
    line-height: 30px;
    color: #fff;
    background-color: #33c0cc;
    position: absolute;
    top:-35px;
    left: -25px;
    border-radius: 2px;
  }
  .inquiry-body li.inquirybody-state>.btn-issue:after{
    content: "已回复";
  }
  .inquiry-body li.inquirybody-state>.btn-issue:before,
  .inquiry-body li.inquirybody-state>.btn-unissue:before{
    display: none;
    content: "";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #33c0cc;
    position: absolute;
    top:-6px;
    left: 3px;
  }
  .search-box {
    padding:0px 10px;
    margin: 10px 15px;
    overflow: hidden;
    background: #fff;
  }
  .search-head .group-box:nth-child(1),
  .search-head .group-box:nth-child(2),
  .search-head .group-box:nth-child(3){
    width:22%;
  }
  .search-head .group-box:nth-child(4){
    width:calc(100% - 80%);
  }
  .search-head .group-box:nth-child(5){
    width:14%;
  }

  @media (max-width: 1366px) {
    .search-head .group-box:nth-child(1),
    .search-head .group-box:nth-child(2),
    .search-head .group-box:nth-child(3),
    .search-head .group-box:nth-child(4),
    .search-head .group-box:nth-child(5){
      width:20%;
    }
  }
  .search-head .group-box{
    float: left;
    padding:0 15px;
    overflow: hidden;
    border-right: 1px solid #e6ecf5;
  }
  .search-head .group-box:nth-child(4),
  .search-head .group-box:nth-child(5){
    border-right: none;
  }
  .group-box span{
    font-size: 12px;
    color:#33c0cc;
    height:28px;
    line-height:28px;
  }
  .group-box .form-control{
    height:28px;
    line-height:28px;
    font-size: 12px;
    padding:0 12px;
    border-radius: 3px;
  }
  .group-box>div,
  .group-box span{
    float: left;
  }
  .group-box:nth-child(1) span{
    width:70px;
  }
  .group-box:nth-child(1)>div{
    width:calc(100% - 70px);
  }
  .group-box:nth-child(2) span,
  .group-box:nth-child(3) span{
    width:40px;
  }
  .group-box:nth-child(2)>div,
  .group-box:nth-child(3)>div{
    width:calc(100% - 40px);
  }
  .group-box:nth-child(5) span{
    width:100px;
  }
  .group-box:nth-child(5)>div{
    width:calc(100% - 100px);
  }

  a.btn-export,
  a.btn-inquire{
    width:70px;
    height:28px;
    line-height:28px;
    border: 1px solid #33c0cc;
    display: inline-block;
    color: #33c0cc;
    margin-right: 10px;
    border-radius: 3px;
    text-decoration: none;
  }

  /*end css for inquiry*/
  /*css for inquiryStatistics*/
  .inquiryhead-num,
  .inquirybody-num{
    width:5%;
  }
  .inquiryhead-clientManager,
  .inquirybody-clientManager,
  .inquiryhead-clientName,
  .inquirybody-clientName,
  .inquiryhead-inquiryNum,
  .inquirybody-inquiryNum{
    width:30%;
  }
  /*end css for inquiryStatistics*/


  .manage-body{
    margin: 10px 15px 0 15px;
    background-color: #fff;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    min-width: 1099px;
  }
  .data-head>ul{
    overflow: hidden;
    display: flex;
    background: #fff;
    padding: 16px 10px;
    border-bottom: 1px solid #e6ecf5;
    border-radius: 3px;
  }
  .data-head>ul>li{
    font-size: 14px;
    color: #666;
    line-height:30px;
    height:30px;
    overflow: hidden;
    padding:0 10px;
    border-right: 1px solid #d8dde6;
    flex:1;
    text-align: left;
    font-weight: bold;
  }
  .data-head>ul>li.head-type,
  .data-head>ul>li.head-state,
  .data-body>ul>li.body-type,
  .data-body>ul>li.body-state{
    flex: 0 0 60px;
  }
  .data-body>ul>li.body-type,
  .data-body>ul>li.body-state{
  }
  .data-head>ul>li.head-initial,
  .data-body>ul>li.body-initial,
  .data-head>ul>li.head-initial-drafts,
  .data-body>ul>li.body-initial-drafts{
    flex: 0 0 320px;
  }
  .data-head>ul>li.head-official,
  .data-body>ul>li.body-official{
    flex: 0 0 200px;
  }
  .data-head>ul>li.head-operation,
  .data-body>ul>li.body-operation{
    flex: 0 0 210px;
    border: none;
  }

  @media(max-width: 1399px){
    .data-head>ul>li.head-initial,
    .data-body>ul>li.body-initial,
    .data-head>ul>li.head-official,
    .data-body>ul>li.body-official{
      flex: 0 0 150px;
    }
    .data-head>ul>li.head-name,
    .data-body>ul>li.body-name{
      flex: 0 0 150px;
    }
    .data-head>ul>li.head-operation,
    .data-body>ul>li.body-operation{
      flex: 0 0 180px;
      border: none;
    }
  }
  @media (min-width: 1400px) and (max-width: 1652px) {
  	.data-head>ul>li.head-operation,
  	.data-body>ul>li.body-operation{
	    flex: 0 0 150px;
  	}
  	.data-head>ul>li.head-initial,
  	.data-body>ul>li.body-initial,
  	.data-head>ul>li.head-initial-drafts,
  	.data-body>ul>li.body-initial-drafts{
  		flex: 0 0 180px;
  	}
  	.data-head>ul>li.head-official,
  	.data-body>ul>li.body-official{
  		flex: 0 0 180px;
  	}
  }
  .data-body>ul{
  	transition: 0.5s all ease;
    -moz-transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
    display: flex;
    background: #fff;
    padding: 0 10px;
    height:60px;
    border-bottom: 1px solid #e6ecf5;
    position: relative; /*z-index 需要在定位下才起作用，此代码为解决box-shadow被隐藏*/

  }
  .data-body>ul:hover{
     z-index: 99;/*z-index 需要在定位下才起作用，此代码为解决box-shadow被隐藏*/
     box-shadow:0px -1px 20px 3px #dce0e5;
  }
  .data-body>ul>li{
    font-size: 14px;
    color: #666;
    height:60px;
    padding:0 10px;
    flex:1;
    text-align: left;
    display: flex;
    align-items: center;/*垂直居中*/
    flex-flow: row wrap;
  }
  .data-body>ul>li p{
    margin: 0;
  }
  .data-body>ul:nth-of-type(odd){
    background-color: #f4f7fb;
  }
  .data-body>ul>li:first-child,
  .data-body>ul>li a{
    color:#0c67ae;
    word-break: break-all;
  }
  .data-body>ul>li a>span{
    float: left;
    margin-right: 10px;
  }
  .data-body>ul>li a.btn-icon{
    display: inline-block;
    margin: 0 5px;
  }


  @media(max-width: 1400px) {
    .data-body > ul,
    .data-body > ul > li {
      height: 80px;
    }
  }


  .btn-icon:after{
  	transition: 0.5s all ease;
    -moz-transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
    opacity: 0;
    width: 70px;
    height:30px;
    line-height: 30px;
    color: #fff;
    background-color: #33c0cc;
    position: absolute;
    top:-35px;
    left: -25px;
    border-radius: 2px;
  }
  .btn-icon:before{
  	transition: 0.s all ease;
    -moz-transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
    opacity: 0;
    content: "";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #33c0cc;
    position: absolute;
    top:-6px;
    left: 3px;
  }
  .btn-issue:after{
    content: "已发布";
  }
  .btn-online:after{
    content: "已上线";
  }
  .btn-draft:after{
    content: "草稿";
  }
  .btn-edit:after{
    content: "编辑";
  }
  .btn-inquiry:after{
    content: "询盘";
  }
  .btn-flow:after{
    content: "网站数据";
  }
  .btn-relevance:after{
    content: "绑定域名";
  }
  .btn-rPhone:after{
    content: "关联移动端";
  }
  .btn-copy:after{
    content: "复制";
  }
  .btn-del:after{
    content: "删除";
  }
  .btn-add:after{
    content: "新增";
  }
  .btn-update:after{
    content: "修改";
  }
  .btn-pc:after{
    content: "pc端";
  }
  .btn-phone:after{
    content: "移动端";
  }

  .btn-icon{
    position: relative;
    background-image: url('/static/res/images/cms/icon.png');
    width:19px;
    height: 19px;
    cursor: pointer;
  }
  /*.btn-edit,.btn-online,*/
  /*.btn-issue,.btn-inquiry,*/
  /*.btn-flow,.btn-relevance,*/
  /*.btn-rPhone,.btn-copy,.btn-del{*/
    /*width:20px;*/
    /*height: 20px;*/
  /*}*/
  .btn-edit{
    background-position:  -598px -398px;
  }
  .btn-online{
    position: relative;
    background-position:  -198px -198px;
  }
  .btn-draft{
    background-position:  -98px -198px;
  }
  .btn-
  .btn-issue{
    position: relative;
    background-position:  -299px -198px;
  }
  .btn-icon:hover:before,
  .btn-icon:hover:after{
    opacity: 1;
  }
  .btn-inquiry{
    background-position:1px -98px;
  }
  .btn-inquiry:hover{
    background-position:1px 1px;
  }
  .btn-flow{
    background-position: -99px -98px;
  }
  .btn-flow:hover{
    background-position: -99px 1px;
  }
  .btn-relevance{
    background-position: -199px -98px;
  }
  .btn-relevance:hover{
    background-position: -199px 1px;
  }
  .btn-rPhone{
    background-position: -299px -97px;
  }
  .btn-rPhone:hover{
    background-position: -299px 2px;
  }
  .btn-copy{
    background-position: -399px -97px;
  }
  .btn-copy:hover{
    background-position: -399px 2px;
  }
  .btn-del{
    background-position: -499px -97px;
  }
  .btn-del:hover{
    background-position: -499px 2px;
  }
  .btn-add{
    background-position:  -398px -297px;
  }
  .btn-update{
    background-position:  -598px -297px;
  }
  .btn-add:hover{
    background-position:  -398px -197px;
  }
  .btn-update:hover{
    background-position:  -598px -197px;
  }
  .body-type .btn-pc,.body-type .btn-phone{
    width: 25px;
    height:25px;
  }
  .btn-pc{
    background-position:  1px -500px;
  }
  .btn-phone{
    background-position:  -100px -500px;
  }
</style>
