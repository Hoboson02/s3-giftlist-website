const { Response } = require('./helpers');

export const handler = async (event) => {
  const request = event['httpMethod'];
  // switch (request) {
  //   case 'GET':
  // }
  return request;
};