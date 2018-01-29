# 成果上传管理系统

## 项目背景介绍：

这个系统是我第一次尝试全栈的项目，没想到还弄出来了比较开心，之前是做前端的，对后台不怎么了解，项目页面也比较渣渣，不太懂UI设计，
按着我需要被大家拯救一波的审美，暂时先弄了这么个小界面，后续还会更改页面设计并加入新功能的。

## 项目介绍：

先上张图，不要吐槽审美哈，凑合看一下
![你的网去找小青蛙了]{/Desktop/pic.jpg}
这张图就是系统界面了，很简单，三个步骤就可以使用系统：

### 1. 左上角：选择上传时间

上传时间是指的一段时间，也就是你准备提交的excel表中提到的你完成那些工作所占用的时间区域。
这里我是用jedate这个插件的，感谢一下作者，没有引用任何的cdn资源，所需用的css和js我都已经放在本地了。

### 2. 中间部分：拖入你要上传的excel表格

### 3. 右边：点击完成按钮

## 技术介绍：

1. 后台用到了django框架
数据库配置部分，我使用的是mysql数据库
数据库这块挺坑的，说几点需要注意的：
1.1 中文写入数据库：
创建数据库的时候就规定好编码问题
具体语句大家百度一下
1.2 数据库时间的时区部分：
设置USE_TZ = False
2. 前端css纯手写，这么难看的界面也不会是啥框架的
3. 前端js用jquery
