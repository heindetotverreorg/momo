import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { resolvers } from '~~/server/gql/resolvers'
import { typeDefs } from '~~/server/gql/typedefs'

const apollo = new ApolloServer({
  typeDefs,
  resolvers
})

export default startServerAndCreateH3Handler(apollo, {
  context: async ({event}) => {
    const cookies = parseCookies(event)
    return { token: cookies?.['momo:token'] };
  },
})