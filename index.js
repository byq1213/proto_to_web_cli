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
const _ = require('lodash');
/** Utils */
const git = require('./utils/git');
const {
    getService
} = require('./utils/proto_read')
/** Template */
const templateDir = path.join(__dirname, './templates');
const tempList = path.join(templateDir, './list.vue');
const tempApi = path.join(templateDir, './api.ts'); // api模板文件

/** Rande */
const destDir = path.join(__dirname, 'src');
const destLis = path.join(destDir, 'list.vue');
const destApi = path.join(destDir, 'api.ts')

/** Proto */
const testProto = path.join(__dirname, 'protos/msg.proto');

/** Global var */
const user = git().user.name
const time = moment().format("YYYY-MM-DD HH:mm:ss")

const global = {
    git_user: user,
    time,
    cn_keyword: ''
}
inquirer.prompt([{
        type: 'input',
        name: 'keyword',
        message: 'keyword',
        default: 'test_msg'
    },
    {
        type: 'input',
        name: 'cn_keyword',
        message: '中文关键词:',
        default: 'test_站外消息'
    },
    {
        type: 'input',
        name: 'proto_path',
        message: '相关的后台协议:',
        default: '/Users/Shared/Projects/cli/protos/test.proto'

    },

    // {
    //     type: 'input',
    //     name: 'proto',
    //     message: 'propto path: '
    // }
]).then(answer => {
    // 拿到协议内容
    if (answer.proto_path || true) {
        let {
            methods,
            package
        } = getService(answer.proto_path || '/Users/Shared/Projects/cli/protos/test.proto')
        // 暴露出的接口渲染api文件
        let methodsList = methods.map(mtd => {
            // 大写接口名
            let upperName = _.upperFirst(_.camelCase(mtd));
            return {
                upper_name: upperName,
                name: mtd
            }
        });
        ejs.renderFile(tempApi, {
            ...global,
            list: methodsList,
            base_url: package,
            keyword: answer.keyword,
            cn_keyword: answer.cn_keyword,
        
        }, (err, str) => {
            console.log(`err`, err)
            fs.writeFileSync(destApi, str)
        })
    }
    //   ejs.renderFile(vuePath, answer, (err, str)=>{
    //     fs.writeFileSync(vueDestPath, str)
    //   })
})