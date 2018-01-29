# 成果上传管理系统

## 项目背景介绍：

实验室需要一套成果管理系统，于是我就来尝试了一下，这个系统是我第一次尝试全栈的项目，没想到还弄出来了比较开心，之前是做前端的，对后台不怎么了解，项目页面也比较渣渣，不太懂UI设计，按着我需要被大家拯救一波的审美，暂时先弄了这么个小界面，后续还会更改页面设计并加入新功能的。

## 项目介绍：

先上张图，不要吐槽审美哈，凑合看一下。
![你的网去找小青蛙了](https://github.com/hmmoshang/outcomes/blob/master/teamwork_record/static/pic.jpg)
这张图就是系统界面了，很简单，三个步骤就可以使用系统：

### 1. 左上角：选择上传时间

上传时间是指的一段时间，也就是你准备提交的excel表中提到的你完成那些工作所占用的时间区域。
这里我是用jedate这个插件的，感谢一下作者，没有引用任何的cdn资源，所需用的css和js我都已经放在本地了。

### 2. 中间部分：拖入你要上传的excel表格
excel表格这里，我写的还不太灵活，不能保证适用于所有的excel文件，建议大家表格中的内容从A1单元格开始写起。

### 3. 右边：点击完成按钮
如果提交成果会有alert消息弹出，如果失败，也会有消息弹出。时间是需要选择的，如果不选择时间，提交不能成功。

## 技术介绍：

### 1. 后台用到了django框架
- 数据库配置部分，我使用的是mysql数据库
数据库这块挺坑的，说几点需要注意的：
  1. 中文写入数据库,这需要最开始就在创建数据库的时候就设置好：
`CREATE DATABASE 'databasename' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`
  2. 数据库时间的时区部分，mysql数据默认的是utc时区，一般比本地事件差8个小时：
设置`USE_TZ = False`
- django 这个框架就不说了，把我的资源部分跟大家讲讲：
outcomes文件夹中：
```
settings.py :这个文件配数据库，添加应用，添加中间件，设置时区，添加静态文件等等。
urls.py :这个文件配url接口。
```
teamwork_record文件夹中：
这个文件夹就是我的工程项目了
```
static文件夹放置静态资源，css,js文件等
migrations文件夹大家不需要管是自动生成数据库相关内容等
templates文件夹放html文件
models.py设置数据库信息
views.py后台文件   
```
### 2. 前端css纯手写，这么难看的界面也不会是啥框架的
### 3. 前端js用jquery,js这里也有需要注意的部分：
拖动事件需要禁用浏览器的默认事件，之前没有禁用的时候，浏览器都会把提交文件默认为下载
## 使用说明：

废话了一大推，到了最重要的部分，如何使用我的系统
### step1: 把我的项目pull下来到本地
### step2: 本地创建数据库
终端登陆数据库后
`CREATE DATABASE 'databasename' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`
这里的databasename要和数据库配置中的name部分一样，如果你看不懂这句话，你就把那俩都设置成outcomes就可以了
### step3: 修改数据库信息
找到outcomes文件夹中的settings.py文件中的数据库部分
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'databasename',
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```
把相关信息改成你自己的
### step3: 合并数据表
终端运行
python manage.py makemigrations
python manage.py migrate
#大功告成，试试吧！


