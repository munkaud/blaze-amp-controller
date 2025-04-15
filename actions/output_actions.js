// In output_actions.js
module.exports = function (instance) {
    return {
        'set_output_source': {
            label: 'Set Output Source Zone',
            options: [
              {
                type: 'number',
                label: 'Output ID',
                id: 'oid',
                default: 1,
                min: 1,
                max: instance.state.outputs,
              },
              {
                type: 'dropdown',
                label: 'Zone',
                id: 'zone',
                default: 'A',
                choices: [
                  { id: 'A', label: 'Zone A' },
                  { id: 'B', label: 'Zone B' },
                  { id: 'C', label: 'Zone C' },
                  { id: 'D', label: 'Zone D' },
                ],
              },
            ],
            callback: (action) => {
              const { oid, zone } = action.options;
              instance.socket.send(`SET OUT-${oid}.SRC ${zone}\n`);
            },
          },
    };
  };