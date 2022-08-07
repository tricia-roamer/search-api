require('dotenv').config();

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
});

const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');

// API - GRPC server
const PROTO_PATH = path.join(__dirname, './api/search.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { search } = grpc.loadPackageDefinition(packageDefinition);

const searchRepositories = require('./api/search')();

const server = new grpc.Server();
server.addService(search.Search.service, searchRepositories);

server.bindAsync('0.0.0.0:6000', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC running on', 6000);
});
