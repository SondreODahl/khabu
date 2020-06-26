package com.khabu.cardgame.event;

import java.util.Date;

public class LoginEvent {
    private String username;
    private Date time;

    public LoginEvent(String username) {
        this.username = username;
        time = new Date();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
