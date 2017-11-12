package com.dragon.server.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EDUCATIONAL_PERFORMANCE")
public class EducationalPerformance {

    @EmbeddedId
    private EducationalPerformancePk id;

    @Column(name = "FEEDBACK")
    private String feedBack;

    @Column(name = "GRADE")
    private String grade;

    public EducationalPerformance() {
    }

    public EducationalPerformancePk getId() {
        return id;
    }

    public void setId(EducationalPerformancePk id) {
        this.id = id;
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
}
