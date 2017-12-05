package com.dragon.server.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "COURSE")
public class Course {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "COURSE_NAME")
    @NotNull
    private String courseName;

    @Column(name = "COURSE_DESCRIPTION")
    @NotNull
    private String courseDescription;

    @Column(name = "ENABLED")
    @NotNull
    private Boolean enabled;

    @Column(name = "TUITION")
    @NotNull
    private Double tuition;

    @ManyToOne
    private Program program;

    @OneToMany(mappedBy = "course")
    private Set<Session> sessions;

    public Course() {
    }

    public Course(String courseName, String courseDescription, Boolean enabled, Program program, Set<Session> sessions) {
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.enabled = enabled;
        this.program = program;
        this.sessions = sessions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Double getTuition() {
        return tuition;
    }

    public void setTuition(Double tuition) {
        this.tuition = tuition;
    }

    public Program getProgram() {
        return program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public Set<Session> getSessions() {
        return sessions;
    }

    public void setSessions(Set<Session> sessions) {
        this.sessions = sessions;
    }

    public void addSession(Session session) {
        this.sessions.add(session);
    }

    public boolean removeSession(Session session) {
        if (this.sessions.contains(session)) {
            this.sessions.remove(session);
            return true;
        }
        return false;
    }
}
