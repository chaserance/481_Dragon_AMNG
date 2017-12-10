package com.dragon.server.service;

import com.dragon.server.entity.Role;
import com.dragon.server.entity.User;
import com.dragon.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean create(User user) {
        if(getUserByUsername(user).isPresent()) {
            return false;
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        user.setLastPasswordResetDate(new Date());
        user.setRegistrationDate(new Date());
        user.setRoles(new HashSet<>(Arrays.asList(roleService.getUserRole())));
        userRepository.save(user);
        return true;
    }

    @Override
    public void changePassword(User user) {
        Optional<User> userInDB = userRepository.findByUsername(user.getUsername());
        if(userInDB.isPresent()) {
            userInDB.get().setPassword(user.getPassword());
            userRepository.save(userInDB.get());
        }
    }

    @Override
    public void delete(User user) {
        userRepository.delete(userRepository.findByUsername(user.getUsername()).get().getId());
    }

    @Override
    public void addRole(User user, Role role) {
        Optional<User> userInDB = getUserByUsername(user);
        if(userInDB.isPresent()) {
            userInDB.get().addRole(role);
            userRepository.save(userInDB.get());
        }
    }

    @Override
    public void removeRole(User user, Role role) {
        Optional<User> userInDB = getUserByUsername(user);
        if(userInDB.isPresent()) {
            userInDB.get().removeRole(role);
            userRepository.save(userInDB.get());
        }
    }

    @Override
    public boolean isParent(User user) {
        Role parent = roleService.getUserRole();
        return user.getRoles().contains(parent);
    }

    @Override
    public boolean isTeacher(User user) {
        Role teacher = roleService.getTeacherRole();
        return user.getRoles().contains(teacher);
    }

    @Override
    public boolean isAdmin(User user) {
        Role admin = roleService.getAdminRole();
        return user.getRoles().contains(admin);
    }

    private Optional<User> getUserByUsername(User user) {
        return userRepository.findByUsername(user.getUsername());
    }

}
