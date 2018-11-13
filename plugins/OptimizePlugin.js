class OptimizePlugin {
  constructor(){

  }
  apply(compiler){
    //先监听compilation事件
    compiler.hooks.compilation.tap('OptimizePlugin',(compilation)=>{
      compilation.hooks.optimize.tap('OptimizePlugin',()=>{
        console.log('compilation完成 正在优化 准备输出')
      })
    })
  }
}
module.exports = OptimizePlugin