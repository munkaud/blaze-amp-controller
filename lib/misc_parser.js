module.exports = function (instance, message) {
  let stateChanged = false;

  // Split the message on newlines to handle combined response + echoed command
  const messages = message.split('\n').filter(msg => msg.trim() !== '');
  const primaryMessage = messages[0]; // Process only the first part (the actual response)

  // Handle TXQueue Overflow warning
  if (primaryMessage.includes('#|E0: TXQueue Overflow - Messages dropped')) {
    instance.log('warn', 'TXQueue Overflow - Messages dropped; consider increasing polling delay');
    return stateChanged; // No state change, just logging
  }

  // Skip messages that are command echoes (e.g., *GET, *SET, etc.)
  if (
    primaryMessage.startsWith('*GET') ||
    primaryMessage.startsWith('*SET') ||
    primaryMessage.startsWith('*SUBSCRIBE') ||
    primaryMessage.startsWith('*UNSUBSCRIBE')
  ) {
    return stateChanged; // No state change, skip silently
  }

  // Check if the message was already handled by another parser
  const handledPrefixes = [
    '+API_VERSION',
    '+SYSTEM.',
    '+SETUP.SYSTEM.',
    '*POWER_ON',
    '*POWER_OFF',
    '+IN.',
    '+ZONE.',
    '+OUT.',
    '#GET', // Handles failed command responses
  ];

  const isHandled = handledPrefixes.some(prefix => primaryMessage.startsWith(prefix));
  if (!isHandled) {
    instance.log('warn', `Unhandled response: ${primaryMessage}`);
  }

  return stateChanged;
};