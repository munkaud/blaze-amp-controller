module.exports = {
    handle(command, value, method = 'SET') {
      // Compressor commands (5.2.8)
      const compressorMatch = command.match(/^ZONE-([A-Z])\.COMPRESSOR\.(\w+)$/);
      if (compressorMatch) {
        const [, zid, param] = compressorMatch;
        const validParams = ['AUTO', 'THRESHOLD', 'ATTACK', 'RELEASE', 'RATIO', 'HOLD', 'KNEE', 'BYPASS'];
        if (!validParams.includes(param)) return { error: 'Unknown compressor param' };
        if (param === 'AUTO' && value != null && !['0', '1'].includes(value)) return { error: 'AUTO must be 0 or 1' };
        if (param === 'THRESHOLD' && value != null) {
          const num = parseFloat(value);
          if (isNaN(num) || num < -40 || num > 20) return { error: 'THRESHOLD must be -40 to 20' };
        }
        if (method === 'GET') return { cmd: `GET ZONE-${zid}.COMPRESSOR.${param}` };
        return { cmd: `SET ZONE-${zid}.COMPRESSOR.${param} ${value}` };
      }
  
      // Ducker commands (5.2.7)
      const duckerMatch = command.match(/^ZONE-([A-Z])\.DUCK\.(\w+)$/);
      if (duckerMatch) {
        const [, zid, param] = duckerMatch;
        const validParams = ['MODE', 'AUTO', 'THRESHOLD', 'DEPTH', 'ATTACK', 'RELEASE', 'HOLD', 'OVERRIDE_GAIN', 'OVERRIDE_GAIN_ENABLE'];
        if (!validParams.includes(param)) return { error: 'Unknown ducker param' };
        if (param === 'AUTO' && value != null && !['0', '1'].includes(value)) return { error: 'AUTO must be 0 or 1' };
        if (param === 'THRESHOLD' && value != null) {
          const num = parseFloat(value);
          if (isNaN(num) || num < -80 || num > 0) return { error: 'THRESHOLD must be -80 to 0' };
        }
        if (method === 'GET') return { cmd: `GET ZONE-${zid}.DUCK.${param}` };
        return { cmd: `SET ZONE-${zid}.DUCK.${param} ${value}` };
      }
  
      // Zone commands (5.2.6, preserve MUTE, GAIN, etc.)
      const zoneMatch = command.match(/^ZONE-([A-Z])\.(\w+)$/);
      if (zoneMatch) {
        const [, zid, param] = zoneMatch;
        const validParams = ['MUTE', 'GAIN', 'SOURCE', 'DELAY', 'CUE', 'CUE_VOLUME', 'CUE_ENABLE'];
        if (!validParams.includes(param)) return { error: 'Unknown zone param' };
        if (param === 'MUTE' && value != null && !['0', '1'].includes(value)) return { error: 'MUTE must be 0 or 1' };
        if (param === 'GAIN' && value != null) {
          const num = parseFloat(value);
          if (isNaN(num) || num < -60 || num > 12) return { error: 'GAIN must be -60 to 12' };
        }
        if (method === 'GET') return { cmd: `GET ZONE-${zid}.${param}` };
        return { cmd: `SET ZONE-${zid}.${param} ${value}` };
      }
  
      return { error: 'Invalid command' };
    }
  };