package com.dragon.server.entity;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.DayOfWeek;
import java.time.Duration;

@Embeddable
public class Schedule implements Serializable {

    private DayOfWeek day;

    private Duration duration;
}
