/**
 * 全局方法插件
 * @type {{}}
 */
const NgPlugins = {}
NgPlugins.install = function (Vue, options) {
  // 全局静态方法，通过Vue去调用的
  Vue.test = function () {
    console.log('Welcome to Vue world!')
  }

  // 将二维数组排序（实例方法）
  Vue.prototype.$ArrayOrder = function (arr, field, order) {
    if (arr.length <= 0) return
    if (!field) return arr
    if (!order) return arr
    if (arr.length <= 0) return arr
    // 升序
    if (order === 'a') {
      // 数字类型
      if (/^\d+\.?\d{0,}?$/.test(arr[0][field])) {
        arr.sort(function (x, y) {
          return x[field] - y[field]
        })
      } else {
        arr.sort(function (x, y) {
          if (x[field] !== null && y[field] !== null && x[field] !== undefined && y[field] !== undefined) {
            return x[field].localeCompare(y[field])
          }
        })
      }
    }
    // 降序
    if (order === 'd') {
      // 数字类型
      if (/^\d+\.?\d{0,}?$/.test(arr[0][field])) {
        arr.sort(function (x, y) {
          return y[field] - x[field]
        })
      } else {
        arr.sort(function (x, y) {
          if (x[field] !== null && y[field] !== null && x[field] !== undefined && y[field] !== undefined) {
            return y[field].localeCompare(x[field])
          }
        })
      }
    }
  }

  // RMB 格式化（实例方法）
  Vue.prototype.$toFixed = function (v) {
    if (isNaN(v)) {
      return v
    }
    v = (Math.round((v - 0) * 100)) / 100
    v = (v === Math.floor(v)) ? v + '.00' : ((v * 10 === Math.floor(v * 10)) ? v + '0' : v)
    v = String(v)
    var ps = v.split('.')
    var whole = ps[0]
    var sub = ps[1] ? '.' + ps[1] : '.00'
    var r = /(\d+)(\d{3})/
    while (r.test(whole)) {
      whole = whole.replace(r, '$1' + ',' + '$2')
    }
    v = whole + sub
    return v
  }

  // 根据系列ID遍历sort数组获取系列类型
  Vue.prototype.$getCampaignType = function (cid) {
    let sort = options.store._modules.root.state.sort.data
    let campaignType = null
    for (let arr of sort) {
      if (arr.id === cid) {
        campaignType = arr.type
        break
      }
    }
    return campaignType
  }

  // 计算时间整数形式
  Vue.prototype.$changeToDate = function (date) {
    let h = parseInt(date / 3600)
    let min = parseInt(date % 3600 / 60)
    let mec = date % 60
    let temp = ''
    if (h < 1 && min <1) {
      temp = mec + '秒'
      return temp
    } else if (h < 1 && min >= 1) {
      temp = min + '分' + mec + '秒'
      return temp
    } else {
      temp = h + '时' + min + '分' + mec + '秒'
      return temp
    }
  }

  // 根据系列ID遍历sort数组获取系列类型(全局静态方法)
  Vue.getCampaignType = function (cid) {
    let sort = options.store._modules.root.state.sort.data
    let campaignType = null
    for (let arr of sort) {
      if (arr.id === cid) {
        campaignType = arr.type
        break
      }
    }
    return campaignType
  }

  // 进入视图
  Vue.prototype.$actionView = function () {
    let campaignType = Vue.getCampaignType()
    console.log(campaignType)
  }

  // 转换系列状态中文
  Vue.prototype.$getCampaignStatusName = function (status) {
    let statusName = {
      ENABLED: '已启用',
      PAUSED: '已暂停',
      REMOVED: '已移除'
    }
    return statusName[status]
  }

  // 出价策略枚举
  Vue.prototype.$strategy = function (type) {
    let biddingStrategy = {
      TARGET_SPEND: '尽可能争取更多点击次数（默认）',
      TARGET_CPA: '目标每次转化费用',
      TARGET_ROAS: '目标广告支出回报率',
      PAGE_ONE_PROMOTED: '目标搜索页位置',
      TARGET_OUTRANK_SHARE: '排名胜出率目标',
      MANUAL_CPC: '每次点击费用人工出价'
    }
    return biddingStrategy[type]
  }

  Object.defineProperties(Vue.prototype, {
    $rest: {
      get: function get () {
        var $vm = this
        return {
          defaultOptions: {
            showError: true
          },
          wrapPromise: function (promise, options) {
            options = Object.assign({}, this.defaultOptions, options)

            return new Promise((resolve, reject) => {
              promise.then((rsp) => {
                if (rsp.body.code === undefined || rsp.body.code === 0) {
                  resolve.call($vm, rsp.body)
                } else  {
                  if (rsp.body.code === 4) {
                    //没有登录
                    $vm.$alert('您还未登录或登录已失效，请重新登录', '错误', {
                      type: 'error',
                      confirmButtonText: '确定'
                    }).then(() => {
                      window.location.href = $vm.GLOBAL.LOGIN_URL.replace('{redirect}', encodeURIComponent(window.location.href))
                    })
                    return
                  }
                  if (rsp.body && rsp.body.exceptionTrace) {
                    console.error("Server error trace:\n" + rsp.body.exceptionTrace)
                  }
                  if (options.showError) {
                    $vm.$confirm((rsp.body && rsp.body.msg) || '请求服务器错误', '错误', {
                      showCancelButton: false,
                      confirmButtonText: '确定',
                      type: 'error'
                    })
                  }
                  reject.call($vm, rsp)
                }
              }, (rsp) => {
                if (options.showError) {
                  $vm.$confirm((rsp.body && rsp.body.msg) || '请求服务器错误', '错误', {
                    showCancelButton: false,
                    confirmButtonText: '确定',
                    type: 'error'
                  })
                }
                reject.call($vm, rsp)
              })
            })
          },
          get (url, params, options) {
            return this.wrapPromise($vm.$http.get(url, Object.assign({
              params: params
            }, options)), options)
          },
          post(url, params, options) {
            return this.wrapPromise($vm.$http.post(url, params, options), options)
          }
        }
      }
    }
  })
  Vue.prototype.$conf = function (msg, type) {
    return this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type || 'warning'
      }
    )
  }
  Vue.prototype.$tip = function (msg, type) {
    return this.$message({
      message: msg,
      type: type || 'success'
    })
  }
  Vue.prototype.$jurisdiction = function (id) {
  	let jurisdiction = new Set(this.$store.state.sitetemplate.jurisdiction)
  	return jurisdiction.has(id)
  }
}

export default NgPlugins
