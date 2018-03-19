/**
 * 所有调取后台API 都在此处
 * successCallback   成功回调
 * errorCallback     失败回调
 */
import Vue from 'vue'
import * as testData from './testData'
const timeout = 600000   // 请求超时60000毫秒,一分钟
window.openTest = true // 是否打开测试数据

export default {
  // 测试数据
  testData (successCallback = () => {}) {
    let flag = false
    if (window.openTest) {
      flag = true
      setTimeout(function () {
        successCallback(testData.datalist)
      }, 200)
    }
    return flag
  },

  /**
   * 获取所有管理员
   * @param successCallback
   * @param errorCallback
   */
  getAdmins (successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData()) {
      successCallback(testData.admins)
      return
    }
    Vue.http.get('/cms/rest/summary/geDirectory', {timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 获取所有客户
   * @param uid  管理员ID
   * @param successCallback
   * @param errorCallback
   */
  getCustomers (uid = null, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData()) {
      successCallback(testData.customers)
      return
    }
    Vue.http.get('/clientmgr/client/listUserClient', {params: {userId: uid}, timeout: timeout}).then(response => {
      successCallback(response.body.data)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 获取accounts账号
   * @param cid  客户ID
   * @param successCallback
   * @param errorCallback
   */
  getAccounts (cid = null, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData()) {
      successCallback(testData.accounts)
      return
    }
    Vue.http.get('/clientmgr/clientAccount/select', {params: {clientId: cid}, timeout: timeout}).then(response => {
      successCallback(response.body.data)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 获取服务器快捷时间
   * @param successCallback
   * @param errorCallback
   */
  getServicesTime (successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData()) {
      successCallback(testData.time)
      return
    }
    Vue.http.post('/am/system/datetime', {}, {timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询分类系列
   * @param argus = {
   *     clientId,      客户ID
   *     accountName,   客户名称
   *     status,        ALL-所有 ENABLED-启用 UNDELETED-未删除
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   * }
   * @param successCallback
   * @param errorCallback
   */
  getSortMenu (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/campaign/menu', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询分类系列下组
   * @param argus = {
   *     clientId,      客户ID
   *     accountName,   客户名称
   *     campaignId,    广告系列ID
   *     status,        ALL-所有 ENABLED-启用 UNDELETED-未删除
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   * }
   * @param successCallback
   * @param errorCallback
   */
  getSortGroup (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/group/menu', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询某系列详细信息
   * @param argus = {
   *     clientId,      客户ID
   *     accountName,   客户名称
   *     campaignId,    广告系列ID
   *     status,        ALL-所有 ENABLED-启用 UNDELETED-未删除
   *     accountId,     账号ID
   * }
   * @param successCallback
   * @param errorCallback
   */
  getCampaignInfo (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/campaign/id/head', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有系列数据
   * @param argus = {
   *     clientId,      客户ID
   *     accountName,   客户名称
   *     status,        ALL-所有 ENABLED-启用 UNDELETED-未删除
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAllSeriesList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/campaign/list', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有广告组
   * @param argus = {
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     status,        ALL-所有 ENABLED-启用 UNDELETED-未删除
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAllGroupList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/group/list', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有设置
   * @param argus = {
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAllSettingList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/setting/list', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有设置-地理位置
   * @param argus = {
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAllSettingLocationList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/setting/location/mcc', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有设置-广告投放时间
   * @param argus = {
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAllSettingDeliveryTimeList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/setting/advertime/mcc', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有设置-设备
   * @param argus = {
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAllSettingDeviceList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/ad/setting/devices/mcc', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有设置-设备-0组级别,1系列级别
   * @param argus = {
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAllSettingDeviceSelectList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/setting/devices/queryType', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询某系列下的所有广告组
   * @param argus = {
   *     campaignId,    广告系列ID
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getGroupList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/group/campaignid/list', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询某系列下的所有广告组-帅选
   * @param argus = {
   *     campaignId,    广告系列ID
   *     status,        ALL-所有 ENABLED-启用 UNDELETED-未删除
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getMixGroupSelectList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/group/campaignId/status', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有广告
   * @param argus = {
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAlladvertsList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/groupAds/mcc', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  },

  /**
   * 查询所有广告
   * @param argus = {
   *     clientId,      客户ID
   *     accountId,     账号ID
   *     start,         开始时间
   *     end,           结束时间
   *     pageNum,       页码
   *     pageSize       每页N条
   * }
   * @param successCallback
   * @param errorCallback
   */
  getAdvertsList (argus = {}, successCallback = () => {}, errorCallback = () => {}) {
    if (this.testData(successCallback)) return
    Vue.http.get('/am/groupAds/mcc/campaignId', {params: argus, timeout: timeout}).then(response => {
      successCallback(response.body)
    }, response => {
      errorCallback(response.body)
    })
  }
}
