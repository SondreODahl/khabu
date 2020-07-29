package com.khabu.cardgame.model.game.effect;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.model.game.action.ActionPerformer;
import com.khabu.cardgame.model.game.action.Gamestate;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardDeck;
import com.khabu.cardgame.model.game.card.DiscardPile;
import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EffectPerformerTest {

    EffectPerformer effectPerformer;
    Turn turn;
    Player player1;
    Player player2;
    DiscardPile discardPile;
    CardDeck cardDeck;
    Card spadesFour;


    @BeforeEach
    void setUp() {
        player1 = new Player("Player1", 1, "asdasd");
        player2 = new Player("Player2", 1, "awqesaq");
        Player[] players = new Player[]{player1, player2};
        turn = new Turn(players);
        discardPile = new DiscardPile();
        cardDeck = new CardDeck(discardPile);
        effectPerformer = new EffectPerformer(turn, cardDeck, discardPile, Round.DummyConstructor());
        spadesFour = new Card(4, 'S');

        // Set turn variables
        turn.setGameState(Gamestate.DISCARD);
        turn.setCurrentPlayer(player1);
    }

    @Test
    void checkingYourOwnCardReturnsTheRightCard() throws IllegalMoveException {
        player1.addCard(spadesFour);
        assertEquals(spadesFour, effectPerformer.checkOwnCard(player1, 1));
    }

    @Test
    void usingCheckOwnCardEffectUpdatesStateToFrenzy() throws IllegalMoveException {
        player1.addCard(spadesFour);
        effectPerformer.checkOwnCard(player1, 1);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void usingCheckOpponentCardEffectUpdatesStateToFrenzy() throws IllegalMoveException {
        player2.addCard(spadesFour);
        effectPerformer.checkOpponentCard(player1, player2, 1);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void usingExchangeCardEffectUpdatesStateToFrenzy() throws IllegalMoveException {
        player1.addCard(spadesFour);
        player2.addCard(new Card(8, 'S'));
        effectPerformer.exchangeCards(player1, player1, player2,1, 1);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void checkTwoCardsEffectUpdatesStateToKingEffect() throws IllegalMoveException {
        player1.addCard(spadesFour);
        player2.addCard(new Card(5, 'D'));
        effectPerformer.checkTwoCards(player1, player1, player2, 1, 1);
        assertEquals(Gamestate.KING_EFFECT, turn.getGameState());
    }

    @Test
    void useCheckSelfCardCorrespondsToTopOfDiscardPile() {
        discardPile.put(new Card(5, 'H'));
        player1.addCard(spadesFour);
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class,
                () -> effectPerformer.checkOwnCard(player1, 1),
                "Expected card value to be 7 or 8, but it wasn't"
        );

        assertEquals("Wrong card value", thrown.getMessage());
    }

    @Test
    void useCheckOpponentCardCorrespondsToTopOfDiscardPile() {
        discardPile.put(new Card(5, 'H'));
        player2.addCard(spadesFour);
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class,
                () -> effectPerformer.checkOpponentCard(player1, player2, 1),
                "Expected card value to be 9 or 10, but it wasn't"
        );

        assertEquals("Wrong card value", thrown.getMessage());
    }

    @Test
    void useExchangeCardCorrespondsToTopOfDiscardPile() {
        discardPile.put(new Card(5, 'H'));
        player1.addCard(spadesFour);
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class,
                () -> effectPerformer.checkOwnCard(player1, 1),
                "Expected card value to be 11 or 12, but it wasn't"
        );

        assertEquals("Wrong card value", thrown.getMessage());
    }

    @Test
    void useCheckTwoCardsCorrespondsToTopOfDiscardPile() {
        discardPile.put(new Card(5, 'H'));
        player1.addCard(spadesFour);
        player2.addCard(new Card(8, 'C'));
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class,
                () -> effectPerformer.checkTwoCards(player1, player1, player2, 1, 1),
                "Expected card to be a black king, but it wasn't"
        );

        assertEquals("Wrong card value", thrown.getMessage());
    }


    @Test
    void checkingOpponentsCardReturnsTheRightCard() throws IllegalMoveException {
        player2.addCard(spadesFour);
        assertEquals(spadesFour, effectPerformer.checkOpponentCard(player1, player2, 1));
    }

    @Test
    void exchangeCardPutsYourCardIntoCorrectIndex() throws IllegalMoveException {
        Card cardToBeChecked = new Card(2, 'S');
        player1.addCard(cardToBeChecked);
        player1.addCard(new Card(7, 'S'));
        player2.addCard(new Card(3, 'S'));
        player2.addCard(new Card(8, 'S'));
        effectPerformer.exchangeCards(player1, player1, player2, 1, 2);
        assertEquals(cardToBeChecked, player2.getCard(2));
    }

    @Test
    void cardIsNotInHandAfterExchangingCard() throws IllegalMoveException {
        Card cardToBeChecked = new Card(2, 'S');
        player1.addCard(cardToBeChecked);
        player1.addCard(new Card(7, 'S'));
        player2.addCard(new Card(3, 'S'));
        player2.addCard(new Card(8, 'S'));
        effectPerformer.exchangeCards(player1, player1, player2, 1, 2);
        assertEquals(0, player1.findCardIndexbyCard(cardToBeChecked));
    }

}