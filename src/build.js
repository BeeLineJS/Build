const componentsDir = process.argv[2];

require('./components')(componentsDir);
require('./templates')(componentsDir);
require('./style')(componentsDir);

if (process.argv.length > 3) {
    const layoutDir = process.argv[3];
    require('./layouts')(layoutDir);
    require('./style')(layoutDir);
}