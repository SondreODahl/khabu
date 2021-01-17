export * from './privateActionsDelegator';
export * from './publicActionsDelegator';
export * from './roundActionsDelegator';

/*
  Action delegators for each subscription path related to the game flow.
  The delegators will receive the messages from the backend, and determine which action creator to call.
  For each path, see the notion doc on the possible received messages. 
  round  -  Messages related to the flow of a round.
            Types: READY / INITIALIZE / BEGIN / END
  private - Messages only you receive during gameplay. 
            Types: ERROR / REVEAL / CARD_DRAWN / OPPONENT_CHECK / SELF_CHECK
  public -  Messages everyone receives during gameplay.
            Types: DECK / DISCARD / SWAP / END_TURN / PUT / TRANSFER / KHABU / ACTIVATE_EFFECT / 
            CHOOSE_CARD_EFFECT / PLAYER_CHECK_OPPONENT / PLAYER_CHECK_SELF / FINISH_EFFECT
  game   -  Messages received related to the flow of an entire game, regardless of row.
            Types: PLAYERS_INFO / PLAYER_DISCONNECT / PLAYER_RECONNECT
*/

