package com.dragon.server.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "PROMOTION")
public class Promotion {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PROMOTION_NAME")
    @NotNull
    private String name;

    @Column(name = "PROMOTION_DESCRIPTION")
    @NotNull
    private String description;

    @Column(name = "PROMOTION_RATIO")
    @NotNull
    private Double ratio;

    public Promotion() {
    }

    public Promotion(String name, String description, Double ratio) {
        this.name = name;
        this.description = description;
        this.ratio = ratio;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRatio() {
        return ratio;
    }

    public void setRatio(Double ratio) {
        this.ratio = ratio;
    }
}
