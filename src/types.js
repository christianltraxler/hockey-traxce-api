
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

import { games, teams, conferences, divisions, countries, players } from './data.js';

const GameType = new GraphQLObjectType({
    name: 'Game',
    description: "A NHL Game",
    fields: () => ({
        date: { type: GraphQLNonNull(GraphQLString) },
        season: { type: GraphQLNonNull(GraphQLInt) },
        gameType: { type: GraphQLNonNull(GraphQLString) },
        statusCode: { type: GraphQLNonNull(GraphQLInt) },
        venue: { type: GraphQLNonNull(GraphQLString) },
        awayId: { type: GraphQLNonNull(GraphQLInt) },
        homeId: { type: GraphQLNonNull(GraphQLInt) },
        away: {
            type: TeamType,
            resolve: (game) => {
                return teams.find(team => game.awayId === team.id);
            }
        },
        home: {
            type: TeamType,
            resolve: (game) => {
                return teams.find(team => game.homeId === team.id);
            }
        }
    })
});

const TeamType = new GraphQLObjectType({
    name: 'Team',
    description: "A NHL Team",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        abbreviation: { type: GraphQLNonNull(GraphQLString) },
        logo: { type: GraphQLNonNull(GraphQLString) },
        divisionId: { type: GraphQLNonNull(GraphQLInt) },
        division: {
            type: DivisionType,
            resolve: (team) => {
                return divisions.find(division => division.id === team.divisionId);
            }
        },
        conferenceId: { type: GraphQLNonNull(GraphQLInt) },
        conference: {
            type: ConferenceType,
            resolve: (team) => {
                return divisions.find(conference => conference.id === team.conferenceId);
            }
        },
        city: { type: GraphQLNonNull(GraphQLString) },
        shortName:  { type: GraphQLNonNull(GraphQLString) },
        franchiseId: { type: GraphQLNonNull(GraphQLInt) },
        active:  { type: GraphQLNonNull(GraphQLBoolean) },
        games: {
            type: new GraphQLList(GameType),
            resolve: (team) => {
                return games.filter(game["awayId"] === team.id || game["homeId"] === team.id)
            }
        },
        players: {
            type: new GraphQLList(PlayerType),
            resolve: (team) => {
                return players.filter(player => player["teamId"] === team.id)
            }
        }
    })
});

const DivisionType = new GraphQLObjectType({
    name: 'Division',
    description: "A NHL Division",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        shortName: { type: GraphQLNonNull(GraphQLString) },
        teams: {
            type: new GraphQLList(TeamType),
            resolve: (division) => {
                return teams.filter(team => team["divisionId"] === division.id)
            }
        }
    })
});

const ConferenceType = new GraphQLObjectType({
    name: 'Conference',
    description: "A NHL Conference",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        teams: {
            type: new GraphQLList(TeamType),
            resolve: (conference) => {
                return teams.filter(team => team["conferenceId"] === conference.id)
            }
        }
    })
});

const PlayerType = new GraphQLObjectType({
    name: 'Player',
    description: "A NHL Player",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        fullName: { type: GraphQLNonNull(GraphQLString) },
        jerseyNumber: { type: GraphQLNonNull(GraphQLInt) },
        teamId: { type: GraphQLNonNull(GraphQLInt) },
        team: {
            type: TeamType,
            resolve: (player) => {
                return teams.find(team => team["id"] === player.teamId)
            }
        },
        positionCode: { type: GraphQLNonNull(GraphQLString) },
        position: {
            type: PositionType,
            resolve: (player) => {
                return positions.find(position => position["code"] === player.positionCode)
            }
        },
        height: { type: GraphQLNonNull(GraphQLString) },
        weight: { type: GraphQLNonNull(GraphQLString) },
        shoots: { type: GraphQLNonNull(GraphQLString) },
        catches: { type: GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLNonNull(GraphQLString) },
        birthDate: { type: GraphQLNonNull(GraphQLString) },
        nationalityId: { type: GraphQLNonNull(GraphQLInt) },
        country: {
            type: CountryType,
            resolve: (player) => {
                return countries.find(country => country["id"] === player.nationalityId)
            }
        },
        active: { type: GraphQLNonNull(GraphQLBoolean) },
    })
});

const CountryType = new GraphQLObjectType({
    name: 'Country',
    description: "A Country",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        code: { type: GraphQLNonNull(GraphQLString) },
        nationalityName: { type: GraphQLNonNull(GraphQLString) },
        flag: { type: GraphQLNonNull(GraphQLString) },
        players: {
            type: new GraphQLList(PlayerType),
            resolve: (country) => {
                return players.filter(player => player["nationalityId"] === country.id)
            }
        }
    })
});

const PositionType = new GraphQLObjectType({
    name: 'Position',
    description: "A Position",
    fields: () => ({
        code: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLString) },
        abbreviation: { type: GraphQLNonNull(GraphQLString) },
        players: {
            type: new GraphQLList(PlayerType),
            resolve: (position) => {
                return players.filter(player => player["positionCode"] === position.code)
            }
        }
    })
});

export { GameType, PlayerType, PositionType, TeamType, DivisionType, ConferenceType, CountryType };