import alertify from 'alertify.js';

const networkError = () => {
  alertify.delay(2000);
  alertify.logPosition('bottom right');
  alertify.error('You are offline!');
  return alertify;
};

export default networkError;
