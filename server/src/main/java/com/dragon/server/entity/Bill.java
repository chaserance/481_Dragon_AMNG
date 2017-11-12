package com.dragon.server.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "BILL")
public class Bill {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "AMOUNT")
    @NotNull
    private Double amount;

    @Column(name = "DISCOUNT")
    @NotNull
    private Double discount;

    @NotNull
    @Embedded
    private DatePeriod billPeriod;

    @OneToOne
    private User user;

    public Bill() {
    }

    public Bill(Double amount, Double discount, DatePeriod billPeriod) {
        this.amount = amount;
        this.discount = discount;
        this.billPeriod = billPeriod;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public DatePeriod getBillPeriod() {
        return billPeriod;
    }

    public void setBillPeriod(DatePeriod billPeriod) {
        this.billPeriod = billPeriod;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
