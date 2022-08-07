const { getRepositories } = require('../../api/http/getRepositories');

test('returns data from get request', async () => {
  expect.assertions(1);
  const data = await getRepositories({ startAt: '2022-06-30', count: 10, language: 'java' });
  expect(data.items.length).toBe(10);
});
