//package com.dragon.server.config;
//
//import com.dragon.server.entity.*;
//import com.dragon.server.repository.PrivilegeRepository;
//import com.dragon.server.repository.RoleRepository;
//import com.dragon.server.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.context.ApplicationListener;
//import org.springframework.context.event.ContextRefreshedEvent;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.*;
//
//@Component
//public class AppInitConfig implements ApplicationListener<ContextRefreshedEvent> {
//
//    private boolean setupAlready = false;
//
//    @Autowired
//    @Qualifier("userRepository")
//    private UserRepository userRepository;
//
//    @Autowired
//    @Qualifier("roleRepository")
//    private RoleRepository roleRepository;
//
//    @Autowired
//    @Qualifier("privilegeRepository")
//    private PrivilegeRepository privilegeRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    private static final String[] DEFAULT_ROLE_LIST = {"ROLE_ADMIN", "ROLE_USER", "ROLE_TEACHER"};
//
//    private static final String[] DEFAULT_PRIVILEGE_LIST = {"CAN_READ_USER", "CAN_WRITE_USER",
//                                                            "CAN_READ_ROLE", "CAN_WRITE_ROLE",
//                                                            "CAN_READ_PRIVILEGE", "CAN_WRITE_PRIVILEGE",
//                                                            "CAN_READ_CHILD", "CAN_WRITE_CHILD",
//                                                            "CAN_READ_SESSION", "CAN_WRITE_SESSION",
//                                                                                "CAN_WRITE_COURSE",
//                                                                                "CAN_WRITE_PROGRAM",
//                                                            "CAN_READ_PERFORMANCE", "CAN_WRITE_PERFORMANCE",
//                                                            "CAN_READ_BILL", "CAN_WRITE_BILL",
//                                                            "CAN_READ_PROMOTION", "CAN_WRITE_PROMOTION"};
//
//    @Override
//    @Transactional
//    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
//        if(!setupAlready) {
//
//            Privilege[] defaultPrivileges = new Privilege[DEFAULT_PRIVILEGE_LIST.length];
//
//            for(int i = 0; i < defaultPrivileges.length; i++) {
//                defaultPrivileges[i] = createPrivilegeIfNotFound(DEFAULT_PRIVILEGE_LIST[i]);
//            }
//
//            Set<Privilege> adminPrivileges = new HashSet<>(Arrays.asList(defaultPrivileges));
//            Set<Privilege> teacherPrivileges = new HashSet<>(Arrays.asList(defaultPrivileges[8]));
//            Set<Privilege> userPrivileges = new HashSet<>(Arrays.asList(defaultPrivileges[8]));
//
//            Role adminRole = createRoleIfNotFound(DEFAULT_ROLE_LIST[0], adminPrivileges);
//            Role teacherRole = createRoleIfNotFound(DEFAULT_ROLE_LIST[1], teacherPrivileges);
//            Role userRole = createRoleIfNotFound(DEFAULT_ROLE_LIST[2], userPrivileges);
//
//            Address address = new Address();
//            address.setAddressLine1("Please change to your own address");
//            address.setCity("Please change to your own city");
//            address.setState(State.MICHIGAN);
//            address.setZipCode("Please change to your own zip code");
//
//            //admin user
//            createNewUser("Admin_FN", "Admin_LN",
//                    "admin@dragon.com", "admin", address, "(123)456-789",
//                    Arrays.asList(adminRole));
//
//            //test teacher
//            createNewUser("Teacher_FN", "Teacher_LN",
//                    "teacher@dragon.com", "teacher", address, "(123)456-789",
//                    Arrays.asList(teacherRole));
//
//            //test normal user
//            createNewUser("User_FN", "User_LN",
//                    "user@dragon.com", "user", address, "(123)456-789",
//                    Arrays.asList(userRole));
//            // Done
//            setupAlready = true;
//
//        }
//    }
//
//    public void createNewUser(String firstname, String lastname, String username, String password, Address address, String phoneNumber, List<Role> roles) {
//        User user = new User();
//        user.setFirstname(firstname);
//        user.setLastname(lastname);
//        user.setUsername(username);
//        user.setPassword(passwordEncoder.encode(password));
//        user.setAddress(address);
//        user.setPhoneNumber(phoneNumber);
//        user.setRegistrationDate(new Date());
//
//        user.setRoles(new HashSet<>(roles));
//        user.setEnabled(true);
//        user.setLastPasswordResetDate(new Date());
//        userRepository.save(user);
//    }
//
//    @Transactional
//    public Privilege createPrivilegeIfNotFound(String name) {
//
//        Privilege privilege = privilegeRepository.findByName(name);
//        if (privilege == null) {
//            privilege = new Privilege(name);
//            privilegeRepository.save(privilege);
//        }
//        return privilege;
//    }
//
//    @Transactional
//    public Role createRoleIfNotFound(
//            String name, Set<Privilege> privileges) {
//
//        Role role = roleRepository.findByName(name);
//        if (role == null) {
//            role = new Role(name);
//            role.setPrivileges(privileges);
//            roleRepository.save(role);
//        }
//        return role;
//    }
//}
