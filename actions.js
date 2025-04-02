module.exports = (instance) => ({
	powerOn: {
	  name: 'Power On',
	  options: [],
	  callback: async () => {
		if (!instance.socket) return instance.log('error', 'Socket not connected');
		try {
		  instance.socket.send('POWER_ON\n');
		  instance.log('info', 'Power On command sent');
		} catch (err) {
		  instance.log('error', `Failed to send Power On: ${err.message}`);
		}
	  },
	},
	powerOff: {
	  name: 'Power Off',
	  options: [],
	  callback: async () => {
		if (!instance.socket) return instance.log('error', 'Socket not connected');
		try {
		  instance.socket.send('POWER_OFF\n');
		  instance.log('info', 'Power Off command sent');
		} catch (err) {
		  instance.log('error', `Failed to send Power Off: ${err.message}`);
		}
	  },
	},
	getConfig: {
	  name: 'Get Amp Config',
	  options: [],
	  callback: async () => {
		if (!instance.socket) return instance.log('error', 'Socket not connected');
		try {
		  instance.socket.send('GET INPUTS\n');
		  instance.socket.send('GET ZONES\n');
		  instance.socket.send('GET OUTPUTS\n');
		  instance.log('info', 'Requested amp configuration');
		} catch (err) {
		  instance.log('error', `Failed to request config: ${err.message}`);
		}
	  },
	},
  });