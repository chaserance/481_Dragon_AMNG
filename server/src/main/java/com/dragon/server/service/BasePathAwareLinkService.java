package com.dragon.server.service;

import org.springframework.hateoas.LinkBuilder;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public interface BasePathAwareLinkService {
    LinkBuilder underBasePath(ControllerLinkBuilder linkBuilder);
}
