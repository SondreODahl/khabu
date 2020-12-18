/*
    The possible states for a game to be in.
    CARD_DRAWN - After the currentPlayer has clicked the pile and drawn a card.
    DISCARD - If the player discarded the drawn card instead of swapping it.
    DRAW - Start of a turn. 
    FIRST_TURN - Necessary because you cannot swap with discard pile on first turn??
    FRENZY - All players may put during this stage
    PUT - One player has put a card. Only the puttingplayer may put. 
    PUT_FAIL - A player put the wrong card on the discard pile. No one can put during this period.
    It is only used to reveal the card to everyone else, then reverse to another state.
    TRANSFER - Player must choose a card to transfer to another player. Used after you 
    put someone else's card.
    USING_EFFECT - A player is using their card effect. No one else may interact during this.
*/
export const CARD_DRAWN = 'CARD_DRAWN';
export const DISCARD = 'DISCARD';
export const DRAW = 'DRAW';
export const FIRST_TURN = 'FIRST_TURN';
export const FRENZY = 'FRENZY';
export const PUT = 'PUT';
export const PUT_FAIL = 'PUT_FAIL';
export const TRANSFER = 'TRANSFER';
export const USING_EFFECT = 'USING_EFFECT';
