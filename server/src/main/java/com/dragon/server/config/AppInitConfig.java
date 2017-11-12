package com.dragon.server.config;

import com.dragon.server.entity.*;
import com.dragon.server.repository.PrivilegeRepository;
import com.dragon.server.repository.RoleRepository;
import com.dragon.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Component
public class AppInitConfig implements ApplicationListener<ContextRefreshedEvent> {

    private boolean setupAlready = false;

    @Autowired
    @Qualifier("userRepository")
    private UserRepository userRepository;

    @Autowired
    @Qualifier("roleRepository")
    private RoleRepository roleRepository;

    @Autowired
    @Qualifier("privilegeRepository")
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if(!setupAlready) {
            Privilege readPrivilege
                    = createPrivilegeIfNotFound("CAN_READ");
            Privilege writePrivilege
                    = createPrivilegeIfNotFound("CAN_WRITE");

            Set<Privilege> adminPrivileges = new HashSet<>(Arrays.asList(readPrivilege, writePrivilege));

            createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
            createRoleIfNotFound("ROLE_USER", new HashSet<>(Arrays.asList(readPrivilege)));

            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            Role userRole = roleRepository.findByName("ROLE_USER");

            Address address1 = new Address();
            address1.setAddressLine1("1234 Plymouth Road");
            address1.setCity("Ann Arbor");
            address1.setState(State.MICHIGAN);
            address1.setZipCode("48105");

            Address address2 = new Address();
            address1.setAddressLine1("5678 Huron Pkwy");
            address1.setCity("Ann Arbor");
            address1.setState(State.MICHIGAN);
            address1.setZipCode("48103");

            //admin user
            createNewUser("Admin_Firstname", "Admin_Lastname",
                    "admin@dragon.com", "admin", address1, "734-489-2176",
                    Arrays.asList(adminRole,userRole));
            //normal user
            createNewUser("User_Firstname", "User_Lastname",
                    "user@dragon.com", "user", address2, "(734)489-2176",
                    Arrays.asList(userRole));

            // Done
            setupAlready = true;

        }
    }

    public void createNewUser(String firstname, String lastname, String username, String password, Address address, String phoneNumber, List<Role> roles) {
        User user = new User();
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setAddress(address);
        user.setPhoneNumber(phoneNumber);
        user.setRegistrationDate(new Date());

        user.setRoles(new HashSet<>(roles));
        user.setEnabled(true);
        user.setLastPasswordResetDate(new Date());
        userRepository.save(user);
    }

    @Transactional
    public Privilege createPrivilegeIfNotFound(String name) {

        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilegeRepository.save(privilege);
        }
        return privilege;
    }

    @Transactional
    public Role createRoleIfNotFound(
            String name, Set<Privilege> privileges) {

        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
            role.setPrivileges(privileges);
            roleRepository.save(role);
        }
        return role;
    }
}
