class InlinePlugin {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    //先监听compilation事件
    compiler.hooks.compilation.tap('InlinePlugin',(compilation)=>{
      // { head:[ { tagName: 'link',
      //            selfClosingTag: false,
      //            voidTag: true,
      //            attributes: {href:'xxx',rel:"stylesheet"}
      //           } ],
      //  body: [ { tagName: 'script', closeTag: true, attributes: [Object] } ],
      //  plugin:
      //   HtmlWebpackPlugin {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('InlinePlugin',(htmlPluginData, callback)=>{
        this.processTags(compilation,htmlPluginData)
        callback(null, htmlPluginData)
      })
    })
  }
  processTags(compilation,htmlPluginData){
    htmlPluginData.head = htmlPluginData.head.map(tag => this.processTag(compilation, tag))
    htmlPluginData.body = htmlPluginData.body.map(tag => this.processTag(compilation, tag))
  }
  processTag(compilation, tag) {
    let assetUrl;
    if (tag.tagName == 'link' && this.options.test.test(tag.attributes.href)) {
      assetUrl = tag.attributes.href
      tag = {
        tagName: 'style',
        closeTag: true,
        attributes: {
          type: 'text/css'
        }
      }
    }
    if (tag.tagName == 'script' && this.options.test.test(tag.attributes.src)) {
      assetUrl = tag.attributes.src
      tag = {
        tagName: 'script',
        closeTag: true,
        attributes: {
          type: 'text/javascript'
        }
      }
    }
    if (assetUrl) {
      tag.innerHTML = compilation.assets[assetUrl].source()
      delete compilation.assets[assetUrl];
    }
    return tag
  }
}

module.exports = InlinePlugin