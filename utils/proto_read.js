const fs = require('fs');
const path = require('path');
const protobuf = require('protobufjs')

function getPackageName(protoObj) {
    let packageName = ''

    function loop(obj) {
        if (obj.nested) {
            let keys = Object.keys(obj.nested);
            if (keys.length == 1) {
                // 只有一个
                if (packageName) packageName += '.'
                packageName += `${keys[0]}`
                return loop(obj.nested[keys[0]])
            } else {
                
                return packageName
            }
        }
    }
    return loop(protoObj)
}

function getService(protoPath = '/Users/Shared/Projects/cli/protos/test.proto') {
    let filePath = protoPath.replace(/^'/, '').replace(/'$/, '');
    let serviceName = ''; // 抛出的接口
    let packName = ''; // 该包的名字
    if (path.isAbsolute(filePath)) {} else {
        filePath = path.join(__dirname, filePath);
    };

    try {
        const fileString = fs.readFileSync(filePath).toString()
        serviceName = fileString.match(/service\s+(\w+)/)[1];
        //  packName = fileString.match('')

    } catch (error) {
        console.error(`没有找到有效的service name`, error)
    }
    const protoStr = protobuf.loadSync(filePath);
    // console.log(`protoStr`, JSON.stringify(protoStr.toJSON()))
    const  packageName = getPackageName(protoStr.toJSON())
    const service = protoStr.lookupService(serviceName);
    const methods = service.methods;
    return {
        methods: Object.keys(methods),
        package: packageName
    }
}
getService()
module.exports = {
    getService
}