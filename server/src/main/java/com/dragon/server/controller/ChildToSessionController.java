package com.dragon.server.controller;

import com.dragon.server.common.ErrorCode;
import com.dragon.server.common.ErrorResponse;
import com.dragon.server.entity.Child;
import com.dragon.server.entity.EducationalPerformance;
import com.dragon.server.entity.EducationalPerformancePk;
import com.dragon.server.entity.Session;
import com.dragon.server.model.PerformanceDto;
import com.dragon.server.repository.ChildRepository;
import com.dragon.server.repository.EducationalPerformanceRepository;
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
@RequestMapping(path = "/children/{childId}/performances")
public class ChildToSessionController {

    private EducationalPerformanceRepository educationalPerformanceRepository;
    private ChildRepository childRepository;
    private RepositoryEntityLinks repositoryEntityLinks;

    @Autowired
    public ChildToSessionController(EducationalPerformanceRepository educationalPerformanceRepository, ChildRepository childRepository, RepositoryEntityLinks repositoryEntityLinks) {
        this.educationalPerformanceRepository = educationalPerformanceRepository;
        this.childRepository = childRepository;
        this.repositoryEntityLinks = repositoryEntityLinks;
    }

    @PreAuthorize("@SecurityServiceImpl.canCreateNewPerformance(#childId, principal.username) or hasAuthority('CAN_WRITE_PERFORMANCE')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createPerformance(@PathVariable(value = "childId") Long childId, @RequestBody PerformanceDto dto) {
        Child child = verifyChild(childId);
        EducationalPerformance performance = educationalPerformanceRepository.save(new EducationalPerformance(new EducationalPerformancePk(child.getId(), dto.getSessionId()),
                dto.getFeedBack(), dto.getGrade()));
        Resource<EducationalPerformance> resource = new Resource<>(performance);
        resource.add(linkTo(methodOn(ChildToSessionController.class).getOne(child.getId(), dto.getSessionId())).withSelfRel());
        return new ResponseEntity(resource, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getAllPerformancesForChild(@PathVariable(value = "childId") Long childId) {
        Child child = verifyChild(childId);
        List<EducationalPerformance> performanceList = educationalPerformanceRepository.findByPkChildId(child.getId());

        if(performanceList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Resource<EducationalPerformance>> resourcesList = performanceList.stream().map(e -> {
            Resource<EducationalPerformance> resource = new Resource<>(e);
            resource.add(linkTo(methodOn(ChildToSessionController.class).getOne(childId, e.getPk().getSessionId())).withSelfRel());
            return resource;
        }).collect(Collectors.toList());

        Resources resources = new Resources(resourcesList);
        resources.add(linkTo(methodOn(ChildToSessionController.class).getAllPerformancesForChild(childId)).withSelfRel());
        resources.add(repositoryEntityLinks.linkToSingleResource(Child.class, child.getId()));

        return ResponseEntity.ok(resources);
    }

    /**
     * Get a EducationalPerformance of a Child in a session
     *
     * @param childId
     * @param sessionId
     */
    @RequestMapping(method = RequestMethod.GET, path = "/{sessionId}")
    public ResponseEntity getOne(@PathVariable(value = "childId") Long childId, @PathVariable(value = "sessionId") Long sessionId) {
        EducationalPerformance performance = verifyPerformance(childId, sessionId);
        Resource<EducationalPerformance> resource = new Resource<>(performance);
        resource.add(linkTo(methodOn(ChildToSessionController.class).getOne(childId, sessionId)).withSelfRel());
        resource.add(repositoryEntityLinks.linkToSingleResource(Session.class, sessionId));
        return ResponseEntity.ok(resource);
    }

    /**
     * Delete a EducationalPerformance of a Child in a session
     *
     * @param childId
     * @param sessionId
     */
    @PreAuthorize("@SecurityServiceImpl.canCreateNewPerformance(#childId, principal.username) or hasAuthority('CAN_WRITE_PERFORMANCE')")
    @RequestMapping(method = RequestMethod.DELETE, path = "/{sessionId}")
    public ResponseEntity deleteOne(@PathVariable(value = "childId") Long childId, @PathVariable(value = "sessionId") Long sessionId) {
        EducationalPerformance performance = verifyPerformance(childId, sessionId);
        educationalPerformanceRepository.delete(performance);
        return ResponseEntity.noContent().build();
    }

    /**
     * Verify and return the EducationalPerformance for a particular Child and Session
     * @param childId
     * @param sessionId
     * @return the found EducationalPerformance
     * @throws NoSuchElementException if no EducationalPerformance found
     */
    private EducationalPerformance verifyPerformance(Long childId, Long sessionId) throws NoSuchElementException {
        EducationalPerformance performance = educationalPerformanceRepository.findByPkChildIdAndPkSessionId(childId, sessionId);
        if (performance == null) {
            throw new NoSuchElementException("Child-Performance pair for request (child-"
                    + childId + ", session-" + sessionId + ")");
        }
        return performance;
    }

    /**
     * Verify and return the Child given a childId.
     *
     * @param childId
     * @return the found Child
     * @throws NoSuchElementException if no Child found.
     */
    private Child verifyChild(Long childId) throws NoSuchElementException {
        Child child = childRepository.findOne(childId);
        if (child == null) {
            throw new NoSuchElementException("Child does not exist " + childId);
        }
        return child;
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
