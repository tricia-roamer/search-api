const { getPopular } = require('../../api/fn/repositoryFunctions');

const { invalid, success } = require('../../lib/grpc/responses');

// test invalid validations
test('invalid if count is not 10, 50, 100', async () => {
  expect.assertions(1);
  const data = await getPopular({ language: 'php', startAt: '2022-06-30', count: 20 });
  expect(data).toEqual(invalid("'count' must be one of [10, 50, 100]"));
});

test('invalid if startAt is letters', async () => {
  expect.assertions(1);
  const data = await getPopular({ language: 'php', startAt: 'xxxxxx', count: 10 });
  expect(data).toEqual(invalid("'startAt' must be in YYYY-MM-DD format"));
});

test('invalid if startAt is format YYYY-MM-DD format', async () => {
  expect.assertions(1);
  const data = await getPopular({ language: 'php', startAt: '20220602', count: 10 });
  expect(data).toEqual(invalid("'startAt' must be in YYYY-MM-DD format"));
});

test('invalid if startAt is undefined', async () => {
  expect.assertions(1);
  const data = await getPopular({ language: 'php', count: 10 });
  expect(data).toEqual(invalid("'startAt' is required"));
});

// test valid parameters
test('returns 10 items', async () => {
  expect.assertions(1);
  const data = await getPopular({ language: 'java', startAt: '2022-06-30', count: 10 });
  expect(data.items.length).toBe(10);
});

test('returns 10 items without language specified', async () => {
  expect.assertions(1);
  const data = await getPopular({ startAt: '2022-06-30', count: 10 });
  expect(data.items.length).toBe(10);
});
