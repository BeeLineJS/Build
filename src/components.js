module.exports = build;

const pfs = require('fs').promises;
const fs = require('fs');
const path = require('path');

async function walk(dir, fileList = []) {
  const files = await pfs.readdir(dir);
  for (const file of files) {
    const stat = await pfs.stat(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = await walk(path.join(dir, file), fileList);
      continue;
    }

    const segments = dir.split('\\');
    const parentFolder = segments[segments.length - 1];
    if (file === parentFolder + '.js') {
      const filePath = path.join(dir, file);
      fileList.push(filePath);
    }
  }
  return fileList;
}

function build(dir) {

  console.log(`build components:  ${dir}`);
  const components = [];
  walk(dir)
    .then((files) => {
      for (let i = 0; i < files.length; i++) {
        const filePath = files[i];
        const segments = filePath.split('\\');
        const fileName = segments.pop();
        const name = fileName.replace(/\.[^.$]+$/, '');

        components.push({
          name,
          path: `./${name}/${fileName}`
        });
      }
      generateComponents(dir, components);
    });
}

function generateComponents(dir, components) {

  let js = `// auto generated list of available components

const components = {
${components.map(c => `'${c.name}': require('${c.path}')`).join(',\n')}
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
`
  js = js.replace(/\uFEFF/g, '');
  fs.writeFileSync(`${dir}\\factory.js`, js, 'utf8', function (err) { });
}