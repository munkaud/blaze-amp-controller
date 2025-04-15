// actions/subscribe_actions.js
module.exports = function (self) {
    return {
      subscribeUpdates: {
        name: 'Subscribe to Updates',
        options: [
          {
            type: 'dropdown',
            label: 'Type (Blank = All, REG, DYN)',
            id: 'type',
            default: '',
            choices: [
              { id: '', label: 'All Updates (Blank)' },
              { id: 'REG', label: 'Register Updates Only' },
              { id: 'DYN', label: 'Dynamic Updates Only' },
            ],
          },
          {
            type: 'number',
            label: 'Frequency (e.g., 1 = 1 update/sec, 0.5 = 1 update every 5 sec)',
            id: 'freq',
            default: 1,
            min: 0.1,
            max: 10,
            step: 0.1,
          },
        ],
        callback: async (action) => {
          const type = action.options.type;
          const freq = action.options.freq;
          const command = type ? `SUBSCRIBE ${type} ${freq}` : `SUBSCRIBE ${freq}`;
          self.socket.send(`${command}\n`);
        },
      },
      unsubscribeUpdates: {
        name: 'Unsubscribe from Updates',
        options: [
          {
            type: 'dropdown',
            label: 'Type (Blank = All, REG, DYN)',
            id: 'type',
            default: '',
            choices: [
              { id: '', label: 'All Updates (Blank)' },
              { id: 'REG', label: 'Register Updates Only' },
              { id: 'DYN', label: 'Dynamic Updates Only' },
            ],
          },
        ],
        callback: async (action) => {
          const type = action.options.type;
          const command = type ? `UNSUBSCRIBE ${type}` : `UNSUBSCRIBE`;
          self.socket.send(`${command}\n`);
        },
      },
    };
  };