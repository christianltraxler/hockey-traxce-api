import { games, players, positions, teams, divisions, conferences, countries } from './FakeData.js';

export const resolvers = {
    Query: {
        getAllPlayers() {
            return players;
        },
        getAllGames() {
            return games;
        }
    },
    Mutation: {
        addPlayer(parent, args) {
            const newPlayer = args;
            players.push(newPlayer);
            return newPlayer;
        }
    }  
}