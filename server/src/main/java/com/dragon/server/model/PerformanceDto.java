package com.dragon.server.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class PerformanceDto {

    @Size(max = 511)
    private String feedBack;

    private String grade;

    @NotNull
    private Long sessionId;

    public PerformanceDto() {
    }

    public PerformanceDto(String feedBack, String grade, Long sessionId) {
        this.feedBack = feedBack;
        this.grade = grade;
        this.sessionId = sessionId;
    }

    public String getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(String feedBack) {
        this.feedBack = feedBack;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }
}
