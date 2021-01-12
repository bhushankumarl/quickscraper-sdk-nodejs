/* eslint-disable no-console */
import Debug from 'debug';
import { QuickScraper } from '../index';
import { ENVs, MOCK } from './mock/constant';
const QuickScraperClient = new QuickScraper();
const debug = Debug('QS:Parse.test.ts');

test('Parse URL', async () => {
  const requestUrl = MOCK.SAMPLE_REQUEST_URL_1;
  debug('ENVs.ACCESS_TOKEN ', ENVs.ACCESS_TOKEN);
  console.log('ENVs.ACCESS_TOKEN ', ENVs.ACCESS_TOKEN);
  QuickScraperClient.setAccessToken(ENVs.ACCESS_TOKEN)
  try {
    const response = await QuickScraperClient.getHtml(requestUrl);
    expect(response).not.toBeNull();
    expect(response).not.toBeUndefined();

    expect(response.data).not.toBeNull();
    expect(response.metadata).not.toBeNull();

    expect(response.data).not.toBeUndefined();
    expect(response.metadata).not.toBeUndefined();
  } catch (error) {
    debug('error ', error);
    expect(error).toBeNull();
  }
});