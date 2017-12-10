package com.dragon.server.entity;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalTime;

@Embeddable
public class Schedule implements Serializable {

    public static final String DAYS_OF_WEEK = "MTWRFSU";
    public static final char EMPTY = '_';

    @NotNull
    private byte days;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalTime endTime;

    public Schedule() {
    }

    public String getDays() {
        return decodeDays(this.days);
    }

    public void setDays(String days) {
        this.days = encodeDays(days);
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    private String decodeDays(byte code) {
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < DAYS_OF_WEEK.length(); i++) {
            if((code & (1 << i)) != 0) {
                sb.append(DAYS_OF_WEEK.charAt(i));
            }else{
                sb.append(EMPTY);
            }
        }
        return sb.toString();
    }

    private byte encodeDays(String days) {
        byte code = 0;
        for(int i = 0; i < DAYS_OF_WEEK.length(); i++) {
            if(days.charAt(i) != EMPTY) {
                code |= (1 << i);
            }
        }
        return code;
    }
}
