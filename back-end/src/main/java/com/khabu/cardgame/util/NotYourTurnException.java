package com.khabu.cardgame.util;

public class NotYourTurnException extends Exception {
    public NotYourTurnException() { super(); }
    public NotYourTurnException(String message) { super(message); }
    public NotYourTurnException(String message, Throwable cause) { super(message, cause); }
    public NotYourTurnException(Throwable cause) { super(cause); }
}
