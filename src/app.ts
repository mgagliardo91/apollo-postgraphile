import express from 'express';
import http from 'http';
import createGateway from './graphql/gateway';
import createServer from './graphql';
import { postgraphile } from 'postgraphile'
import { pool, schemas, options } from './postgraphile';

export default async () => {
  const pgApp = express();
  const pgServer = http.createServer(pgApp);

  const apolloApp = express()
  const apolloServer = http.createServer(apolloApp);

  const gatewayApp = express();
  const gatewayServer = http.createServer(gatewayApp);


  pgApp.use(postgraphile(pool, schemas, options))
  await new Promise(resolve => pgServer.listen({ port: 3001 }, resolve));

  const server = await createServer(apolloServer)
  await server.start();
  server.applyMiddleware({ app: apolloApp });
  await new Promise(resolve => apolloServer.listen({ port: 3002 }, resolve));

  const gateway = await createGateway(gatewayServer)
  await gateway.start()
  gateway.applyMiddleware({ app: gatewayApp });
  await new Promise(resolve => gatewayServer.listen({ port: 3000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3000/graphql`);
}
