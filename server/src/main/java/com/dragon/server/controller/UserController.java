package com.dragon.server.controller;

import com.dragon.server.entity.User;
import com.dragon.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

//    @PostAuthorize("(returnObject.getBody() == null) or returnObject.getBody().username == principal.username or hasRole('ADMIN')")
//    @RequestMapping(value = "/api/user", method = RequestMethod.GET)
//    public ResponseEntity<?> getuserByname(@RequestParam(value="username") String username) {
//        User user = userService.getByUsername(username).get();
//        if(user == null)
//            return ResponseEntity.notFound().build();
//        return ResponseEntity.ok(user);
//    }
//
//    @PreAuthorize("hasRole('ADMIN')")
//    @RequestMapping(value = "/api/users", method = RequestMethod.GET)
//    public ResponseEntity<?> getAllUser() {
//        List<User> users = userService.findAll();
//        if(users.isEmpty())
//            return ResponseEntity.notFound().build();
//        return ResponseEntity.ok(users);
//    }

    @RequestMapping(value = "/user-exist", method = RequestMethod.GET)
    public Map isExist(@RequestParam(value="email") String email) {
        Optional<User> user = userService.getByUsername(email);
        Map<String, Boolean> map = new HashMap<>();
        final String key = "exist";
        if(user.isPresent()) {
            map.put(key, true);
        } else {
            map.put(key, false);
        }
        return map;
    }
}
