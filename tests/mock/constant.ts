/* eslint-disable no-console */
import Debug from 'debug';
const debug = Debug('QS:Constant.ts');

export const MOCK = {
  SAMPLE_REQUEST_URL_1: 'https://mylocation.org'
}

export const ENVs = {
  ACCESS_TOKEN: process.env.QS_ACCESS_TOKEN || ''
}

console.log('ENVs ', ENVs);
// console.log('MOCK ', MOCK);
debug('MOCK ', MOCK);

test('Validate ENVs value should be set correct.', async () => {
  expect(MOCK.SAMPLE_REQUEST_URL_1).not.toBeUndefined();
  // expect(MOCK.SAMPLE_REQUEST_URL_1).not.toBeEm();
  expect(ENVs.ACCESS_TOKEN).not.toBeUndefined();
  expect(ENVs.ACCESS_TOKEN).not.toBeNull();
  // expect(ENVs.ACCESS_TOKEN.length).not.toEqual(0)
});