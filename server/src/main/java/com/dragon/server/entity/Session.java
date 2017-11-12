package com.dragon.server.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "SESSION")
public class Session {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "COURSE_NAME")
    @NotNull
    private String sessionName;

    @Column(name = "COURSE_DESCRIPTION")
    @NotNull
    private String sessionDescription;

    @Column(name = "BILL_PERIOD")
    @NotNull
    @Embedded
    private DatePeriod period;

    @Column(name = "SCHEDULE")
    @NotNull
    @Embedded
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "TEACHER_ID")
    private User teacher;

    @ManyToOne
    private Course course;

    public Session() {
    }

    public Session(String sessionName, String sessionDescription, DatePeriod period, Schedule schedule, User teacher, Course course) {
        this.sessionName = sessionName;
        this.sessionDescription = sessionDescription;
        this.period = period;
        this.schedule = schedule;
        this.teacher = teacher;
        this.course = course;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public String getSessionDescription() {
        return sessionDescription;
    }

    public void setSessionDescription(String sessionDescription) {
        this.sessionDescription = sessionDescription;
    }

    public DatePeriod getPeriod() {
        return period;
    }

    public void setPeriod(DatePeriod period) {
        this.period = period;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public User getTeacher() {
        return teacher;
    }

    public void setTeacher(User teacher) {
        this.teacher = teacher;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
