<style scoped>
  #ng-tree{max-height: 500px;overflow: hidden; overflow-y: auto;}
  .sort{display: block;  position: relative;margin-bottom: 20px;}
  .sort.no-margin{margin-bottom:0;}
  .sort .hide{display:none;}
  .sort .show-sort{width:22px;position: absolute; top:0px; left: -15px; font-size:12px; background-color: #f6f6f6; color:#999; cursor: pointer; opacity: 0.4;text-align: center;display: block; border:1px solid #e9e9e9;border-left:0;}
  .sort .show-sort:hover{opacity: 1}
  .sort #title{height:35px; line-height: 35px; border-bottom:1px solid #ddd;padding:0 15px; color:#666;}
  .sort #title .close{margin-top:10px; font-size:14px; display: none;position: absolute;right: 20px;}
  .sort:hover #title .close{display: block}
  .sort .content{background-color: #f1f1f1;min-height: 500px !important; border-radius: 5px}
  .sort .tree{padding: 10px;overflow: hidden;}
  .sort .tree .tree{padding: 0;padding-left: 40px;display: none;}
  .sort .tree li{padding: 3px 0;overflow: hidden;}
  .sort .tree li .fold{display: block;float: left;width: 12px;height: 12px;background: url('./../../assets/images/fold.png') 0 0 no-repeat;cursor: pointer; opacity:0.5;margin-top: 5px;margin-right: 5px;}
  .sort .tree li.open .fold{background-position-y: -12px;}
  .sort .tree li.open .tree{display: block;}
  .sort .tree li .title{width: 85%;color: #666;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;cursor: pointer;}
  .sort .tree li .title:hover{color: #000}
  .sort .tree li .title:hover .icon{background-color: #b1b0b0;}
  .sort .tree li .last{opacity: 0;}
  .sort .tree li .title .icon{background-color: #ccc;padding: 3px;border-radius: 1px;color: #fff;float: left;margin-right: 3px;}
  .sort .tree li .title .icon.hide{display: none;}
  .sort .tree li .activeSeries{color:#666; background-color: #ddd; border-radius: 3px; padding:0 5px;}
  .sort .tree li .activeSeries .icon{background-color: #ddd; top:0;}
  .sort .tree li .activeSeries:hover .parent-title{color:#666;}
  .sort .tree li .activeSeries:hover .icon{background-color: #ddd;}
  .sort .tree li .activeGroup .chi-title{color:#666; font-weight: 900}
  .loadding{color: #999;font-size: 10px;}
  @media screen and (max-width: 1400px ){.sort .tree .tree{padding-left: 10px;}}
</style>

<template>
  <div class="col-sm-2 sort" :class="{'no-margin': sortToggle}">
    <span v-show="sortToggle" @click="show" class="show-sort">展开分类</span>
    <div :class="{'hide': sortToggle}" class="advert-slider plr10">
      <div class="content">
        <div id="title">
         <span class="glyphicon glyphicon-th"></span>  所有广告系列分类
          <span @click="hide" class="glyphicon glyphicon-remove pull-right close" title="隐藏分类"></span>
        </div>
        <div class="text-muted padding" v-if="sort.length == 0 && isLoad == false">
          <span class="glyphicon glyphicon-exclamation-sign"></span> 暂无广告系列分类数据！
        </div>
        <div class="text-muted padding" v-show="isLoad">
          <img width="18" src="../../assets/images/loading.gif" alt=""> 分类数据加载中...
        </div>
        <div id="ng-tree">
          <ul class="tree">
            <li :class="{open: item.open}" v-for="(item,index) in sort">
              <i @click="openGroup(item, index)" :id="item.id" class="fold"></i>
              <div :class="{activeSeries: activeSeriesId === item.id}" @click="actionSeries(item, index)" :title="item.name" class="title">
                 <span class="parent-title">
                  <i v-if="item.icon" :class="item.icon" class="icon  glyphicon"></i>
                  {{item.name}}
                 </span>
              </div>
              <ul v-if="item.children.length>0" class="tree">
                <li :class="{activeGroup: activeGroupId === child.id}" v-for="child in item.children">
                  <div @click="actionGroup(child, item.type)" :title="child.name" class="title">
                    <span class="chi-title">{{child.name}}</span>
                  </div>
                </li>
              </ul>
              <ul class="tree loadding" v-else>
                <li>
                  <img width="18" src="../../assets/images/loading.gif" alt=""> 加载中...
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sort',
    data () {
      return {
      }
    },
    computed: {
      componentView () {
        return this.$store.state.componentView
      },
      sort: {
        get () {
          return this.$store.state.sort.data
        },
        set (val) {
          this.$store.commit('SORT_OPEN', val)
        }
      },
      isLoad () {
        return this.$store.state.sort.isLoad
      },
      sortToggle () {
        return this.$store.state.sortToggle
      },
      activeSeriesId () {
        return this.$store.state.sort.activeSeriesId
      },
      activeGroupId () {
        return this.$store.state.sort.activeGroupId
      }
    },
    methods: {
      // 隐藏sort
      hide () {
        this.$store.commit('SORT_HIDE_DOM')
      },
      // 显示sort
      show () {
        this.$store.commit('SORT_SHOW_DOM')
      },
      // 展开组
      openGroup (item, index) {
        // 判断如果系列下的组加载过就不加载了
        if (item.children.length > 0) {
          this.sort[index].open = !this.sort[index].open
          return
        }
        this.sort[index].open = !this.sort[index].open
        // 获取当前系列下的所有组
        this.$store.dispatch('Root_getSortGroup', item)
      },

      // 访问系列
      actionSeries (item, index) {
        // 获取系列信息
        this.$store.dispatch('Root_CampaignInfo', item)
        // 模拟点击了搜索按钮，状态变一下(处理所有分页归位)
        this.$store.commit('QUERY_CHANGE_STATE')
        // 展开组
        this.sort[index].open = true
        // 判断类型,进入相应的类型视图
        switch (item.type) {
          case 'DISPLAY':
            // 加载Display视图
            this.$store.commit('COMPONENT_VIEW', {path: 'Display'})
            // 重置仅展示系列视图到默认
            this.$store.commit('DISPLAY_RESET_DEFAULT_VIEW')
            // 获取广告组列表
            this.$store.dispatch('Display_getGroupList')
            break
          case 'SEARCH':
            // 加载Search视图
            this.$store.commit('COMPONENT_VIEW', {path: 'Search'})
            // 重置仅搜索系列视图到默认
            this.$store.commit('SEARCH_RESET_DEFAULT_VIEW')
            // 获取广告组列表
            this.$store.dispatch('Search_getGroupList')
            break
        }

        // 获取当前系列下的所有组
        this.$store.dispatch('Root_getSortGroup', item)
      },
      // 访问组
      actionGroup (item, type) {
        console.log(item)
        console.log(type)
        this.$store.dispatch('Search_getAdertsList')
        // 判断类型,进入相应的类型视图
        switch (type) {
          case 'DISPLAY':
            // 添加一个键直对类型到item
            item.moduleType = 'DisplayModule'
            // 加载Display视图
            this.$store.commit('COMPONENT_VIEW', {path: 'Display'})
            // 加载组级别视图
            this.$store.commit('DISPLAY_MAIN_VIEW', {path: 'D-Group'})
            // 重置组级别下默认显示视图
            this.$store.commit('DISPLAY_GROUP_VIEW', {path: 'D-G-Adverts'})
            break
          case 'SEARCH':
            // 添加一个键直对类型到item
            item.moduleType = 'SearchModule'
            // 加载Search视图
            this.$store.commit('COMPONENT_VIEW', {path: 'Search'})
            // 加载组级别视图
            this.$store.commit('SEARCH_MAIN_VIEW', {path: 'S-Group'})
            // 重置组级别下默认显示视图
            this.$store.commit('SEARCH_GROUP_VIEW', {path: 'S-G-Adverts'})
            break
        }
        // 传递组对象
        this.$store.commit('SORT_SEND_GROUP', item)
      }
    }
  }
</script>

