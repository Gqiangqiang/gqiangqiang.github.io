#### `index.js` 其他公共方法的统一出口
```JavaScript
/**
 * 路由
 */
import Router from './common/router.js'
// 创建并导出Router实例对象
export const router = new Router()

/**
 * 文件上传
 */
import fileUpload from './common/fileUpload.js'
/**
 * 选择文件上传 单文件
 * @param {String} uploadPath 上传接口
 * @param {Object} options 与uni.chooseImage相同的参数配置(success、fail、count除外)
 */
export const choolseImageUpload = (uploadPath, options) => {
  if (options) {
    delete options.count;
  }

  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      success(file) {
        fileUpload(file.tempFilePaths[0], uploadPath).then(data => {
          resolve(data);
        }).catch(data => {
          reject(data)
        })
      },
      ...options
    })
  })
}


/**
 * @function choolseImageUpload 选择文件上传
 * @function fileUpload 文件上传
 * @function router 新路由类，包含了常用路由跳转方法
 */
export default {
  choolseImageUpload,
  fileUpload,
  router
}
```

#### `router.js`
```JavaScript
/**
 * 路由类
 * @function function to 相当于uni.navigateTo()
 * @function function reLaunch 相当于uni.reLaunch()
 * @function function redirectTo 相当于uni.redirectTo()
 * @function function switchTab 相当于uni.switchTab()
 * @function function back 相当于uni.navigateBack()
 * @function function getCurrentPage 获取当前页面实例
 * @function function getLastPage 获取前一个页面实例
 * @function function _getPage 获取前delta个页面实例
 */
class Router {
  /**
   * to 相当于uni.navigateTo()
   */
  to(url, option = {}) {
    this.#_navigator('navigateTo', {url, ...option})
  }

  /**
   * reLaunch 相当于uni.reLaunch()
   */
  reLaunch(url, option = {}) {
    this.#_navigator('reLaunch', {url, ...option})
  }

  /**
   * redirectTo 相当于uni.redirectTo()
   */
  redirectTo(url, option = {}) {
    this.#_navigator('redirectTo', {url, ...option})
  }

  /**
   * switchTab 相当于uni.switchTab()
   */
  switchTab(url, option = {}) {
    this.#_navigator('switchTab', {url, ...option})
  }

  /**
   * back 相当于uni.navigateBack()
   */
  back(delta = 1, option = {}) {
    this.#_navigator('navigateBack', {
      delta,
      ...option
    })
  }
  /**
   * 路由导航 私有方法
   * @param {String} type uni.Navigator的类型
   * @param {Object} option uni Navigator Type各方法的参数
   */
  #_navigator(type, option = {}) {
    uni[type](option)
  }

  /**
   * getCurrentPage 获取当前页面实例
   */
  getCurrentPage() {
    return this._getPage(0)
  }

  /**
   * getLastPage 获取前一个页面实例
   */
  getLastPage() {
    return this._getPage(1)
  }

  /**
   * _getPage 获取前delta个页面实例
   * @param {Object} delta 第几个页面（逆顺序）
   */
  _getPage(delta) {
    const pages = getCurrentPages() // 当前页面列表
    return pages[pages.length - (delta + 1)] // 上一页
  }
}

// 导出路由类
export default Router
```

#### `fileUpload.js`

```JavaScript
import {
  devUrl,
  clientId,
  clientSecret,
} from '../common/setting';
import {
  Base64
} from '../utils/base64.js'


// 默认的文件上传路径
const UPLOAD_PATH = '/akm-bladex/visitor-wechat/cover/put-file-attach'
const UPLOAD_TIMEOUT = 15000
/**
 * @param {String} filePath 文件路径
 * @param {String} uploadPath 上传路径
 */
const fileUpload = (filePath, uploadPath = UPLOAD_PATH) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '正在上传',
      mask: true
    })
    uni.uploadFile({
      url: devUrl + uploadPath,
      filePath: filePath,
      name: 'file',
      header: {
        'Blade-Auth': 'bearer ' + uni.getStorageSync('accessToken'),
        'Authorization': 'Basic ' + Base64.encode(clientId + ':' + clientSecret)
      },
      timeout: UPLOAD_TIMEOUT, // 超时时间15秒
      success: (res) => {
        uni.hideLoading();

        // 如果res中没有data
        if(!res || !res.data) return uni.showToast({
          title: '图片上传失败',
          icon: 'error'
        })

        const data = JSON.parse(res.data);
        if (data && data.code === 200) {
          uni.showToast({
            title: '图片上传成功',
            icon: 'success'
          })
          resolve(data);
        } else {
          uni.showToast({
            title: '图片上传失败',
            icon: 'error'
          })
          reject(data)
        }
      },
      fail: (err) => {
        console.log(file, err);
        uni.hideLoading();
        uni.showToast({
          title: '图片上传失败',
          icon: 'error'
        })
        reject('图片上传失败’');
      }
    })
  })
}

export default fileUpload
```

#### `date.js`

```JavaScript
/**
 * 日期格式化
 * @param {Date} date 日期
 * @param {String} format 格式化模板
 */
export function dateFormat(date, format) {
  format = format || 'yyyy-MM-dd hh:mm:ss';
  if (date !== 'Invalid Date') {
    let o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length === 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';
}

/**
 * @param {Date} date 日期
 * @param {String} dayStr 返回的前置字符，默认 周
 * @param {String} sevenStr 第七天的特殊字符，默认 日
 */
export function getWeek(date = new Date(), dayStr = '周', sevenStr = '日') {
  let days = [sevenStr, '一', '二', '三', '四', '五', '六']

  if (date !== 'Invalid Date') {
    return dayStr + days[date.getDay()]
  }
  return new Error(date + 'is not a Date type')
}
``` 