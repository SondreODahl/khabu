import { playerDisconnected, playerJoinedGame, playerReconnected } from '../../actions/playerActions';

const gameActionsDelegator = (topic, body) => {
  const parsedJSON = JSON.parse(body);
  const type = parsedJSON.type;
  switch (type) {
    case 'PLAYERS_INFO':
    case 'PLAYER_RECONNECT':
        const { playerId: recPlayerId } = parsedJSON;
        return playerReconnected(recPlayerId);
    case 'PLAYER_DISCONNECT':
        const { playerId: discPlayerId } = parsedJSON;
        return playerDisconnected(discPlayerId);
    default:
      const { playerId, playerName } = parsedJSON;
      const capacityReached = parsedJSON.capacityReached === 'true'; // BACKEND SENDS STRING VALUES
      return playerJoinedGame(playerId, playerName, capacityReached);
      alert(`gameActionsDelegator was called with ${body}`);
  }
};

export default gameActionsDelegator;
