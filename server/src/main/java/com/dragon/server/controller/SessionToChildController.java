package com.dragon.server.controller;

import com.dragon.server.common.ErrorCode;
import com.dragon.server.common.ErrorResponse;
import com.dragon.server.entity.Child;
import com.dragon.server.entity.Session;
import com.dragon.server.entity.EducationalPerformance;
import com.dragon.server.model.PerformanceDto;
import com.dragon.server.repository.SessionRepository;
import com.dragon.server.repository.EducationalPerformanceRepository;
import com.dragon.server.service.BasePathAwareLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RepositoryRestController
@RequestMapping(path = "/sessions/{sessionId}/performances")
public class SessionToChildController {

    private EducationalPerformanceRepository educationalPerformanceRepository;
    private SessionRepository sessionRepository;
    private RepositoryEntityLinks repositoryEntityLinks;
    private BasePathAwareLinkService linkService;

    @Autowired
    public SessionToChildController(EducationalPerformanceRepository educationalPerformanceRepository, SessionRepository sessionRepository, RepositoryEntityLinks repositoryEntityLinks, BasePathAwareLinkService linkService) {
        this.educationalPerformanceRepository = educationalPerformanceRepository;
        this.sessionRepository = sessionRepository;
        this.repositoryEntityLinks = repositoryEntityLinks;
        this.linkService = linkService;
    }


    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getAllPerformancesForSession(@PathVariable(value = "sessionId") Long sessionId) {
        Session session = verifySession(sessionId);
        List<EducationalPerformance> performanceList = educationalPerformanceRepository.findByPkSessionId(session.getId());

        if(performanceList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Resource<EducationalPerformance>> resourcesList = performanceList.stream().map(e -> {
            Resource<EducationalPerformance> resource = new Resource<>(e);
            resource.add(
                    linkService.underBasePath(
                            linkTo(methodOn(SessionToChildController.class).getOne(e.getPk().getChildId(), sessionId))
                    ).withSelfRel());
            resource.add(repositoryEntityLinks.linkToSingleResource(Child.class, e.getPk().getChildId()));
            return resource;
        }).collect(Collectors.toList());

        Resources resources = new Resources(resourcesList);
        resources.add(
                linkService.underBasePath(
                    linkTo(methodOn(SessionToChildController.class).getAllPerformancesForSession(sessionId))
                ).withSelfRel());
        resources.add(repositoryEntityLinks.linkToSingleResource(Session.class, session.getId()));

        return ResponseEntity.ok(resources);
    }

    /**
     * Get a EducationalPerformance of a Session in a Child
     *
     * @param childId
     * @param sessionId
     */
    @RequestMapping(method = RequestMethod.GET, path = "/{childId}")
    public ResponseEntity getOne(@PathVariable(value = "childId") Long childId, @PathVariable(value = "sessionId") Long sessionId) {
        EducationalPerformance performance = verifyPerformance(sessionId, childId);
        Resource<EducationalPerformance> resource = new Resource<>(performance);
        resource.add(
                linkService.underBasePath(
                    linkTo(methodOn(SessionToChildController.class).getOne(childId, sessionId))
                ).withSelfRel());
        resource.add(repositoryEntityLinks.linkToSingleResource(Child.class, childId));
        return ResponseEntity.ok(resource);
    }

    /**
     * Update a EducationalPerformance of a Session in a Child
     *
     * @param childId
     * @param sessionId
     */
    @PreAuthorize("@SecurityServiceImpl.canUpdateCurrentPerformance(#childId, #sessionId, principal.username) or hasAuthority('CAN_WRITE_PERFORMANCE')")
    @RequestMapping(method = RequestMethod.PUT, path = "/{childId}")
    public ResponseEntity updatePerformance(@PathVariable(value = "childId") Long childId, @PathVariable(value = "sessionId") Long sessionId, @RequestBody PerformanceDto dto) {
        EducationalPerformance performance = verifyPerformance(childId, sessionId);
        performance.setFeedBack(dto.getFeedBack());
        performance.setGrade(dto.getGrade());
        educationalPerformanceRepository.save(performance);
        EducationalPerformance performance2 = verifyPerformance(childId, sessionId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Verify and return the EducationalPerformance for a particular Session and Child
     * @param sessionId
     * @param childId
     * @return the found EducationalPerformance
     * @throws NoSuchElementException if no EducationalPerformance found
     */
    private EducationalPerformance verifyPerformance(Long sessionId, Long childId) throws NoSuchElementException {
        EducationalPerformance performance = educationalPerformanceRepository.findByPkChildIdAndPkSessionId(childId, sessionId);
        if (performance == null) {
            throw new NoSuchElementException("Child-Performance pair for request (session-"
                    + sessionId + ", child-" + childId + ")");
        }
        return performance;
    }

    /**
     * Verify and return the Session given a SessionId.
     *
     * @param sessionId
     * @return the found Session
     * @throws NoSuchElementException if no Session found.
     */
    private Session verifySession(Long sessionId) throws NoSuchElementException {
        Session session = sessionRepository.findOne(sessionId);
        if (session == null) {
            throw new NoSuchElementException("Session does not exist " + sessionId);
        }
        return session;
    }

    /**
     * Exception handler if NoSuchElementException is thrown in this Controller
     *
     * @param ex
     * @return Error message String.
     */
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity return404(NoSuchElementException ex) {
        final ErrorResponse apiError = ErrorResponse.of(ex.getLocalizedMessage(), ErrorCode.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);

    }
}
