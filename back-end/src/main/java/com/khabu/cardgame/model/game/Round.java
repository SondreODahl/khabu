package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.ActionPerformer;
import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.action.Gamestate;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardDeck;
import com.khabu.cardgame.model.game.card.CardHand;
import com.khabu.cardgame.model.game.card.DiscardPile;
import com.khabu.cardgame.model.game.effect.Effect;
import com.khabu.cardgame.model.game.effect.EffectPerformer;
import com.khabu.cardgame.util.IllegalMoveException;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

public class Round {

    private final DiscardPile discardPile = new DiscardPile();
    private final CardDeck cardDeck = new CardDeck(discardPile);
    private final Turn turn;
    private ActionPerformer actionPerformer;
    private EffectPerformer effectPerformer;
    private final Game game;
    private final Player[] players;

    private boolean roundStarted;
    private final Map<Player, Boolean> playersReady = new HashMap<>();
    private final Map<Player, Integer> revealedCard = new HashMap<>();
    private final Map<Player, Integer> scores = new HashMap<>();

    private final int INIT_HAND_SIZE;
    private final int REVEAL_TIME;


    private Round(Game game, Player[] players, int INIT_HAND_SIZE, int REVEAL_TIME) {
        validateHandSize(INIT_HAND_SIZE);
        this.INIT_HAND_SIZE = INIT_HAND_SIZE;
        this.REVEAL_TIME = REVEAL_TIME;
        this.players = players;
        this.turn = new Turn(players);
        this.game = game;
        resetMaps();
    }
    public static Round Constructor(Game game, Player[] players, int INIT_HAND_SIZE, int REVEAL_TIME) { // TODO: Change this implementation
        Round round = new Round(game, players, INIT_HAND_SIZE, REVEAL_TIME);
        round.actionPerformer = new ActionPerformer(round.turn, round.cardDeck, round.discardPile, round);
        round.effectPerformer = new EffectPerformer(round.turn, round.discardPile, round);
        return round;
    }
    public static Round DummyConstructor() { // TODO: Change?
        return new Round(new Game("abc", 2), new Player[]{}, 4, 500);
    }

    // ------------------------------ METHODS ------------------------------------------

    private void validateHandSize(int initialHandSize) {
        int MIN_INIT_HAND_SIZE = 2; // TODO: Should be changed to be more dynamic
        int MAX_INIT_HAND_SIZE = 8;
        if (initialHandSize < MIN_INIT_HAND_SIZE || initialHandSize > MAX_INIT_HAND_SIZE)
            throw new IllegalArgumentException(String.format(
                    "Initial hand size is larger or smaller than allowed (%d-%d)",
                    MIN_INIT_HAND_SIZE, MAX_INIT_HAND_SIZE));
    }

    public Card getCardDrawnFromDeck() throws IllegalMoveException {
        if (actionPerformer.getTemporaryCard() != null) {
            return actionPerformer.getTemporaryCard();
        } else {
            throw new IllegalMoveException("No card has been drawn");
        }
    }

    private void resetMaps() {
        for (Player player : players) {
            this.playersReady.put(player, false);
            this.revealedCard.put(player, 0);
            this.scores.put(player, 0);
        }
    }

    private void calculateScores() {
        for (Player player : players) {
            int summedScore = player.calculateScore();
            int prevScore = scores.get(player);
            scores.put(player, prevScore + summedScore);
        }
    }

    public void resetPlayerHands() {
        for (Player player : players) {
            player.getCardHand().getCards().clear();
        }
    }

    public void beginRound() {
        discardPile.reset();
        cardDeck.initializeCards();
        resetMaps();
        resetPlayerHands();
        dealCards();
        this.turn.setGameState(Gamestate.FIRST_TURN);
    }

    public void endRound() {
        setStarted(false);
        calculateScores(); // Calculates scores for the round
        game.roundEnded(); // Calculates total scores in game session
        // TODO: Methods for revealing the cards
    }

    private void dealCards() {
        cardDeck.shuffle();
        for (Player player: this.players) {
            for (int i = 0; i < this.INIT_HAND_SIZE; i++) {
                Card drawnCard = cardDeck.drawCard();
                player.addCard(drawnCard);
            }
        }
    }

