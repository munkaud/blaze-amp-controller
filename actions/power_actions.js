module.exports = {
  powerOn(moduleInstance) {
    moduleInstance.handleCommand('POWER_ON');
  },
  powerOff(moduleInstance) {
    moduleInstance.handleCommand('POWER_OFF');
  }
};

// module.exports = function (instance) {
  
//   return {
//     powerOn: {
//       name: 'Power On',
//       options: [],
//       callback: () => {
//         instance.socketManager.queueCommand('POWER_ON\n');
//         instance.log('info', 'Turning power on');
//       },
//     },
//     powerOff: {
//       name: 'Power Off',
//       options: [],
//       callback: () => {
//         instance.socketManager.queueCommand('POWER_OFF\n');
//         instance.log('info', 'Turning power off');
//       },
//     },
//     setPower: {
//       name: 'Set Power State',
//       options: [
//         {
//           type: 'dropdown',
//           label: 'Power State',
//           id: 'state',
//           default: 'ON',
//           choices: [
//             { id: 'ON', label: 'Power On' },
//             { id: 'OFF', label: 'Power Off' },
//           ],
//         },
//       ],
//       callback: (action) => {
//         const command = action.options.state === 'ON' ? 'POWER_ON' : 'POWER_OFF';
//         instance.socketManager.queueCommand(`${command}\n`);
//         instance.log('info', `Setting power state to ${action.options.state}`);
//       },
//     },
//     getPower: {
//       name: 'Get Power State',
//       options: [],
//       callback: () => {
//         instance.socketManager.queueCommand('GET SYSTEM.STATUS.STATE\n');
//         instance.log('info', 'Requesting power state');
//       },
//     },
//   };
// };