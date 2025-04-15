// actions/power_actions.js
module.exports = function (self) {
    return {
      setPower: {
        name: 'Set Power State',
        options: [
          {
            type: 'dropdown',
            label: 'Power State',
            id: 'state',
            default: 'ON',
            choices: [
              { id: 'ON', label: 'Power On' },
              { id: 'OFF', label: 'Power Off' },
            ],
          },
        ],
        callback: async (action) => {
          const command = action.options.state === 'ON' ? 'POWER_ON' : 'POWER_OFF';
          self.socket.send(`${command}\n`);
        },
      },
      getPower: {
        name: 'Get Power State',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.STATUS.STATE\n');
        },
      },
    };
  };