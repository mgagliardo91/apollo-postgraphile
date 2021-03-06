import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const resolversArray = loadFilesSync(__dirname, { ignoreIndex: true, recursive: true });

export default mergeResolvers(resolversArray);