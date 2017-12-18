package com.dragon.server.controller;


import com.dragon.server.common.ErrorCode;
import com.dragon.server.common.ErrorResponse;
import com.dragon.server.entity.Session;
import com.dragon.server.entity.User;
import com.dragon.server.model.UserDto;
import com.dragon.server.repository.SessionRepository;
import com.dragon.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

@RepositoryRestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SessionRepository sessionRepository;


    @RequestMapping(value = "/users/{id}/sessions", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity usersSessions(@PathVariable(name = "id") Long id) {
        List<Session> sessionList = sessionRepository.findByTeacherId(id);

        Resources<Session> resources = new Resources<>(sessionList);

        resources.add(linkTo(methodOn(UserController.class).usersSessions(id)).withSelfRel());
        return ResponseEntity.ok(resources);
    }

    @RequestMapping(value = "/users", method = {RequestMethod.POST})
    @ResponseBody
    public ResponseEntity disablePostByUserEndpoint() {
        final ErrorResponse apiError = ErrorResponse.of("", ErrorCode.METHOD_NOT_SUPOORTED, HttpStatus.NOT_FOUND);
        return new ResponseEntity(apiError, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @RequestMapping(value = "/users/{id}", method = {RequestMethod.PUT, RequestMethod.PATCH})
    @ResponseBody
    public ResponseEntity updateUserInfo(UserDto userDto, @PathVariable(name = "id") Long id) {
        User user = verifyUser(id);
        userRepository.save(userDto.getUpdatedUser(user));
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    /**
     * Verify and return the User given a userId.
     *
     * @param userId
     * @return the found User
     * @throws NoSuchElementException if no User found.
     */
    private User verifyUser(Long userId) throws NoSuchElementException {
        User user = userRepository.findOne(userId);
        if (user == null) {
            throw new NoSuchElementException("User does not exist " + userId);
        }
        return user;
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
