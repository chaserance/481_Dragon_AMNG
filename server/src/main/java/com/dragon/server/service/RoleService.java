package com.dragon.server.service;

import com.dragon.server.entity.Privilege;
import com.dragon.server.entity.Role;

public interface RoleService {

    boolean create(Role role);

    Role getAdminRole();

    Role getTeacherRole();

    Role getUserRole();

    void addPrivilege(Role role, Privilege privilege);

    void removePrivilege(Role role, Privilege privilege);
}
