const path = require('path');
const protobuf = require('protobufjs')
const testProto = path.join(__dirname, '../protos/test.proto');

const protoStr = protobuf.loadSync(testProto);

const service = protoStr.lookupService('test_service');
const methods = service.methods;
console.log(`methods`, methods)
Object.keys(methods).forEach(key=>{
    const method = methods[key];
    console.log(`method.requestType`, method.requestType)
})
// console.log(Object.keys(methods)) // 所有的对外接口
// console.log(protoStr.nested.test);
// console.log(`protoStr`, JSON.parse(JSON.stringify(protoStr)))