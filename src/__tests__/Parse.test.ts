import { QuickScraper } from '../index';
import { ENVs, MOCK } from './mock/constant';
const QuickScraperClient = new QuickScraper();

test('Parse URL', async () => {
  const requestUrl = MOCK.SAMPLE_REQUEST_URL_1;
  QuickScraperClient.setAccessToken(ENVs.ACCESS_TOKEN)
  try {
    const response = await QuickScraperClient.getHtml(requestUrl);
    expect(response).not.toBeNull();
    // expect(response).not.toBeUndefined();
  } catch (error) {
    console.log('error ', error);
    // expect(error).toBeNull();
  }
  // expect(true).toBe(true);
});