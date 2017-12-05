package com.dragon.server.repository;

import com.dragon.server.entity.EducationalPerformance;
import com.dragon.server.entity.EducationalPerformancePk;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(exported = false)
public interface EducationalPerformanceRepository extends JpaRepository<EducationalPerformance, EducationalPerformancePk> {

    List<EducationalPerformance> findByPkChildId(Long childId);

    Page<EducationalPerformance> findByPkChildId(Long childId, Pageable pageable);

    List<EducationalPerformance> findByPkSessionId(Long sessionId);

    Page<EducationalPerformance> findByPkSessionId(Long childId, Pageable pageable);

    EducationalPerformance findByPkChildIdAndPkSessionId(Long childId, Long sessionId);
}
