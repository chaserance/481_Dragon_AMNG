package com.dragon.server.repository;

import com.dragon.server.entity.Course;
import com.dragon.server.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_COURSE')")
    <S extends Course> S save(S s);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_COURSE')")
    void delete(Long aLong);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_COURSE')")
    void delete(Course Course);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_COURSE')")
    void delete(Iterable<? extends Course> iterable);

    @Override
    @PreAuthorize("hasAuthority('CAN_WRITE_COURSE')")
    void deleteAll();
}
