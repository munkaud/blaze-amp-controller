// lib/zone_parser.js
module.exports = {
    handle(command, value, method = 'SET') {
      const duckerMatch = command.match(/^ZONE-([A-Z])\.DUCK\.(\w+)$/);
      if (duckerMatch) {
        const [, zid, param] = duckerMatch;
        const validParams = ['MODE', 'AUTO', 'THRESHOLD', 'DEPTH', 'ATTACK', 'RELEASE', 'HOLD', 'OVERRIDE_GAIN', 'OVERRIDE_GAIN_ENABLE'];
        if (!validParams.includes(param)) return { error: 'Unknown ducker param' };
        if (param === 'AUTO' && value != null && !['0', '1'].includes(value)) return { error: 'AUTO must be 0 or 1' };
        if (method === 'GET') return { cmd: `GET ZONE-${zid}.DUCK.${param}` };
        return { cmd: `SET ZONE-${zid}.DUCK.${param} ${value}` };
      }
      
      const zoneMatch = command.match(/^ZONE-([A-Z])\.(\w+)$/);
      if (!zoneMatch) return { error: 'Invalid command' };
      const [, zid, param] = zoneMatch;
      const validParams = ['MUTE', 'GAIN', 'SOURCE', 'DELAY', 'CUE', 'CUE_VOLUME', 'CUE_ENABLE'];
      if (!validParams.includes(param)) return { error: 'Unknown zone param' };
      if (method === 'GET') return { cmd: `GET ZONE-${zid}.${param}` };
      return { cmd: `SET ZONE-${zid}.${param} ${value}` };
    }
  };