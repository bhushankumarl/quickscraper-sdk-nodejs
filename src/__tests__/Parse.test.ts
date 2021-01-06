import { QuickScraper } from '../index';
const QuickScraperClient = new QuickScraper();

test('Say Hello', () => {
  expect(QuickScraperClient.getHtml('Carl')).toBe('Hello Carl');
});
