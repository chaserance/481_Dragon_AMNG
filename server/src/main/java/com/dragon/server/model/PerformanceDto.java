package com.dragon.server.model;

public class PerformanceDto {

    private String feedBack;

    private String grade;

    private String sessionUri;

    private String childUri;

    public PerformanceDto() {
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

    public String getSessionUri() {
        return sessionUri;
    }

    public void setSessionUri(String sessionUri) {
        this.sessionUri = sessionUri;
    }

    public String getChildUri() {
        return childUri;
    }

    public void setChildUri(String childUri) {
        this.childUri = childUri;
    }

    public Long getSessionId() {
        return Long.valueOf(sessionUri.substring(sessionUri.length() - 1));
    }

    public Long getChildId() {
        return Long.valueOf(childUri.substring(childUri.length() - 1));
    }
}
