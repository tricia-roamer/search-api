# Search github repositories with a gRPC api

## Dependencies:

- Install node modules with `npm install`
- Define `TIMEOUT_MS` and `SEARCH_URI` in a environment file

## How to start the server:
```
npm run watch
```

You are able to call the API from POSTMAN

Fields:
- `startAt` (required): repositories with be fetched from given date until now
- `count` (optional): the number of records fetched from github. If it is not defined it will fetch all
- `language` (optional): specific language the repository is written in, ie `javascript`

## How to run the tests:
```
npm test
```
