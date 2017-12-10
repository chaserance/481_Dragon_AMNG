package com.dragon.server.repository;

import com.dragon.server.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel="result_array")
public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByTeacherId(Long id);
}
