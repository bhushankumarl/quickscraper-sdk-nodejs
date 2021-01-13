import Debug from 'debug';
import * as fs from 'fs-extra';
import { QuickScraper } from '../index';
import { ENVs, MOCK } from './mock/constant';
const QuickScraperClient = new QuickScraper();
const debug = Debug('QS:parse.test.ts');

test('Import : Parse URL', async () => {
  const requestUrl = MOCK.SAMPLE_REQUEST_URL_1;
  debug('ENVs.ACCESS_TOKEN ', ENVs.ACCESS_TOKEN);
  // console.log('ENVs.ACCESS_TOKEN ', ENVs.ACCESS_TOKEN);
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

test('Import : Write to File', async () => {
  const requestUrl = MOCK.SAMPLE_REQUEST_URL_1;
  debug('ENVs.ACCESS_TOKEN ', ENVs.ACCESS_TOKEN);
  // console.log('ENVs.ACCESS_TOKEN ', ENVs.ACCESS_TOKEN);
  QuickScraperClient.setAccessToken(ENVs.ACCESS_TOKEN)
  try {
    const filePath = './temp.log';
    await fs.ensureFile(filePath);
    const response = await QuickScraperClient.writeHtmlToFile(requestUrl, filePath);
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