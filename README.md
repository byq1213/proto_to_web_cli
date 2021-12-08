# 后台 .proto 协议文件随意转换前端模板
## 畅想:能做什么
- 通过后台的proto协议文件,快速导出中台前端对应的 Controller路由 + API 
- 甚至前端的ajax请求方法
- 再甚至 指定某个详情枚举 渲染出对应的编辑页面和列表页
- 再甚至 mock 数据

### 脚手架执行步骤:
- 确定相关的关键词和中文关键词: 例如: 站外消息, msg
- 确定属于活动还是属于投放, TODO: 可以创建自定义的模块
- 确定在哪个目录下判断相关关键词有没有占用 以及是属于哪个模块(投放还是活动)
 controller: packages/node-server/app/controller/msg.ts
 api: packages/node-server/app/lib/apiPool/dps/msg.ts
 list: packages/admin/src/views/dps/msg/list.vue
 edit: packages/admin/src/views/dps/msg/edit.vue