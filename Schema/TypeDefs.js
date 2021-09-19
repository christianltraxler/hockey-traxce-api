import  { gql } from 'apollo-server-express';

export const typeDefs = gql`
    #Types
    type User {
        name: String!
        age: Int!
        married: Boolean!
    }

    type Game {
        date: String!
        season: Int!
        type: String!
        pk: Int!
        statusCode: Int!
        venue: String!
        awayId: Int!
        homeId: Int!
        # away: Team!
        # home: Team!
    }

    type Team {
        id: Int!
        name: String!
        abbreviation: String!
        logo: String!
        divisionId: Int!
        # division: Division!
        conferenceId: Int!
        # conference: conference!
        city: String!
        shortName: String!
        franchiseId: Int!
        active: Boolean!
        # games: [Game!]!
        # players: [Player!]!
    }

    type Division {
        id: Int!
        name: String!
        shortName: String!
        # teams: [Team!]!
    }

    type Conference {
        id: Int!
        name: String!
        # teams: [Team!]!
    }

    type Country {
        id: Int!
        name: String!
        code: String!
        nationalityName: String!
        flag: String!
        # players: [Player!]!
    }

    type Player {
        id: Int!
        fullName: String!
        jerseyNumber: Int!
        teamId: Int!
        # team: Team!
        positionCode: String!
        # position: Position!
        height: String!
        weight: String!
        shoots: String!
        catches: String!
        picture: String!
        nationalityId: String!
        # country: Country!
        active: Boolean!
    }

    type Position {
        code: String!
        name: String!
        type: String!
        abbreviation: String!
        # players: [Player!]!
    }

    # Queries
    type Query {
        getAllPlayers: [Player!]!
        getAllGames: [Game!]!
    }

    # Mutations
    type Mutation {
        addPlayer(id: Int!, fullName: String!, jerseyNumber: Int!, teamId: Int!, positionCode: String!, height: String!, weight: String!, 
                    shoots: String!, catches: String!, picture: String!, nationalityId: String!, active: Boolean!): Player!
    }
`;
