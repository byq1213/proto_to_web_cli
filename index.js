#!/usr/bin/env node

/**
 * 畅想:能做什么
 * 通过后台的proto协议文件,快速导出中台前端对应的 Controller路由 + API 
 * 甚至前端的ajax请求方法
 * 再甚至 指定某个详情枚举 渲染出对应的编辑页面和列表页
 * 
 * 
 * 脚手架执行步骤:
 * - 确定相关的关键词和中文关键词: 例如: 站外消息, msg
 * - 确定属于活动还是属于投放, TODO: 可以创建自定义的模块
 * - 确定在哪个目录下判断相关关键词有没有占用 以及是属于哪个模块(投放还是活动)
 *  controller: packages/node-server/app/controller/msg.ts
 *  api: packages/node-server/app/lib/apiPool/dps/msg.ts
 *  list: packages/admin/src/views/dps/msg/list.vue
 *  edit: packages/admin/src/views/dps/msg/edit.vue
 */

/** Import */
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const ejs = require('ejs')
const moment = require('moment')
const protobuf = require('protobufjs')

/** Utils */
const git = require('./utils/git');

/** Template */
const templateDir = path.join(__dirname, './templates');
const tempList = path.join(templateDir, './list.vue');
const tempApi = path.join(templateDir, './api.ts'); // api模板文件

/** Rande */
const destDir = path.join(__dirname, 'src');
const destListDir = path.join(destDir, 'list.vue');

/** Proto */
const testProto = path.join(__dirname, 'protos/msg.proto');

/** Global var */
const user = git().user.name
const time = moment().format("YYYY-MM-DD HH:mm:ss")


return ;
inquirer.prompt([{
        type: 'input',
        name: 'keyword',
        message: 'keyword'
    },
    // {
    //     type: 'input',
    //     name: 'cn_keyword',
    //     message: '中文关键词:'
    // },
    // {
    //     type: 'input',
    //     name: 'proto',
    //     message: 'propto path: '
    // }
]).then(answer => {
    console.log(answer)
    //   ejs.renderFile(vuePath, answer, (err, str)=>{
    //     fs.writeFileSync(vueDestPath, str)
    //   })
})