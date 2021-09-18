/*
import cors from 'cors';
import express from 'express';
import expressGraphQL from 'express-graphql';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';


import { TeamType, GameType, DivisionType, ConferenceType } from "./types.js"
const app = express();

import { games, players, positions, teams, divisions, conferences, countries } from './data.js';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        game: {
            type: GameType,
            description: "A Single Game",
            args: {
                gamePk: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => games.find(game => game.gamePk === args.gamePk)
        },
        games: {
            type: new GraphQLList(GameType),
            description: "List of Games",
            resolve: () => games
        },
        team: {
            type: TeamType,
            description: "A Single Team",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => teams.find(team => team.id === args.id)
        },
        teams: {
            type: new GraphQLList(TeamType),
            description: "List of Teams",
            resolve: () => teams
        },
        division: {
            type: DivisionType,
            description: "A Single Division",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => teams.find(division => division.id === args.id)
        },
        divisions: {
            type: new GraphQLList(DivisionType),
            description: "List of Divisions",
            resolve: () => divisions
        },
        conference: {
            type: ConferenceType,
            description: "A Single Conference",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => teams.find(conference => conference.id === args.id)
        },
        conferences: {
            type: new GraphQLList(ConferenceType),
            description: "List of Conferences",
            resolve: () => conferences
        },

    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.use('/graphql', (res, req) => expressGraphQL({
    schema: new GraphQLSchema({ query: RootQueryType }),
    graphiql: true
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
*/
/*
const server = new ApolloServer({ schema });

app.use(express.static("public"));

server.applyMiddleware({ app });

app.listen({ port: PORT });
*/


import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

exports.app = functions.https.onRequest(app)
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');