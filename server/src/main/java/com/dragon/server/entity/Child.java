package com.dragon.server.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "CHILD")
public class Child {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FIRST_NAME")
    @NotNull
    private String firstname;

    @Column(name = "LAST_NAME")
    @NotNull
    private String lastname;

    @Column(name = "GENDER")
    @NotNull
    private Gender gender;

    @Column(name = "DOB")
    private Date dob;

    @Column(name = "ENTRY_LEVEL")
    @NotNull
    private StudentLevel entryLevel;

    @Column(name = "CURRENT_LEVEL")
    @NotNull
    private StudentLevel currentLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private User parent;

    public Child() {
    }

    public Child(String firstname, String lastname, Gender gender, StudentLevel entryLevel, StudentLevel currentLevel) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.entryLevel = entryLevel;
        this.currentLevel = currentLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public StudentLevel getEntryLevel() {
        return entryLevel;
    }

    public void setEntryLevel(StudentLevel entryLevel) {
        this.entryLevel = entryLevel;
    }

    public StudentLevel getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(StudentLevel currentLevel) {
        this.currentLevel = currentLevel;
    }

    public User getParent() {
        return parent;
    }

    public void setParent(User parent) {
        this.parent = parent;
    }
}
