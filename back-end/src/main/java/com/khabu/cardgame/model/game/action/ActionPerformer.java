package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.util.IllegalMoveException;

import java.util.ArrayList;

public class ActionPerformer {

    private Turn turn;
    private ArrayList<Player> players;

    public ActionPerformer(Turn turn, ArrayList<Player> players) {
        this.turn = turn;
        this.players = players;
    }

    public void putSelf(Player player1, int i) {
    }

    public void endTurn(Player player1) {
    }

    /*
    public endTurn(Player player) {
        validateStateMove(player, Actions.END_TURN);
    }

    public khabu(Player player) {
        if (turn.getKhabuPlayer() == player) {
            throw new IllegalMoveException();
        }
        turn.setKhabuPlayer(player);
        endTurn();
    }

    private boolean validateStateMove(Player player, Actions action) {
        return ActionValidator.isValidMoveInCurrentState(player, action, turn);
    }
    */

}



