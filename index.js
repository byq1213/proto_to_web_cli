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
const {
    Command,
    program
} = require('commander');

/** Utils */
const git = require('./utils/git');
const {
    getService
} = require('./utils/proto_read')
/** Template */
const templateDir = path.join(__dirname, './templates');
const tempList = path.join(templateDir, './list.vue');
const tempApi = path.join(templateDir, './api.ts'); // api模板文件
const tempController = path.join(templateDir, './controller.ts'); // api模板文件

/** Rande */
// const destDir = path.join(__dirname, 'src');
const destDir = path.join(__dirname, '../campaign-platform'); // 中台相对路径
console.log(`destDir`, destDir)
const destLis = path.join(destDir, 'list.vue');
const destApi = path.join(destDir, 'api.ts')
const destControllerDir = path.join(destDir, '/packages/node-server/app/controller')
const destApiDir = path.join(destDir, 'packages/node-server/app/lib/apiPool/dps')
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

program.version('1.0.0')
program
    .option('-d, --debug', 'output extra debugging')
    .option('-t, --template <template>', '选择模板') // 传递模板参数
    .option('-p, --proto <protoPath>', '后台协议文件', path.join(__dirname, `protos/test.proto`))
program.parse(process.argv);
const options = program.opts();
// 开始询问配置
inquirer.prompt([{
        type: 'list',
        name: 'type', // act / dps
        message: '选择模块(选择目录)',
        default: 'dps',
        // choices: ['dps', 'act', 'rule', ]
        choices: [{
                value: 'dps',
                short: '投放模块(dp)'
            },
            {
                value: 'act',
                short: '活动模块(act)'
            },
            {
                value: '',
                short: '空'
            }
        ]
    },
    {
        type: 'checkbox',
        name: 'temp', // act / dps
        message: '选择要渲染的模板',
        default: 'dps',
        // choices: ['dps', 'act', 'rule', ]
        choices: [{
            value: 'controller',
            checked: true,
        },{
            value: 'api',
            checked: true
        }
        ]
    },
    {
        type: 'input',
        name: 'keyword',
        message: 'keyword',
        default: 'msg'
    },
    {
        type: 'input',
        name: 'cn_keyword',
        message: '中文关键词:',
        default: '站外消息'
    },

    // {
    //     type: 'input',
    //     name: 'proto_path',
    //     message: '相关的后台协议:',
    //     default: '/Users/Shared/Projects/cli/protos/test.proto'
    // },

]).then(answer => {
    console.log(`answer`, answer)
    // 拿到协议内容
    if (answer.proto_path || true) {
        let {
            methods,
            package
        } = getService( options.proto )
        // 暴露出的接口渲染api文件
        let methodsList = methods.map(mtd => {
            // 大写接口名
            let upperName = _.upperFirst(_.camelCase(mtd)); // create_abc => CreateAbc
            return {
                upper_name: upperName, // CreateAbc
                name: mtd, // create_abc
                upper_first_name: _.camelCase(mtd), // createAbc
            }
        });
        answer.temp.forEach(temp=>{
            switch (temp) {
                case 'controller':
                    ejs.renderFile(tempController, {
                        ...global,
                        list: methodsList,
                        base_url: package,
                        keyword: answer.keyword,
                        cn_keyword: answer.cn_keyword,
                        upper_keyword: _.upperFirst(answer.keyword)
                    }, (err, str) => {
                        console.log(`渲染 controller 错误`, err)
                        let file = path.join(destControllerDir, answer.type, `${answer.keyword}.ts`);
                        fs.writeFileSync(file, str)
                        console.log(`渲染 controller 完成: ${file}`);
                    })
                    break;
                case 'api':
                    ejs.renderFile(tempApi, {
                        ...global,
                        list: methodsList,
                        base_url: package,
                        keyword: answer.keyword,
                        cn_keyword: answer.cn_keyword,
                    }, (err, str) => {
                        console.log(`渲染 api 错误`, err)
                        let file = path.join(destApiDir, answer.type, `${answer.keyword}.ts`);
                        fs.writeFileSync(file, str)
                        console.log(`渲染 api 完成: ${file}`);
    
                    })
                    break;
            }
        })
  

    }
})