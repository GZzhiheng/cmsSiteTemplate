<template>
  <section class="table-flip-scroll creation">
    <table class="table table-bordered cf">
      <thead class="cf">
      <tr>
        <th class="numeric no-after"><input type="checkbox"/></th>
        <th class="numeric">启停(状态)</th>
        <th class="numeric">广告组</th>
        <th class="numeric">状态</th>
        <th class="numeric">默认每次最高点击费用 </th>
        <th class="numeric">展示次数 </th>
        <th class="numeric">点击次数</th>
        <th class="numeric">平均点击费用 </th>
        <th class="numeric">总费用</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="list.data.length<=0">
        <td colspan="11">
          <div class="alert  mt-15 text-left" role="alert"><span class="glyphicon glyphicon-exclamation-sign"></span> 暂无<strong>广告组</strong>数据！</div>
        </td>
      </tr>
      <tr v-for="item in list.data">
        <td><input type="checkbox"/></td>
        <td>
          <div class="btn-group">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <i v-if="item.status == 'ENABLED'" class="glyphicon glyphicon-play"></i>
              <i v-if="item.status == 'PAUSED'" class="glyphicon glyphicon-pause"></i>
              <i v-if="item.status == 'REMOVED'" class="glyphicon glyphicon-remove"></i>
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li :class="{active: item.status == 'ENABLED'}">
                <a href="javascript:void(0)"><i title="已启用" class="glyphicon glyphicon-play"></i>已启用</a>
              </li>
              <li :class="{active: item.status == 'PAUSED'}">
                <a href="javascript:void(0)"><i title="已暂停" class="glyphicon glyphicon-pause"></i>已暂停</a>
              </li>
              <li :class="{active: item.status == 'REMOVED'}">
                <a href="javascript:void(0)"><i title="已移除" class="glyphicon glyphicon-remove"></i>已移除</a>
              </li>
            </ul>
          </div>

        </td>
        <td class="numeric form-plugin">
          <a href="">{{item.name}}</a>
          <i class="glyphicon glyphicon-pencil" data-toggle="dropdown" title="点击修改"></i>
          <div class="dropdown-menu form-plugin-dom">
            <div class="btn-group">
              <input type="text" class="form-control" :value="item.name"/>
            </div>
            <div class="btn-group">
              <button class="btn btn-primary btn-xs">保存</button>
            </div>
            <div class="btn-group">
              <button class="btn btn-default btn-xs">取消</button>
            </div>
          </div>
        </td>
        <td class="numeric">
          {{$getCampaignStatusName(item.status)}}
        </td>
        <td class="numeric budget-day">
          <span>￥{{$toFixed(item.defaultMaxClickCor)}}</span>
          <i class="glyphicon glyphicon-pencil" data-toggle="dropdown" title="点击修改"></i>
          <div class="dropdown-menu budget-update">
            <div class="btn-group">
              <label>￥</label>
              <input type="text" class="form-control display-inline" :value="$toFixed(item.defaultMaxClickCor)"/>
              <span>/天</span>
            </div>
            <div class="btn-group">
              <button class="btn btn-primary btn-xs">保存</button>
            </div>
            <div class="btn-group">
              <button class="btn btn-default btn-xs">取消</button>
            </div>
            <p>实际每日支出可能会上下波动。</p>
          </div>
        </td>
        <td class="numeric">{{item.report.impressions}}</td>
        <td class="numeric">{{item.report.clicks}}</td>
        <td class="numeric">￥{{$toFixed(item.report.avgCpc)}}</td>
        <td class="numeric">￥{{$toFixed(item.report.cost)}}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr v-show="list.data.length>0">
        <td colspan="4">总计</td>
        <td class="numeric">￥{{$toFixed(list.total['defaultAvgCpc'])}}</td>
        <td class="numeric">{{list.total['Impressions']}}</td>
        <td class="numeric">{{list.total['Clicks']}}</td>
        <td class="numeric">￥{{$toFixed(list.total['Avg. CPC'])}}</td>
        <td class="numeric">￥{{$toFixed(list.total['Avg. Cost'])}}</td>
      </tr>
      </tfoot>
    </table>
  </section>
</template>
<script>
  export default {
    name: 'public-group-list',
    data () {
      return {
      }
    },
    props: {
      list: Object
    },
    methods: {
    }
  }
</script>
