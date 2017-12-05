package com.dragon.server.service;

import com.dragon.server.entity.Privilege;
import com.dragon.server.entity.Role;
import com.dragon.server.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    private final static String ROLE_ADMIN = "ROLE_ADMIN";
    private final static String ROLE_USER = "ROLE_USER";
    private final static String ROLE_TEACHER = "ROLE_TEACHER";

    @Override
    public boolean create(Role role) {
        final String name = role.getName();

        if(roleRepository.findByName(name) != null) {
            return false;
        }

        roleRepository.save(role);
        return true;
    }

    @Override
    public Role getAdminRole() {
        return roleRepository.findByName(ROLE_ADMIN);
    }

    @Override
    public Role getTeacherRole() {
        return roleRepository.findByName(ROLE_TEACHER);
    }

    @Override
    public Role getUserRole() {
        return roleRepository.findByName(ROLE_USER);
    }

    @Override
    public void addPrivilege(Role role, Privilege privilege) {
        Role roleInDB = getRoleByName(role);
        if(roleInDB != null) {
            roleInDB.addPrivilege(privilege);
            roleRepository.save(roleInDB);
        }
    }

    @Override
    public void removePrivilege(Role role, Privilege privilege) {
        Role roleInDB = getRoleByName(role);
        if(roleInDB != null) {
            roleInDB.removePrivilege(privilege);
            roleRepository.save(roleInDB);
        }
    }

    private Role getRoleByName(Role role) {
        return roleRepository.findByName(role.getName());
    }
}
