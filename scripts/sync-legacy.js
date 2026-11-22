const { copyFileSync } = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
copyFileSync(
  path.join(root, 'profiles', 'ikuuu', 'routecraft.js'),
  path.join(root, 'routecraft.js'),
);
console.log('Synced the Ikuuu compatibility entrypoint.');
