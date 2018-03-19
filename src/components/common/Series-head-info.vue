<template>
  <div class="creation">
    <div class="info">
      <div class="name">
        广告系列：<strong>{{campaign.name}}</strong>
        <img v-show="!campaign.name" width="15" src="../../assets/images/loading.gif" alt="">
      </div>
      <div class="status">
        <div class="btn-group">
          <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <i v-if="campaign.status == 'ENABLED'" class="glyphicon glyphicon-play"></i>
            <i v-if="campaign.status == 'PAUSED'" class="glyphicon glyphicon-pause"></i>
            <i v-if="campaign.status == 'REMOVED'" class="glyphicon glyphicon-remove"></i>
            <strong>{{$getCampaignStatusName(campaign.status)}}</strong>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li :class="{active: campaign.status == 'ENABLED'}">
              <a href="javascript:void(0)"><i title="已启用" class="glyphicon glyphicon-play"></i>已启用</a>
            </li>
            <li :class="{active: campaign.status == 'PAUSED'}">
              <a href="javascript:void(0)"><i title="已暂停" class="glyphicon glyphicon-pause"></i>已暂停</a>
            </li>
            <li :class="{active: campaign.status == 'REMOVED'}">
              <a href="javascript:void(0)"><i title="已移除" class="glyphicon glyphicon-remove"></i>已移除</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="type">
        类型：
        <strong v-show="campaign.type == 'SEARCH'"> 仅限搜索广告</strong>
        <strong v-show="campaign.type == 'DISPLAY'"> 仅限展示广告</strong>
        <img v-show="!campaign.type" width="15" src="../../assets/images/loading.gif" alt="">
      </div>
      <div class="budget">
        预算：<strong v-show="campaign.budgeAmount">￥{{$toFixed(campaign.budgeAmount)}}/天</strong>
        <img v-show="!campaign.budgeAmount" width="15" src="../../assets/images/loading.gif" alt="">
      </div>
      <div class="position" :title="campaign.locationName">
        定位：<strong>{{campaign.locationName}}</strong>
        <img v-show="!campaign.locationName" width="15" src="../../assets/images/loading.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vue',
    data () {
      return {
      }
    },
    props: {
      campaign: Object
    }

  }
</script>
