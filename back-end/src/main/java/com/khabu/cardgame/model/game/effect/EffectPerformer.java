package com.khabu.cardgame.model.game.effect;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.model.game.action.Gamestate;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.DiscardPile;
import com.khabu.cardgame.util.IllegalMoveException;

import java.util.ArrayList;
import java.util.List;

public class EffectPerformer {
    private Turn turn;
    private Round round;
    private DiscardPile discardPile;
    private int topOfDiscardValue;

    private Player temporaryTargetOne;
    private Player temporaryTargetTwo;
    private int temporaryTargetIndexOne;
    private int temporaryTargetIndexTwo;

    public EffectPerformer(Turn turn, DiscardPile discardPile, Round round) {
        if (turn == null || discardPile == null || round == null)
            throw new IllegalArgumentException("Argument cannot be null");
        this.turn = turn;
        this.discardPile = discardPile;
        this.round = round;
    }

    private void validateEffect(Player player, Player targetOne, Player targetTwo, Effect effect) throws IllegalMoveException{
        if (!EffectValidator.isValidEffectUseInCurrentState(player, targetOne, targetTwo, effect, turn)) {
            String errorMessage = String.format("Tried to perform action %s with player %s on turn %s", effect.toString(), player.toString(), turn.toString());
            throw new IllegalMoveException(errorMessage);
        }
    }

    public Card checkOwnCard(Player player, int index) throws IllegalMoveException {
        validateEffect(player, player, null, Effect.CHECK_SELF_CARD);
        if (this.topOfDiscardValue == 7 || this.topOfDiscardValue == 8) {
            Card checkedCard = player.getCard(index);
            setCorrectStateUponUseOfEffect();
            return checkedCard;
        } else {
            throw new IllegalMoveException("Wrong card value");
        }
    }

    public Card checkOpponentCard(Player player, Player targetPlayer, int index) throws IllegalMoveException {
        validateEffect(player, targetPlayer, null, Effect.CHECK_OTHER_CARD);
        if ( this.topOfDiscardValue == 9 || this.topOfDiscardValue == 10) {
            Card checkedCard = targetPlayer.getCard(index);
            setCorrectStateUponUseOfEffect();
            return checkedCard;
        } else {
            throw new IllegalMoveException("Wrong card value");
        }
    }

    // TODO: Make the exchanged cards get placed at correct
    public void exchangeCards(Player attemptingPlayer, Player targetOne, Player targetTwo,
                              int targetOneIndex,
                              int targetTwoIndex) throws IllegalMoveException {
        validateEffect(attemptingPlayer, targetOne, targetTwo, Effect.EXCHANGE_CARDS);
        if (this.topOfDiscardValue == 11 || this.topOfDiscardValue == 12) {
            swapCards(targetOne, targetTwo, targetOneIndex, targetTwoIndex);
            // Update state
            setCorrectStateUponUseOfEffect();
        } else {
            throw new IllegalMoveException("Wrong card value");
        }

    }

    public List<Card> checkTwoCards(Player attemptingPlayer, Player targetOne, Player targetTwo,
                                    int targetOneIndex,
                                    int targetTwoIndex) throws IllegalMoveException {
        validateEffect(attemptingPlayer, targetOne, targetTwo, Effect.CHECK_TWO_CARDS);
        if (this.topOfDiscardValue == 13) {
            List<Card> cardOutput = new ArrayList<>();
            cardOutput.add(targetOne.getCard(targetOneIndex));
            cardOutput.add(targetTwo.getCard(targetTwoIndex));
            turn.setGameState(Gamestate.KING_EFFECT);

            // SET TEMP VARIABLES
            setTemporaryTargetOne(targetOne);
            setTemporaryTargetTwo(targetTwo);
            setTemporaryTargetIndexOne(targetOneIndex);
            setTemporaryTargetIndexTwo(targetTwoIndex);

            return cardOutput;
        } else {
            throw new IllegalMoveException("Wrong card value");
        }
    }

    public void swapCheckedCardsFromKingEffect(Player attemptingPlayer) throws IllegalMoveException {
        validateEffect(attemptingPlayer, temporaryTargetOne, temporaryTargetTwo, Effect.EXCHANGE_AFTER_CHECKS);
        swapCards(temporaryTargetOne, temporaryTargetTwo, temporaryTargetIndexOne, temporaryTargetIndexTwo);
        setCorrectStateUponUseOfEffect();
    }

    public void activateEffect(Player attemptingPlayer) throws IllegalMoveException {
        validateEffect(attemptingPlayer, null, null, Effect.ACTIVATE_EFFECT);
        turn.setGameState(Gamestate.USE_EFFECT);
    }

    private void swapCards(Player targetOne, Player targetTwo,
                      int targetOneIndex,
                      int targetTwoIndex) {
        // Retrieve cards from each players hand
        Card targetOneCard = targetOne.removeCard(targetOneIndex);
        Card targetTwoCard = targetTwo.removeCard(targetTwoIndex);
        // Add cards to the correct hands
        targetOne.addCardToSpecificIndex(targetTwoCard, targetOneIndex);
        targetTwo.addCardToSpecificIndex(targetOneCard, targetTwoIndex);
    }

    public void setCorrectStateUponUseOfEffect() {
        if (turn.getCurrentPuttingPlayer() == null) {
            turn.setGameState(Gamestate.FRENZY);
        } else {
            turn.setGameState(Gamestate.PUT);
        }
    }

    public Player getTemporaryTargetOne() {
        return temporaryTargetOne;
    }

    public void setTemporaryTargetOne(Player temporaryTargetOne) {
        this.temporaryTargetOne = temporaryTargetOne;
    }

    public Player getTemporaryTargetTwo() {
        return temporaryTargetTwo;
    }

    public void setTemporaryTargetTwo(Player temporaryTargetTwo) {
        this.temporaryTargetTwo = temporaryTargetTwo;
    }

    public int getTemporaryTargetIndexOne() {
        return temporaryTargetIndexOne;
    }

    public void setTemporaryTargetIndexOne(int temporaryTargetIndexOne) {
        this.temporaryTargetIndexOne = temporaryTargetIndexOne;
    }

    public int getTemporaryTargetIndexTwo() {
        return temporaryTargetIndexTwo;
    }

    public void setTemporaryTargetIndexTwo(int temporaryTargetIndexTwo) throws IllegalMoveException {
        if (this.temporaryTargetTwo.equals(this.temporaryTargetOne) &&
        this.temporaryTargetIndexOne == temporaryTargetIndexTwo) {
            throw new IllegalMoveException("You can't choose the same card from the same player");
        }
        this.temporaryTargetIndexTwo = temporaryTargetIndexTwo;
    }

    public void clearTempTargets() throws IllegalMoveException {
        setTemporaryTargetIndexTwo(0);
        setTemporaryTargetIndexOne(0);
        setTemporaryTargetOne(null);
        setTemporaryTargetTwo(null);
    }

    public int getTopOfDiscardValue() {
        return topOfDiscardValue;
    }

    public void setTopOfDiscardValue(int topOfDiscardValue) {
        this.topOfDiscardValue = topOfDiscardValue;
    }
}
