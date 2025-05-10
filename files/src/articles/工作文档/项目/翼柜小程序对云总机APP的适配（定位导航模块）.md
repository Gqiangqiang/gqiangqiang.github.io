# 翼柜小程序对云总机APP的适配（定位导航模块）
#电信
## 修改项
2. 修改components/Tabbar.vue文件名为TabBar.vue（全局）
3. manifest.json中添加高德地图key和code
4. 地图markers中的对象添加iconPath，修复web端无法显示默认icon的问题
5. 添加导航选择弹窗，调起系统导航，样式参考小程序样式选择
   1. 高德 在IOS和安卓的scheme路径稍有不同，需要处理
   2. 百度 需要用方法将高德坐标系转换到百度坐标系
   3. 腾讯
   4. 苹果 如果是IOS设备，则会展示，需要开始和结束的经纬度
   5. 谷歌 默认不展示


## 导航应用的配置代码
```js
/**
  * 将高德坐标系 (GCJ-02) 转换为百度坐标系 (BD-09)
  * @param {number} lng - 高德经度
  * @param {number} lat - 高德纬度
  * @returns {Object} 包含百度坐标系经纬度的对象
  */
function gcj02ToBd09(lng, lat) {
    const PI = Math.PI;
    const x_PI = (PI * 3000.0) / 180.0;
    const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    const bd_lng = z * Math.cos(theta) + 0.0065;
    const bd_lat = z * Math.sin(theta) + 0.006;
    return { longitude: bd_lng, latidude: bd_lat };
}

// 判断是否是ios
const isIOS = /(iPhone|iPad|iPod)/i.test(navigator.userAgent)

const maps = [
    {
        name: '高德地图',
        scheme: 'amapuri://path',
        urlGenerator: (lat, lng, addr) => {
            // ios 用 path ， 安卓用 route
            const pathName = isIOS ? 'path' : 'route'
            return `amapuri://${pathName}?sourceApplication=myApp&dlat=${lat}&dlon=${lng}&dev=0&t=0`
        },
        storeUrl: 'https://mobile.amap.com/',
        visible: true
    },
    {
        name: '百度地图',
        scheme: 'baidumap://map/direction',
        urlGenerator: (lat, lng) => {
            const { longitude, latidude } = gcj02ToBd09(lng, lat);
            return `baidumap://map/direction?destination=${latidude},${longitude}&mode=driving`
        },
        storeUrl: 'https://map.baidu.com/zt/client/index/',
        visible: true
    },
    {
        name: '腾讯地图',
        scheme: 'qqmap://map/routeplan',
        urlGenerator: (lat, lng, addr) =>
            `qqmap://map/routeplan?type=drive&tocoord=${lat},${lng}&to=${addr}`,
        storeUrl: 'https://map.qq.com/mobileApp/',
        visible: true
    },
    {
        name: '苹果地图',
        scheme: 'http://maps.apple.com/',
        urlGenerator: (lat, lng, addr, slat, slng) =>
            `http://maps.apple.com/?saddr=${slat},${slng}&daddr=${lat},${lng}`,
        storeUrl: null,
        visible: isIOS // 仅在 iOS 上可见
    },
    {
        name: '谷歌地图',
        scheme: 'googlemaps://maps',
        urlGenerator: (lat, lng) =>
            `googlemaps://maps?q=${lat},${lng}`,
        storeUrl: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps',
        visible: false // 默认隐藏
    }
]

export default maps.filter(item => item.visible) // 过滤出可见的地图

```