import { buildUrl } from './buildUrl';

it('base is not a string', () => {
  expect(buildUrl([], 'path')).toEqual('');
});

it('no path', () => {
  expect(buildUrl('http://www.a.com')).toEqual('http://www.a.com/');
  expect(buildUrl('http://www.a.com/')).toEqual('http://www.a.com/');
});

it('base is empty', () => {
  expect(buildUrl('', '/path')).toEqual('/path');
  expect(buildUrl('', 'path')).toEqual('/path');
});
