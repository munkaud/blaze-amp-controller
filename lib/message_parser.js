module.exports = {
  parse(response) {
    if (response.startsWith('+ZONE-A.COMPRESSOR')) {
      const [, param, value] = response.match(/\+ZONE-A\.COMPRESSOR\.(\w+) (\S+)/) || [];
      return { type: 'compressor', param, value };
    }
    if (response.startsWith('+ZONE-A.DUCK')) {
      const [, param, value] = response.match(/\+ZONE-A\.DUCK\.(\w+) (\S+)/) || [];
      return { type: 'ducker', param, value };
    }
    if (response.startsWith('+ZONE-A.')) {
      const [, param, value] = response.match(/\+ZONE-A\.(\w+) (\S+)/) || [];
      return { type: 'zone', param, value };
    }
    if (response.startsWith('+SYSTEM.DEVICE')) {
      const [, param, value] = response.match(/\+SYSTEM\.DEVICE\.(\w+) (\S+)/) || [];
      return { type: 'system', param, value };
    }
    if (response.startsWith('+OK')) return { type: 'success' };
    if (response.includes('E104')) return { type: 'error', code: 'E104' };
    if (response.includes('E105')) return { type: 'error', code: 'E105' };
    return { type: 'unknown', raw: response };
  }
};