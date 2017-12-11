package com.dragon.server.repository;

import com.dragon.server.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel="result_array")
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Override
    @PostAuthorize("(returnObject != null ? returnObject.username.equals(principal.username) : false) or hasAuthority('CAN_READ_USER')")
    User findOne(Long aLong);

    @Override
    @PreAuthorize("hasAuthority('CAN_READ_USER')")
    Page<User> findAll(Pageable pageable);

    @Override
    @PreAuthorize("(#s?.id == null) or (#s?.username == principal.username) or hasAuthority('CAN_WRITE_USER')")
    <S extends User> S save(S s);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_USER')")
    void delete(Long aLong);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_USER')")
    void delete(User user);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_USER')")
    void delete(Iterable<? extends User> iterable);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_USER')")
    void deleteAll();
}
