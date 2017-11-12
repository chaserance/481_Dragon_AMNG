package com.dragon.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "USER")
public class User {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USERNAME", length = 50, unique = true)
    @NotNull
    @Size(min = 4, max = 50)
    private String username;

    @Column(name = "PASSWORD", length = 100)
    @NotNull
    @Size(min = 4, max = 100)
    @JsonIgnore
    private String password;

    @Column(name = "FIRST_NAME", length = 50)
    @NotNull
    @Size(max = 50)
    private String firstname;

    @Column(name = "LAST_NAME", length = 50)
    @NotNull
    @Size(max = 50)
    private String lastname;

    @Column(name = "ENABLED")
    private Boolean enabled;

    @Column(name = "LAST_PASSWORD_RESET_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastPasswordResetDate;

    @Column(name = "REGISTRATION_DATE")
    private Date registrationDate;

    @Column(name = "ADDRESS")
    @NotNull
    @Embedded
    private Address address;

    @Column(name = "PHONE_NUMBER")
    @NotNull
    private String phoneNumber;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "USER_ROLE",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")})
    private Set<Role> roles;

    // Start at this line, instance variables are role dependent (nullable)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Child> children;

    @OneToOne(cascade = {CascadeType.REMOVE})
    private Bill bill;

    @OneToMany(mappedBy = "teacher")
    private Set<Session> sessions;

    public User() {
    }

    public User(String username, String password, String firstname, String lastname, Address address, String phoneNumber) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Role> getRoles() {
        return this.roles;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public boolean removeRole(Role role) {
        if (this.roles.contains(role)) {
            this.roles.remove(role);
            return true;
        }
        return false;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Date getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }

    public void setLastPasswordResetDate(Date lastPasswordResetDate) {
        this.lastPasswordResetDate = lastPasswordResetDate;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<Child> getChildren() {
        return children;
    }

    public void setChildren(Set<Child> children) {
        this.children = children;
    }

    public void addChild(Child child) {
        this.children.add(child);
    }

    public boolean removeChild(Child child) {
        if (this.children.contains(child)) {
            this.children.remove(child);
            return true;
        }
        return false;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
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
