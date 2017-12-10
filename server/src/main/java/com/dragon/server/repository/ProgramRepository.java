package com.dragon.server.repository;

import com.dragon.server.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;


public interface ProgramRepository extends JpaRepository<Program, Long> {


    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_PRGORAM')")
    <S extends Program> S save(S s);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_PRGORAM')")
    void delete(Long aLong);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_PRGORAM')")
    void delete(Program program);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_PRGORAM')")
    void delete(Iterable<? extends Program> iterable);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_PRGORAM')")
    void deleteAll();
}
