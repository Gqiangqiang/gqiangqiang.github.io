# 小程序通过URL Scheme进入页面，对登陆的改造
> 为了兼容从其他环境进入小程序某个页面，登陆后跳转回对应页面的改造

## 现存可能进入的环境
- 扫码
- 分享的链接
- URL Scheme

## 改造方式
1. ~~在请求拦截时，记录当前所在页面，所有页面，如果访问任何页面401时，跳转登陆后，都应该回到原来的页面。~~
2. 在请求拦截时，跳转登陆页面的方式改为`router.to`，不再是`redirectTo`，在登陆完成后，首先考虑是否可以`this.router.back({number})`，如果可以的话，则退回来的页面，如果抛出了错误，那么就延用原来的逻辑`this.router.reLaunch('/pages/index/index')`跳转到首页。这种方式，可以兼容其他方式及页面进入小程序需要登录的需求


#电信