const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const source = readFileSync(path.join(root, 'profiles/sakura/routecraft.js'), 'utf8');
function run(config) {
  const ctx = {};
  vm.runInNewContext(source, ctx);
  return JSON.parse(JSON.stringify(ctx.main(structuredClone(config))));
}
test('Sakura groups, AMP priority and preserved subscription settings', () => {
  const config = {
    dns: { nameserver: ['system'] },
    proxies: [
      { name: '🇺🇸|美国-01', server: 'us.example', type: 'ss' },
      { name: '🇯🇵|日本-01', server: 'jp.example', type: 'ss' },
      { name: '剩余流量：1 GB', server: 'info.example', type: 'ss' },
    ],
  };
  const result = run(config);
  assert.deepEqual(
    result['proxy-groups'].map((g) => g.name),
    [
      '🚀 Proxy',
      '🚄 CDN',
      '🗄️ Storage',
      '🤖 AI',
      '⬇️ download',
      '🇨🇳 domestic',
      '📱 social media',
      '🏫 xjtlu',
      '🇯🇵 日本',
      '🇺🇸 美国',
    ],
  );
  assert.deepEqual(result.dns, config.dns);
  assert.deepEqual(result.proxies, config.proxies);
  assert.equal(result['proxy-groups'].find((g) => g.name === '🤖 AI').proxies[0], '🇺🇸 美国');
  assert.ok(
    result.rules.indexOf('DOMAIN-SUFFIX,ampcode.com,🤖 AI') <
      result.rules.indexOf('RULE-SET,cdn_domainset,🚄 CDN'),
  );
  assert.equal(result.rules.at(-1), 'MATCH,🚀 Proxy');
  assert.ok(result['proxy-groups'].every((g) => !g.proxies.some((p) => p.includes('剩余流量'))));
});
test('Sakura leaves an empty subscription unchanged', () => {
  const config = { proxies: [], rules: ['MATCH,DIRECT'] };
  assert.deepEqual(run(config), config);
});
test('Ikuuu legacy entrypoint matches its maintained profile', () => {
  assert.equal(
    readFileSync(path.join(root, 'routecraft.js'), 'utf8'),
    readFileSync(path.join(root, 'profiles/ikuuu/routecraft.js'), 'utf8'),
  );
});
