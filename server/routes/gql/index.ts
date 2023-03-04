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
    allowCors(event)
    const cookies = parseCookies(event)
    return { token: cookies?.['momo:token'] };
  },
})

export default handler

const allowCors = (event : H3Event) => {
  console.log(event)
  setHeader(event, 'Access-Control-Allow-Credentials', 'true');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // // another common pattern
  setHeader(event, 'Access-Control-Allow-Origin', event.node.req.headers.origin as string);
  // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  // );
  // if (req.method === 'OPTIONS') {
  //   res.status(200).end();
  //   return;
  // }
  return event;
};