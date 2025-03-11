import requestHandler from '../requestHandler.js';

export const registerUser = async userData => {
  return requestHandler('/register', {
    method: 'POST',
    body: userData,
  });
};
