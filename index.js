import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './Schema/TypeDefs.js'; 
import { resolvers } from './Schema/Resolvers.js'; 

const app = express();

const server = new ApolloServer({typeDefs, resolvers});
await server.start();
server.applyMiddleware({app});

const PORT = process.env.PORT || 3001;
app.listen({ port: PORT }, () => {
    console.log("Server Running")
});