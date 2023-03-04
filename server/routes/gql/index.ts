import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { resolvers } from '~~/server/gql/resolvers'
import { typeDefs } from '~~/server/gql/typedefs'
import { H3Event } from 'h3'

const apollo = new ApolloServer({
  typeDefs,
  resolvers
})

const handler = startServerAndCreateH3Handler(apollo, {
  context: async ({event}) => {
    setHeaders(event)
    const cookies = parseCookies(event)
    return { token: cookies?.['momo:token'] };
  },
})

const setHeaders = (event : H3Event) => {
  setHeader(event, 'Access-Control-Allow-Credentials', 'true');
  setHeader(event, 'Access-Control-Allow-Origin', 'http://momo.heindetotverre.com');
  return event;
};

export default handler