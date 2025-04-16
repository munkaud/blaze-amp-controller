// Helper to check for TXQueue Overflow warnings
function handleOverflowWarning(instance, primaryMessage) {
  if (primaryMessage.includes('#|E0: TXQueue Overflow - Messages dropped')) {
    instance.log('warn', 'TXQueue Overflow - Messages dropped; consider increasing polling delay');
    return true; // Indicates the message was handled
  }
  return false;
}

// Helper to check if the message is a command echo
function isCommandEcho(primaryMessage) {
  return (
    primaryMessage.startsWith('*GET') ||
    primaryMessage.startsWith('*SET') ||
    primaryMessage.startsWith('*SUBSCRIBE') ||
    primaryMessage.startsWith('*UNSUBSCRIBE')
  );
}

// Helper to check if the message is handled by known prefixes
function isMessageHandled(instance, primaryMessage, handledPrefixes) {
  const isHandled = Array.from(handledPrefixes).some(prefix => primaryMessage.startsWith(prefix));
  if (!isHandled) {
    instance.log('warn', `Unhandled response: ${primaryMessage}`);
  }
  return isHandled;
}

// Main parser function
module.exports = function (instance, message) {
  let stateChanged = false;

  // Split the message on newlines to handle combined response + echoed command
  const messages = message.split('\n').filter(msg => msg.trim() !== '');
  const primaryMessage = messages[0]; // Process only the first part (the actual response)

  // Handle TXQueue Overflow warning
  if (handleOverflowWarning(instance, primaryMessage)) {
    return stateChanged; // No state change, just logging
  }

  // Skip messages that are command echoes (e.g., *GET, *SET, etc.)
  if (isCommandEcho(primaryMessage)) {
    return stateChanged; // No state change, skip silently
  }

  // Check if the message was already handled by another parser
  const handledPrefixes = new Set([
    '+API_VERSION',
    '+SYSTEM.',
    '+SETUP.SYSTEM.',
    '*POWER_ON',
    '*POWER_OFF',
    '+IN.',
    '+IN-',
    '+ZONE.',
    '+ZONE-',
    '+OUT.',
    '+OUT-',
    '#GET', // Handles failed command responses
    '+ROUT-', // Ignore for now
    '+VC-',   // Ignore for now
  ]);

  isMessageHandled(instance, primaryMessage, handledPrefixes);

  return stateChanged;
};