package com.dragon.server.entity;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Embeddable
public class Schedule implements Serializable {

    public static final String PLACEHOLDER = "O";
    public static final int DAY_LENGTH = 7;
    public static final char EMPTY = '_';

    @NotNull
    private byte days;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private Date startTime;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private Date endTime;

    public Schedule() {
    }

    public String getDays() {
        return decodeDays(this.days);
    }

    public void setDays(String days) {
        this.days = encodeDays(days);
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    private String decodeDays(byte code) {
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < DAY_LENGTH; i++) {
            if((code & (1 << i)) != 0) {
                sb.append(PLACEHOLDER);
            }else{
                sb.append(EMPTY);
            }
        }
        return sb.toString();
    }

    private byte encodeDays(String days) {
        byte code = 0;
        for(int i = 0; i < DAY_LENGTH; i++) {
            if(days.charAt(i) != EMPTY) {
                code |= (1 << i);
            }
        }
        return code;
    }
}
