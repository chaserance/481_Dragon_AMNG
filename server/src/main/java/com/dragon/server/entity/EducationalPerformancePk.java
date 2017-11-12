package com.dragon.server.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class EducationalPerformancePk implements Serializable {

    @Column(name = "CHILD_ID")
    private Long childId;

    @Column(name = "SESSION_ID")
    private Long sessionId;

    public EducationalPerformancePk() {
    }

    public EducationalPerformancePk(Long childId, Long sessionId) {
        this.childId = childId;
        this.sessionId = sessionId;
    }

    public Long getChildId() {
        return childId;
    }

    public void setChildId(Long childId) {
        this.childId = childId;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    @Override
    public boolean equals(Object o) {
        if(this == o)
            return true;
        if(o == null || getClass() != o.getClass())
            return false;

        EducationalPerformancePk other = (EducationalPerformancePk)o;
        return this.childId.equals(other.childId) && this.sessionId.equals(other.sessionId);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int hash = 17;
        hash = hash * prime + this.childId.hashCode();
        hash = hash * prime + this.sessionId.hashCode();

        return hash;
    }
}
