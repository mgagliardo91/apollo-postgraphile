import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector'
import PgFederationPlugin from 'postgraphile-apollo-federation-plugin'
import PgManyToManyPlugin from '@graphile-contrib/pg-many-to-many'
import { Pool } from 'pg'
import { PostGraphileOptions } from 'postgraphile'
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter'

export const database: string =
  process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db'
export const schemas: string | string[] = ['app_public']

export const pool = new Pool({
  connectionString: database
});

export const options: PostGraphileOptions = {
  pgSettings(req) {
    return {
      role: process.env.DATABASE_VISITOR,
      'graphile.test.x-user-id':
        req.headers['x-user-id'] ||
        (req as any).normalizedConnectionParams?.['x-user-id'],
    }
  },
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  subscriptions: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  showErrorStack: 'json',
  extendedErrors: ['hint', 'detail', 'errcode'],
  allowExplain: true,
  legacyRelations: 'omit',
  exportGqlSchemaPath: `${__dirname}/../schema.graphql`,
  sortExport: true,
  enableQueryBatching: true,
  appendPlugins: [
    PgFederationPlugin,
    PgSimplifyInflectorPlugin,
    ConnectionFilterPlugin,
    PgManyToManyPlugin
  ],
}