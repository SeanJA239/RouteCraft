const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = readFileSync(path.join(__dirname, '..', 'routecraft.js'), 'utf8');

function runRouteCraft(config, { campusNetworkProfile = true } = {}) {
  const context = {};
  const executableSource = campusNetworkProfile
    ? source
    : source.replace(
        'const CAMPUS_NETWORK_PROFILE_ENABLED = true;',
        'const CAMPUS_NETWORK_PROFILE_ENABLED = false;',
      );
  vm.runInNewContext(executableSource, context, { filename: 'routecraft.js' });
  const result = context.main(structuredClone(config));
  return JSON.parse(JSON.stringify(result));
}

function baseConfig() {
  return {
    proxies: [
      { name: '🇭🇰 Hong Kong', server: 'hk.example.com', type: 'ss' },
      { name: '🇸🇬 Singapore', server: 'sg.example.com', type: 'ss' },
    ],
    dns: {
      enable: false,
      ipv6: true,
      'enhanced-mode': 'fake-ip',
      'fake-ip-filter': ['+.existing.example'],
      'nameserver-policy': {
        '+.existing.internal': 'system',
      },
    },
  };
}

test('routes every XJTLU domain through a dedicated campus group first', () => {
  const result = runRouteCraft(baseConfig());
  const recoveryRules = [
    'DOMAIN-SUFFIX,xjtlu.edu.cn,🏫 XJTLU',
    'DOMAIN,cdn-go.cn,🚀 Proxy',
    'DOMAIN,cloudcache.tencent-cloud.com,🚀 Proxy',
    'DOMAIN,main.qcloudimg.com,🚀 Proxy',
    'DOMAIN,mmbiz.qpic.cn,🚀 Proxy',
    'DOMAIN,res.wx.qq.com,🚀 Proxy',
    'DOMAIN,wximg.wxs.qq.com,🚀 Proxy',
    'DOMAIN,mmbiz.qlogo.cn,🚀 Proxy',
  ];

  assert.deepEqual(result.rules.slice(0, recoveryRules.length), recoveryRules);

  const domesticRuleIndex = result.rules.indexOf('RULE-SET,domestic_non_ip,🇨🇳 Domestic');
  const cdnRuleIndex = result.rules.indexOf('RULE-SET,cdn_domainset,🚄 CDN');
  for (const rule of recoveryRules) {
    const ruleIndex = result.rules.indexOf(rule);
    assert.ok(ruleIndex < domesticRuleIndex, `${rule} must precede the domestic ruleset`);
    assert.ok(ruleIndex < cdnRuleIndex, `${rule} must precede the CDN ruleset`);
  }

  assert.deepEqual(
    result['proxy-groups'].find((group) => group.name === '🏫 XJTLU'),
    {
      name: '🏫 XJTLU',
      type: 'select',
      proxies: ['🚀 Proxy', 'DIRECT'],
    },
  );
  assert.equal(result.rules.includes('DOMAIN,ams.xjtlu.edu.cn,🚀 Proxy'), false);
  assert.equal(result.rules.includes('DOMAIN,print.xjtlu.edu.cn,🚀 Proxy'), false);
  assert.equal(result.rules.includes('DOMAIN,mail.xjtlu.edu.cn,🚀 Proxy'), false);
});

test('uses public DoH while preserving system DNS for campus and LAN domains', () => {
  const result = runRouteCraft(baseConfig());
  const publicResolvers = ['https://doh.pub/dns-query', 'https://dns.alidns.com/dns-query'];

  assert.equal(result.dns.enable, true);
  assert.deepEqual(result.dns['default-nameserver'], ['223.5.5.5', '119.29.29.29']);
  assert.deepEqual(result.dns.nameserver, publicResolvers);
  assert.deepEqual(result.dns['proxy-server-nameserver'], publicResolvers);
  assert.deepEqual(result.dns['direct-nameserver'], publicResolvers);
  assert.equal(result.dns['direct-nameserver-follow-policy'], true);
  assert.equal(result.dns['respect-rules'], false);
  assert.deepEqual(result.dns['nameserver-policy'], {
    '+.existing.internal': 'system',
    'rule-set:lan_non_ip': 'system',
    '+.xjtlu.edu.cn': 'system',
  });

  assert.equal(result.dns.ipv6, true);
  assert.equal(result.dns['enhanced-mode'], 'fake-ip');
  assert.deepEqual(result.dns['fake-ip-filter'], ['+.existing.example']);
});

test('creates a complete DNS section when the subscription omits one', () => {
  const config = baseConfig();
  delete config.dns;

  const result = runRouteCraft(config);

  assert.equal(result.dns.enable, true);
  assert.equal(result.dns['nameserver-policy']['+.xjtlu.edu.cn'], 'system');
  assert.equal(result.dns['nameserver-policy']['rule-set:lan_non_ip'], 'system');
});

test('leaves profiles without nodes or providers untouched', () => {
  const config = {
    dns: {
      nameserver: ['system'],
    },
  };

  assert.deepEqual(runRouteCraft(config), config);
});

test('can disable the campus profile for other private DNS environments', () => {
  const config = baseConfig();
  config.dns.nameserver = ['10.0.0.53'];

  const result = runRouteCraft(config, { campusNetworkProfile: false });

  assert.deepEqual(result.dns, config.dns);
  assert.equal(result.rules.includes('DOMAIN-SUFFIX,xjtlu.edu.cn,🏫 XJTLU'), false);
  assert.equal(
    result['proxy-groups'].some((group) => group.name === '🏫 XJTLU'),
    false,
  );
  assert.equal(result.rules.includes('DOMAIN,main.qcloudimg.com,🚀 Proxy'), false);
});
