package com.dragon.server.repository;

import com.dragon.server.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "children")
public interface ChildRepository extends JpaRepository<Child, Long> {

}
