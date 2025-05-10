# 全局“#”改为“序号”
在public ⇒ index.html中，查看引入的`avue`版本，在`cdn`文件夹中找到引入的对应版本，在其中查找`indexLabel:"#"`和`indexLabel||"#"`，将其中的“#”修改为“序号”即可。

_**因为是用改源码的方式更改的内容，所以升级版本或更改版本的时候会需要重新更改**_

# 删除无用的参数
方法中经常出现无用的参数，记得及时删除，如：（只是示例）
```JavaScript
    // 其中loading就是未使用的参数，可以删除
    rowSave(row, done, loading) {
      add(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!",
        });
        done();
      });
    },
```

# 字典
- 字典（Dict）在`config ⇒ env.js`中有公共的URL，可以在option的字典配置中直接写`businessDictUrl`或者`systemDictUrl`，而不用每次都写全部路径。
    1. 业务字典：`businessDictUrl`
    2. 系统字典：`systemDictUrl`
- 字典的获取，应该使用`dict.js`和`dictbiz.js`中的方法，而不是新建接口方法

# 表格错位问题
*目前为止错位问题通常出现在更新表格结构时（更改表格头，动态设置column显隐等）*

如果表格出现错位（如上下行错位、列错位等所有错位问题），都可能是数据更新但UI更新不及时导致的错乱，可以使用`this.$refs.crud.refreshTable()`来手动刷新表格。

# 如何不登录，进入某页面（开发阶段）
1. 在`main.js`中，将引入的`permission`注释掉，`permission`中进行了`token`验证
2. 在`src/router/views/index.js`中添加路由

> 使用npm自定镜像源，可能下载更新会比较慢，甚至失败，所以建议更换为国内的镜像源

## 查看当前镜像源

```bash
npm config get registry

yarn config get registry
```

## 修改当前镜像源

```bash
npm config set registry https://registry.npm.taobao.org/

yarn config set registry https://registry.npm.taobao.org/
```

## URL

所有在`src => config => env.js`​中配置导出的`URL`​都被挂载导了全局属性中，可以在所有页面使用`this.xxx`​调用。如：`baseUrl`、``

‍

## 新增页面

在新增页面时，在`src`​文件夹下找到`views`​或`page`​文件夹，`views`​是作为不同页面的集合，`page`​通常是页面的容器的或独立页面的集合，业务页面，基本都在`views`​文件夹

在`views`​文件夹新建文件夹，作为自己业务模块的文件夹，在文件夹中新建`vue`​页面；

如：在`views`​中新建一个`students`​的文件夹，在文件夹中新建了一个`studentsManagement.vue`​的文件夹作为学生管理的页面。

## 路由配置

