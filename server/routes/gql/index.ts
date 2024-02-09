import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { resolvers } from '~~/server/gql/resolvers'
import { typeDefs } from '~~/server/gql/typedefs'

let apollo

try {
  apollo = new ApolloServer({
    typeDefs,
    resolvers
  })
} catch {
  throw new Error(`No connection to database - apollo server not created`)
}

const handler = startServerAndCreateH3Handler(apollo as ApolloServer, {
  context: async ({event}) => {
    const cookies = parseCookies(event)
    return { token: cookies?.['momo:token'] };
  },
})

export default handler