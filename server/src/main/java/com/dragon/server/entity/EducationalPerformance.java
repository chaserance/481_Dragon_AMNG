package com.dragon.server.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EDUCATIONAL_PERFORMANCE")
public class EducationalPerformance {

    @EmbeddedId
    private EducationalPerformancePk pk;

    @Column(name = "FEEDBACK")
    private String feedBack;

    @Column(name = "GRADE")
    private String grade;

    public EducationalPerformance() {
    }

    public EducationalPerformance(EducationalPerformancePk pk, String feedBack, String grade) {
        this.pk = pk;
        this.feedBack = feedBack;
        this.grade = grade;
    }

    public EducationalPerformancePk getPk() {
        return pk;
    }

    public void setPk(EducationalPerformancePk pk) {
        this.pk = pk;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EducationalPerformance that = (EducationalPerformance) o;

        if (pk != null ? !pk.equals(that.pk) : that.pk != null) return false;
        if (feedBack != null ? !feedBack.equals(that.feedBack) : that.feedBack != null) return false;
        return grade != null ? grade.equals(that.grade) : that.grade == null;
    }

    @Override
    public int hashCode() {
        int result = pk != null ? pk.hashCode() : 0;
        result = 31 * result + (feedBack != null ? feedBack.hashCode() : 0);
        result = 31 * result + (grade != null ? grade.hashCode() : 0);
        return result;
    }
}