1. 在新建`page`​的页面时，需要在`views => router => page`​文件夹下的`index.js`​中新增路由配置，具体请见[VueRouter配置](https://v3.router.vuejs.org/zh/guide/)
2. 新建`views`​业务页面时，需要进入系统，在左侧`系统设置 => 菜单设置`​中设置

‍

### 工具
​`src => util`​中都是工具JS

* **date.js**  包含格式化时间方法
* **store.js**  包含存取清除`sessionStorange`​和`localStorage`​的方法
* **util.js**  包含表单参数序列化、深克隆、生成随机数、根据字典`value`​查询`label`​等
* **validate.js**  包含身份证、手机、邮箱等验证方法

‍

### 下载文件

​`this.downFile(url, name)`​

* url  下载文件的请求路径
* name  保存的文件名称

当表格中出现“类型”、“性别”等字眼时，通常会使用到字典，字典就是一个“数据库”；

我们拿到某一个值，在这个数据库中找到这个值对应的文字并显示出来（返回）

**例子：**
  > 我的表格中有一个“性别”字段，后端返回的`sex`​字段是`0`​、`1`​、`2`​这样的数字，我们需要根据返回的不同数据，显示不同的文字`0:女 1:男 2:保密`​；那么我们需要在表格自定一个`div`​，在`div`​中进行判断`data.sex == 0 ? '女' : data.sex == 1 ? '男' : '保密'`​（或者是在返回值中直接判断进行赋值）。
  > 
  > 那么就可以使用字典来简化次项操作	

  > ```js
  > /**
  >   3.template中使用getGender()，可以在页面显示getGender的返回值，即data.sex对应的label
  >   <div>{{getGender(data.sex)}}</div>
  > */
  >
  > // data返回值
  > // 1.首先在`data`中定义一个`gender`的数组，数组中保存着我们需要的数据
  > gender: [
  >   {
  >     label: '女',
  >     value: 0
  >   },
  >   {
  >     label: '男',
  >     value: 1
  >   },
  >   {
  >     label: '保密',
  >     value: 2
  >   }
  > ]
  >
  > // 2.methods中定义一个从gender中查找sex对应label的函数
  > getGender(sex) {
  >   return this.gender.find(t => t.value == sex).label
  > }
  > ```
  >
  > 可能在上面的例子看来，好像多做了一些事，还变的繁琐了，但是一旦当`gender`​中的值变成了7、8个甚至更多的时候，使用`三元表达式`​或者`if`​判断就会变得非常复杂，且代码看着会非常冗余，更不美观，使得可读性变差，封装后，代码可读性将会提高非常多；
  >
  > 并且在框架中更是封装好了这些操作，不需要我们去写`getGender()`​这种函数，字典的使用会变的更简单
  >

## Saber中字典的分类

1. **系统字典**  用于系统
2. **业务字典**  用于主体业务，也是最常用的字典
3. 特殊字典  其实不算作是字典，只不过用在了`dicUrl`​上，在某种情况下看作是字典的特定接口

‍

## 字典的配置

登录系统后，在左侧栏的最下方找到`系统设置 => 系统字典/业务字典`​，在这里对字典进行`增删改查`​

‍

## 字典的使用

#### 相关属性

* **dicData  { Array } 字典数据**

  大多在字典值写死或需要特殊处理时使用，例如：

  ```js
  // option配置
  // ...
  {
  	label: '类型',
  	prop: 'type',
  	dicData: []
  }
  // ...

  // js处理数据

  created() {
  	// 请求字典数据
  	getTypes().then(res => {
  		const column = this.findObject(this.option.column, 'type');
  		// 可以在此处进行其他操作之后再进行下面的赋值操作
          	column.dicData = res.data.data; // 设置字典数据dicData
  	})
  }
  ```

* **dicUrl  { String } 网络字典的URL请求路径**

  注意，此处是请求路径，所以，可以是**任何get请求**的路径

  **例如：**

  正常的字典请求路径可能是：

  ```js
  dicUrl: baseUrl + '/blade-system/dict/select' // baseUrl是全局统一请求路径
  ```

  也可以是一个正常的get请求路径

  ```js
  dicUrl: baseUrl + '/blade-system/type/types-list' // 获取一个types列表，大多数时候，需要配合props使用
  ```
* **props**

  [AVUE官网props参数定义](https://avuejs.com/form/form-doc/#column-props "AVUE官网props参数定义")

  * **label**
  * **value**
  * **children**
  * **disabled**
  * **res**

  * **例子1：**

    ```js
    // dicUrl的请求返回值是
    {
      code: 200,
      data: {
        record: [ // 这是我们需要的数组
          {
            name: '老五',
            id: '123182039480',
            adult: true // 是否成年
          },
          {
            name: '老六',
            id: '123182039480',
            adult: false // 是否成年
          },
          // ...more
        ],
        pageSize: 100,
        total: 1000,
        current: 1
      },
      msg: '操作成功'
    }

    /**
    上面的返回值，并不能满足我们的默认值，因为默认是直接返回的数组，但是这个接口返回的是经过封装的对象，把真正需要的数组放到了data.record中
    1.需要用res来指定数组所在的对象/属性：'data.record'（如果返回的数组是在data上，则不需要res指定）
    2.label，展示的属性默认是label，但是在返回的数组中没有，我们想要展示的是name，所以label的值应该是：'name'
    3.value，同label，返回的数组中没有value，需要的是id，所以value的值应该是：'id'
    */
    ```
  * **例子2：**

    ```js
    // 借用例子1的返回值，我们需要对adult为true的人进行禁用，不允许选择
    // 在label同级，设置disabled为'adult'，那么adult为true的人都会被禁用，无法选择
    ```

  ‍

* **dicFormatter  { Function } 字典数据格式化**

  对字典数据进行操作后返回

  **例子：**

  ```js
  dicFormatter(res) {
    return res.data.map(t => t.sortName = t.sort + t.name);
  },
  ```

‍

## 使用npm

```bash
npm install # 安装依赖

npm run serve # 启动项目
```

## 使用 yarn

```bash
yarn install # 安装依赖

yarn serve # 启动项目
```

> **Tips**
> 如果安装依赖失败，尝试更换 `npm`​​​ 或 `yarn`​​​ 的源 [[Saber-Vue2开发注意事项]]
> **NodeJS版本推荐14.x版本**

‍
