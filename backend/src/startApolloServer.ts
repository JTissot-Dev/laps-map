import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSchema, NonEmptyArray } from "type-graphql";
import http from 'http';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';


const startApolloServer = async (
  resolvers: NonEmptyArray<Function>, 
  app: express.Express) => {

  interface MyContext {
    token?: string;
  };
  const schema = await buildSchema({
    resolvers: resolvers,
  });
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  return { apolloServer, httpServer };
};

export default startApolloServer;