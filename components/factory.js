// auto generated list of available components

const components = {
'Paragraph': require('./Paragraph/Paragraph.js')
};

function get(key) {
   if (components[key] == null) {
      console.log('Component ' +key + ' not found')
      return new components['Component']()
   }

   return {
      ...require('./component'),
      ...components[key]
   }
}

module.exports =  get;
