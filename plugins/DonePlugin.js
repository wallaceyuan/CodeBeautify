class DonePlugin {
  constructor(){

  }
  apply(compiler){
    compiler.hooks.done.tapAsync('DonePluginv',function(name,callback){
      console.log('全部编译完成')
      callback()
    })
  }
}
module.exports = DonePlugin