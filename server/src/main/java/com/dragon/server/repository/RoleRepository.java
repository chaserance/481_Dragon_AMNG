package com.dragon.server.repository;

import com.dragon.server.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="result_array")
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
