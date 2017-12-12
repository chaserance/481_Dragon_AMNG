package com.dragon.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.support.BaseUriLinkBuilder;
import org.springframework.hateoas.LinkBuilder;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.stereotype.Service;
import java.net.URI;

@Service
public class BasePathAwareLinksServiceImpl implements BasePathAwareLinkService {

    private final URI restBaseURI;

    @Autowired
    public BasePathAwareLinksServiceImpl(RepositoryRestConfiguration config) {
        restBaseURI = config.getBasePath();
    }

    @Override
    public LinkBuilder underBasePath(ControllerLinkBuilder linkBuilder) {
        URI currentUri = linkBuilder.toUri();
        URI contextBaseURI = URI.create(parseUri(currentUri));
        return BaseUriLinkBuilder.create(contextBaseURI)
                .slash(restBaseURI)
                .slash(contextBaseURI.relativize(URI.create(linkBuilder.toUri().getPath())));
    }

    private String parseUri(URI uri) {
        String[] parts = uri.toString().split("(?<!\\/)\\/(?!\\/)");
        return parts[0];
    }
}
