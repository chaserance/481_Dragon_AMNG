package com.dragon.server.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "PROGRAM")
public class Program {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PROGRAM_NAME")
    @NotNull
    private String programName;

    @Column(name = "PROGRAM_DESCRIPTION")
    @NotNull
    private String programDescription;

    @Column(name = "ENABLED")
    @NotNull
    private Boolean enabled;

    @OneToMany(mappedBy = "program")
    private Set<Course> courses;

    public Program() {
    }

    public Program(String programName, String programDescription, Boolean enabled, Set<Course> courses) {
        this.programName = programName;
        this.programDescription = programDescription;
        this.enabled = enabled;
        this.courses = courses;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProgramName() {
        return programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public String getProgramDescription() {
        return programDescription;
    }

    public void setProgramDescription(String programDescription) {
        this.programDescription = programDescription;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public void addCourse(Course course) {
        this.courses.add(course);
    }

    public boolean removeCourse(Course course) {
        if (this.courses.contains(course)) {
            this.courses.remove(course);
            return true;
        }
        return false;
    }

}
