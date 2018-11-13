class AsyncPlugin {
  constructor(){

  }
  apply(compiler){
    //先监听emit事件 编译完成后 文件内容输出到硬盘上是 触发此事件
    compiler.hooks.emit.tapAsync('AsyncPlugin',(compilation,callback)=>{
      setTimeout(()=>{
        console.log('文件将要写入硬盘')
        callback()
      },3000)
    })
  }
}
module.exports = AsyncPlugin