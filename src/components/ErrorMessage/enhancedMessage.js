// This function is used to provide error messages to the user that are
// different than the error messages provided by AQI APIs

const enhancedMessage = (message) => {
  switch (message) {
    case 'Unknown city':
      return 'The Air Quality city you have selected is unknown. Please try a different selection.';
    case 'Unknown station':
      return 'The Air Quality station you have selected is unknown. Please try a different selection.';
    case 'Invalid key':
      // Could make this more specific - but it's likely users wont know what it means for the API key to be invalid.
      return 'An error has occurred when trying to retrieve data. Please try again later.';
    case 'Over quota':
      return 'You have made too many API requests in a short time. Please try again later.';
    default:
      return message;
  }
};

export default enhancedMessage;
