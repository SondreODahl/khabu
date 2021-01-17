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

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
class EffectPerformerTest {

    EffectPerformer effectPerformer;
    Turn turn;
    Player player1;
    Player player2;
    DiscardPile discardPile;
    Card spadesFour;


    @BeforeEach
    void setUp() {
        player1 = new Player("Player1", 1, "asdasd");
        player2 = new Player("Player2", 1, "awqesaq");
        ArrayList<Player> players = new ArrayList<>(Arrays.asList(player1, player2));
        turn = new Turn(players);
        discardPile = new DiscardPile();
        effectPerformer = new EffectPerformer(turn, discardPile, Round.DummyConstructor());
        spadesFour = new Card(4, 'S');

        // Set turn variables
        turn.setGameState(Gamestate.USE_EFFECT);
        turn.setCurrentPlayer(player1);
    }

    @Test
    void checkingYourOwnCardReturnsTheRightCard() throws IllegalMoveException {
        effectPerformer.setTopOfDiscardValue(7);
        player1.addCardToSpecificIndex(spadesFour, 0);
        assertEquals(spadesFour, effectPerformer.checkOwnCard(player1, 0));
    }

    @Test
    void usingCheckOwnCardEffectUpdatesStateToFrenzy() throws IllegalMoveException {
        effectPerformer.setTopOfDiscardValue(7);
        setupHands();
        effectPerformer.checkOwnCard(player1, 0);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void usingCheckOpponentCardEffectUpdatesStateToFrenzy() throws IllegalMoveException {
        effectPerformer.setTopOfDiscardValue(9);
        setupHands();
        effectPerformer.checkOpponentCard(player1, player2, 0);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void usingExchangeCardEffectUpdatesStateToFrenzy() throws IllegalMoveException {
        setupHands();
        effectPerformer.setTopOfDiscardValue(11);
        effectPerformer.exchangeCards(player1, player1, player2,0, 0);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void checkTwoCardsEffectUpdatesStateToKingEffect() throws IllegalMoveException {
        setupHands();
        effectPerformer.setTopOfDiscardValue(13);
        effectPerformer.checkTwoCards(player1, player1, player2, 0, 0);
        assertEquals(Gamestate.KING_EFFECT, turn.getGameState());
    }

    @Test
    void useCheckSelfCardCorrespondsToTopOfDiscardPile() {
        effectPerformer.setTopOfDiscardValue(3);
        setupHands();
        IllegalMoveException thrown = assertThrows(IllegalMoveException.class,
                () -> effectPerformer.checkOwnCard(player1, 0),
                "Expected card value to be 7 or 8, but it wasn't"
        );

        assertEquals("Wrong card value", thrown.getMessage());
    }

    @Test
    void useCheckOpponentCardCorrespondsToTopOfDiscardPile() {
        effectPerformer.setTopOfDiscardValue(2);
        setupHands();
        IllegalMoveException thrown = assertThrows(IllegalMoveException.class,
                () -> effectPerformer.checkOpponentCard(player1, player2, 0),
                "Expected card value to be 9 or 10, but it wasn't"
        );

        assertEquals("Wrong card value", thrown.getMessage());
    }

    @Test
    void useExchangeCardCorrespondsToTopOfDiscardPile() {
        effectPerformer.setTopOfDiscardValue(6);
        setupHands();
        IllegalMoveException thrown = assertThrows(IllegalMoveException.class,
                () -> effectPerformer.checkOwnCard(player1, 0),
                "Expected card value to be 11 or 12, but it wasn't"
        );

        assertEquals("Wrong card value", thrown.getMessage());
    }

    @Test
    void useCheckTwoCardsCorrespondsToTopOfDiscardPile() {
        effectPerformer.setTopOfDiscardValue(9);
        setupHands();
        IllegalMoveException thrown = assertThrows(IllegalMoveException.class,
                () -> effectPerformer.checkTwoCards(player1, player1, player2, 0, 0),
                "Expected card to be a black king, but it wasn't"
        );

        assertEquals("Wrong card value", thrown.getMessage());
    }


    @Test
    void checkingOpponentsCardReturnsTheRightCard() throws IllegalMoveException {
        player2.addCardToSpecificIndex(spadesFour, 4);
        effectPerformer.setTopOfDiscardValue(9);
        setupHands();
        assertEquals(spadesFour, effectPerformer.checkOpponentCard(player1, player2, 4));
    }

    @Test
    void exchangeCardPutsYourCardIntoCorrectIndex() throws IllegalMoveException {
        Card cardToBeChecked = new Card(2, 'S');
        player1.addCard(cardToBeChecked);
        setupHands();
        effectPerformer.setTopOfDiscardValue(11);
        effectPerformer.exchangeCards(player1, player1, player2, 0, 1);
        assertEquals(cardToBeChecked, player2.getCard(1));
    }

    @Test
    void cardIsNotInHandAfterExchangingCard() throws IllegalMoveException {
        Card cardToBeChecked = new Card(2, 'S');
        player1.addCard(cardToBeChecked);
        effectPerformer.setTopOfDiscardValue(11);
        setupHands();
        effectPerformer.exchangeCards(player1, player1, player2, 0, 1);
        assertEquals(0, player1.findCardIndexbyCard(cardToBeChecked));
    }

    void setupHands() {
        player1.addCard(new Card(7, 'S'));
        player2.addCard(new Card(3, 'S'));
        player2.addCard(new Card(8, 'S'));
    }

}