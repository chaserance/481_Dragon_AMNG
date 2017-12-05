package com.dragon.server.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "ROLE")
public class Role implements GrantedAuthority {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="NAME")
    @NotNull
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "ROLE_PRIVILEGE",
            joinColumns = {@JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "PRIVILEGE_ID", referencedColumnName = "ID")})
    private Set<Privilege> privileges;

    public Role() {}

    public Role(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addPrivilege(Privilege privilege) {
        this.privileges.add(privilege);
    }

    public boolean removePrivilege(Privilege privilege) {
        if(this.privileges.contains(privilege)) {
            this.privileges.remove(privilege);
            return true;
        }
        return false;
    }

    public Set<Privilege> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(Set<Privilege> privileges) {
        this.privileges = privileges;
    }

    @Override
    public boolean equals(Object obj) {
        if(obj.getClass() != this.getClass())
            return false;
        Role other = (Role)obj;
        return other.id == this.id;
    }

    @Override
    public int hashCode() {
        StringBuilder builder = new StringBuilder();
        builder.append(name);
        builder.append(id);
        return builder.toString().hashCode();
    }

    @Override
    public String toString() {
        return name.substring(5);
    }

    @JsonIgnore
    @Override
    public String getAuthority() {
        return name;
    }
}
