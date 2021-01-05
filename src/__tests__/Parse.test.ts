import { getHtml } from '../index';

test('Say Hello', () => {
  expect(getHtml('Carl')).toBe('Hello Carl');
});
