import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { resolvers } from '~~/server/gql/resolvers'
import { typeDefs } from '~~/server/gql/typedefs'

const apollo = new ApolloServer({
  typeDefs,
  resolvers
})

console.log('Graph QL server fired up')

export default startServerAndCreateH3Handler(apollo)