    public boolean performAction(Player player, Actions action) throws IllegalMoveException {
        return performAction(player, player, action, -1);
    }
    public boolean performAction(Player player, Actions action, int index) throws IllegalMoveException {
        return performAction(player, null, action, index);
    }
    public boolean performAction(Player player1, Player player2, Actions action, int index) throws IllegalMoveException {
        switch (action) {
            case SWAP:
                actionPerformer.swapDrawnCard(player1, index);
                return true;
            case DISCARD:
                actionPerformer.discardCard(player1);
                return true;
            case END_TURN:
                actionPerformer.endTurn(player1);
                return true;
            case PUT_SELF:
                return actionPerformer.putSelf(player1, index);
            case TRANSFER:
                actionPerformer.transferCard(player1, player2, index);
                return true;
            case PUT_OTHER:
                return actionPerformer.putOther(player1, player2, index);
            case CALL_KHABU:
                actionPerformer.callKhabu(player1);
                return true;
            case DRAW_FROM_DECK:
                actionPerformer.drawFromDeck(player1);
                return true;
            case DRAW_FROM_DISC:
                actionPerformer.drawFromDisc(player1, index);
                return true;
            default:
                throw new IllegalMoveException(String.format(
                        "Tried to perform move which is not legal with %s, %s , %s, %d",
                        player1, player2, action, index));
        }
    }

    public boolean performEffect(Player current, int index, Effect effect) throws IllegalMoveException {
        return performEffect(current, null, null, effect, index, 0);
    }

    public boolean performEffect(Player current, Player target1, int index, Effect effect) throws IllegalMoveException {
        return performEffect(current, target1, null, effect, index, 0);
    }

    public boolean performEffect(Player current, Player target1, Player target2, Effect effect, int indexOne, int indexTwo) throws IllegalMoveException {
        switch (effect) {
            case CHECK_SELF_CARD:
                effectPerformer.checkOwnCard(current, indexOne);
                return true;
            case CHECK_OTHER_CARD:
                effectPerformer.checkOpponentCard(current, target1, indexOne);
                return true;
            case EXCHANGE_CARDS:
                effectPerformer.exchangeCards(current, target1, target2, indexOne, indexTwo);
                return true;
            case CHECK_TWO_CARDS:
                effectPerformer.checkTwoCards(current, target1, target2, indexOne, indexTwo);
                return true;
            case EXCHANGE_AFTER_CHECKS:
                effectPerformer.swapCheckedCardsFromKingEffect(current);
                return true;
            default:
                return false;
        }
    }

    public boolean readyUp(Player player) {
        if (this.roundStarted)
            throw new IllegalStateException("Game has already started. Cannot ready up");
        boolean readiedUp = playersReady.get(player);
        playersReady.put(player, !readiedUp);
        return this.roundStarted;
    }

    public Card revealCard(Player player, int index) throws IllegalMoveException {
        if (this.roundStarted) {throw new IllegalStateException("Round has already begun");}
        int alreadyRevealed = this.revealedCard.get(player);
        int maxReveal = this.INIT_HAND_SIZE/2;
        if (alreadyRevealed == maxReveal) {
            throw new IllegalMoveException(String.format("Already shown %d cards", maxReveal));
        }
        this.revealedCard.put(player, alreadyRevealed+1);
        return player.getCard(index);
    }

    public Map<Player, CardHand> revealHands() {
        if (this.roundStarted)
            throw new IllegalStateException("Game already begun. Cannot reveal hands now");
        Map<Player, CardHand> hands = new HashMap<>(); // TODO: Improve encapsulation
        for (Player player : players) {
            CardHand receivedHand = player.getCardHand();
            hands.put(player, receivedHand);
        }
        return hands;
    }

    public void setStarted(boolean started) {
        this.roundStarted = started;
    }

    // ------------------------------ GETTERS ---------------------------------

    public int getPlayersReady() {
        return (int) playersReady.values().stream().filter(Boolean::booleanValue).count();
    }

    public Turn getTurn() {
        return this.turn;
    }

    public CardDeck getCardDeck() {
        return this.cardDeck;
    }

    public DiscardPile getDiscardPile() {
        return discardPile;
    }

    public Player[] getPlayers() {
        return this.players.clone();
    }

    public boolean getStarted() {
        return this.roundStarted;
    }

    public int getScore(Player player) {
        return scores.get(player);
    }

    public Player getPlayerById(int id) {
        return this.players[id-1];
    }

    // EFFECT GETTERS USED TO REDUCE LENGTH OF MESSAGES BETWEEN SERVER AND CLIENT

    public Player getTemporaryTargetOne() {
        return effectPerformer.getTemporaryTargetOne();
    }
    public Player getTemporaryTargetTwo() {
        return effectPerformer.getTemporaryTargetTwo();
    }
    public int getTemporaryTargetIndexOne() {
        return effectPerformer.getTemporaryTargetIndexOne();
    }
    public int getTemporaryTargetIndexTwo() {
        return effectPerformer.getTemporaryTargetIndexTwo();
    }

    public void clearTemps() {
        effectPerformer.clearTempTargets();
    }
  
    public Player getTransferTarget() {
        return actionPerformer.getTemporaryTarget();
    }
}
