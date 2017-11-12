package com.dragon.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "PRIVILEGE")
public class Privilege implements GrantedAuthority {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="NAME")
    @NotNull
    private String name;


    public Privilege() {

    }

    public Privilege(String name) {
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


    @Override
    public boolean equals(Object obj) {
        if(obj.getClass() != this.getClass())
            return false;
        Privilege other = (Privilege)obj;
        return other.id == this.id;
    }

    @Override
    public int hashCode() {
        StringBuilder builder = new StringBuilder();
        builder.append(name);
        builder.append(id);
        return builder.toString().hashCode();
    }

    @JsonIgnore
    @Override
    public String getAuthority() {
        return name;
    }
}
