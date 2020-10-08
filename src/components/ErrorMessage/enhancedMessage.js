// This function is used to provide error messages to the user that are
// different than the error messages provided by AQI APIs

const enhancedMessage = (message) => {
  switch (message) {
    case 'Unknown station':
    case 'Unknown city':
      return 'The Air Quality station you have selected is unknown. Please try a different selection.';
    case 'Invalid key':
      return 'Invalid credentials supplied to API. Please check your API key and try again.';
    case 'Over quota':
      return 'You have made too many API requests in a short time. Please try again later';
    default:
      return message;
  }
};

export default enhancedMessage;
