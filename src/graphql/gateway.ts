import typeDefs from './types'
import resolvers from './resolvers'
import { ApolloServer } from 'apollo-server-express';
import { buildSubgraphSchema } from '@apollo/federation'
import { ApolloGateway } from '@apollo/gateway'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { mergeSchemas, makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { readFileSync } from 'fs';
import { join } from 'path'

const createServer = async (httpServer: http.Server) => { 
  const supergraphSdl = readFileSync(join(__dirname, '../supergraph.yaml')).toString()
  const gateway = new ApolloGateway({
    supergraphSdl
  });
  return new ApolloServer({
    gateway,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
}

export default createServer