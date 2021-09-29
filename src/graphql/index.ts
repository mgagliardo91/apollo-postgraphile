import typeDefs from './types'
import resolvers from './resolvers'
import { ApolloServer } from 'apollo-server-express';
import { buildSubgraphSchema } from '@apollo/federation'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';

const createServer = async (httpServer: http.Server) => { 
  const mainSchema = buildSubgraphSchema([{
    typeDefs,
    resolvers: resolvers as any
  }])
  return new ApolloServer({
    schema: mainSchema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
}

export default createServer